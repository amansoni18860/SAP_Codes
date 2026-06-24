sap.ui.define([
  "sap/ui/core/mvc/Controller",
  "sap/m/MessageToast"
], function (Controller, MessageToast) {
  "use strict";

  // Used to sort month names chronologically after grouping data.
  var MONTH_ORDER = {
    Jan: 1,
    Feb: 2,
    Mar: 3,
    Apr: 4,
    May: 5,
    Jun: 6,
    Jul: 7,
    Aug: 8,
    Sep: 9,
    Oct: 10,
    Nov: 11,
    Dec: 12
  };

  /*
   * A controller contains the behavior for an XML view.
   * The XML file defines what appears on screen; this file prepares data,
   * reacts to user actions, and updates the JSON model used by the view.
   */
  return Controller.extend("sap.analytics.dashboard.tutorial.controller.App", {
    // onInit runs once when App.view.xml is created.
    onInit: function () {
      var oModel = this._getDashboardModel();

      // When mockData.json finishes loading, calculate all dashboard summaries.
      oModel.attachRequestCompleted(this._refreshDashboard.bind(this));

      // If data is already available, calculate immediately.
      if (oModel.getProperty("/sales")) {
        this._refreshDashboard();
      }
    },

    // Runs whenever a Select filter changes in the XML view.
    onFilterChange: function () {
      this._refreshDashboard();
    },

    // Restores filter values and recalculates charts/tables.
    onResetFilters: function () {
      var oViewModel = this._getViewModel();
      oViewModel.setProperty("/selectedYear", "2026");
      oViewModel.setProperty("/selectedRegion", "All");
      oViewModel.setProperty("/selectedCategory", "All");
      this._refreshDashboard();
      MessageToast.show("Dashboard filters reset");
    },

    // Central refresh method: reads raw data, calculates summaries, and writes results.
    _refreshDashboard: function () {
      var oModel = this._getDashboardModel();

      // Data may still be loading; stop quietly until mockData.json is available.
      if (!oModel || !oModel.getProperty("/sales")) {
        return;
      }

      var aSales = this._getFilteredSales();
      var aPipeline = oModel.getProperty("/pipeline") || [];
      var aOpportunities = this._getFilteredOpportunities();

      // These paths are bound in App.view.xml. Updating them refreshes the UI.
      oModel.setProperty("/dashboard/kpis", this._buildKpis(aSales, aPipeline, aOpportunities));
      oModel.setProperty("/dashboard/monthlyRevenue", this._groupMonthlyRevenue(aSales));
      oModel.setProperty("/dashboard/revenueByRegion", this._groupByDimension(aSales, "region", "Region"));
      oModel.setProperty("/dashboard/revenueByCategory", this._groupByDimension(aSales, "category", "Category"));
      oModel.setProperty("/dashboard/pipelineByStage", aPipeline);
      oModel.setProperty("/dashboard/topOpportunities", aOpportunities);
    },

    // Returns sales rows that match year, region, and category filters.
    _getFilteredSales: function () {
      var oModel = this._getDashboardModel();
      var oViewModel = this._getViewModel();
      var sYear = oViewModel.getProperty("/selectedYear");
      var sRegion = oViewModel.getProperty("/selectedRegion");
      var sCategory = oViewModel.getProperty("/selectedCategory");

      return (oModel.getProperty("/sales") || []).filter(function (oItem) {
        return oItem.year === sYear &&
          (sRegion === "All" || oItem.region === sRegion) &&
          (sCategory === "All" || oItem.category === sCategory);
      });
    },

    // Returns opportunity rows that match region and category filters.
    _getFilteredOpportunities: function () {
      var oModel = this._getDashboardModel();
      var oViewModel = this._getViewModel();
      var sRegion = oViewModel.getProperty("/selectedRegion");
      var sCategory = oViewModel.getProperty("/selectedCategory");

      return (oModel.getProperty("/opportunities") || [])
        .filter(function (oItem) {
          return (sRegion === "All" || oItem.region === sRegion) &&
            (sCategory === "All" || oItem.category === sCategory);
        })
        .sort(function (a, b) {
          return b.value - a.value;
        });
    },

    // Builds the objects displayed by the GenericTile KPI cards.
    _buildKpis: function (aSales, aPipeline, aOpportunities) {
      var iRevenue = this._sum(aSales, "revenue");
      var iOrders = this._sum(aSales, "orders");
      var fMargin = aSales.length ? aSales.reduce(function (fTotal, oItem) {
        return fTotal + oItem.margin;
      }, 0) / aSales.length : 0;
      var iPipeline = this._sum(aPipeline, "value");
      var iRiskCount = aOpportunities.filter(function (oItem) {
        return oItem.probability < 0.6;
      }).length;

      return [
        { title: "Revenue", value: this._formatCurrency(iRevenue), icon: "sap-icon://sales-order", state: "Good" },
        { title: "Gross Margin", value: Math.round(fMargin * 100) + "%", icon: "sap-icon://business-objects-experience", state: fMargin >= 0.32 ? "Good" : "Critical" },
        { title: "Orders", value: String(iOrders), icon: "sap-icon://cart", state: "Neutral" },
        { title: "Pipeline", value: this._formatCurrency(iPipeline), icon: "sap-icon://pipeline-analysis", state: "Good" },
        { title: "At Risk", value: String(iRiskCount), icon: "sap-icon://alert", state: iRiskCount > 1 ? "Critical" : "Good" }
      ];
    },

    // Groups sales rows by month for the combination chart.
    _groupMonthlyRevenue: function (aSales) {
      var mGroups = {};

      aSales.forEach(function (oItem) {
        if (!mGroups[oItem.month]) {
          mGroups[oItem.month] = { month: oItem.month, revenue: 0, orders: 0 };
        }

        mGroups[oItem.month].revenue += oItem.revenue;
        mGroups[oItem.month].orders += oItem.orders;
      });

      return Object.keys(mGroups)
        .map(function (sKey) {
          return mGroups[sKey];
        })
        .sort(function (a, b) {
          return MONTH_ORDER[a.month] - MONTH_ORDER[b.month];
        });
    },

    // Generic grouping helper used by region and category charts.
    _groupByDimension: function (aSales, sProperty, sLabelName) {
      var mGroups = {};

      aSales.forEach(function (oItem) {
        var sName = oItem[sProperty];
        if (!mGroups[sName]) {
          mGroups[sName] = {};
          mGroups[sName][sLabelName.toLowerCase()] = sName;
          mGroups[sName].revenue = 0;
          mGroups[sName].orders = 0;
        }

        mGroups[sName].revenue += oItem.revenue;
        mGroups[sName].orders += oItem.orders;
      });

      return Object.keys(mGroups).map(function (sKey) {
        return mGroups[sKey];
      });
    },

    // Adds all numeric values from a given property, for example revenue or orders.
    _sum: function (aItems, sProperty) {
      return aItems.reduce(function (iTotal, oItem) {
        return iTotal + Number(oItem[sProperty] || 0);
      }, 0);
    },

    // Reads the default JSON model created in Component.js.
    _getDashboardModel: function () {
      return this.getOwnerComponent().getModel();
    },

    // Reads the named "view" model created in Component.js.
    _getViewModel: function () {
      return this.getOwnerComponent().getModel("view");
    },

    // Converts large numbers into compact labels such as $420K or $1.2M.
    _formatCurrency: function (iValue) {
      if (iValue >= 1000000) {
        return "$" + (iValue / 1000000).toFixed(1) + "M";
      }

      return "$" + Math.round(iValue / 1000) + "K";
    }
  });
});

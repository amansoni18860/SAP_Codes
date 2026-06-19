sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/ui/demo/learn/model/formatter",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator"
], function (
    Controller,
    JSONModel,
    formatter,
    Filter,
    FilterOperator
) {
    "use strict";

    return Controller.extend(
        "sap.ui.demo.learn.controller.InvoicesController",
        {
            formatter: formatter,

            onInit: function () {
                var oModel = new JSONModel({
                    currency: "EUR"
                });

                this.getView().setModel(oModel, "view");
            },

            onFilterInvoices: function (oEvent) {

                var aFilter = [];
                var sQuery = oEvent.getParameter("query");

                if (sQuery) {
                    aFilter.push(
                        new Filter(
                            "ProductName",
                            FilterOperator.Contains,
                            sQuery
                        )
                    );
                }

                var oList = this.byId("invoiceList");
                var oBinding = oList.getBinding("items");

                oBinding.filter(aFilter);
            },

            onInvoicePress: function (oEvent) {

                var oItem = oEvent.getSource();

                var oRouter =
                    this.getOwnerComponent().getRouter();

                oRouter.navTo("details",{
                    invoicePath:window.encodeURI(oItem.getBindingContext("invoice").getPath().substr(1))
                });
            }
        }
    );
});
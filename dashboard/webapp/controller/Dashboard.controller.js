sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel"
], function (Controller, JSONModel) {
    "use strict";

    return Controller.extend("sales.dashboard.controller.Dashboard", {

        onInit: function () {

            var oData = {

                /*=========================================
                 KPI SECTION
                 =========================================*/
                kpi: {
                    revenue: "1.23M",
                    orders: "540",
                    customers: "250",
                    profit: "180K",
                    growth: "14%",
                    targetAchievement: "92%"
                },

                /*=========================================
                 MONTHLY SALES
                 =========================================*/
                sales: [
                    {
                        month: "Jan",
                        revenue: 120000,
                        orders: 40,
                        target: 100000
                    },
                    {
                        month: "Feb",
                        revenue: 150000,
                        orders: 50,
                        target: 130000
                    },
                    {
                        month: "Mar",
                        revenue: 180000,
                        orders: 65,
                        target: 160000
                    },
                    {
                        month: "Apr",
                        revenue: 220000,
                        orders: 75,
                        target: 200000
                    },
                    {
                        month: "May",
                        revenue: 260000,
                        orders: 90,
                        target: 240000
                    },
                    {
                        month: "Jun",
                        revenue: 300000,
                        orders: 100,
                        target: 270000
                    }
                ],

                /*=========================================
                 REGION ANALYSIS
                 =========================================*/
                regions: [
                    {
                        region: "North",
                        sales: 300000
                    },
                    {
                        region: "South",
                        sales: 420000
                    },
                    {
                        region: "East",
                        sales: 250000
                    },
                    {
                        region: "West",
                        sales: 260000
                    }
                ],

                /*=========================================
                 PRODUCT ANALYSIS
                 =========================================*/
                products: [
                    {
                        category: "Electronics",
                        sales: 500000
                    },
                    {
                        category: "Furniture",
                        sales: 250000
                    },
                    {
                        category: "Clothing",
                        sales: 280000
                    },
                    {
                        category: "Accessories",
                        sales: 200000
                    }
                ],

                /*=========================================
                 TOP CUSTOMERS
                 =========================================*/
                topCustomers: [
                    {
                        name: "ABC Retail",
                        revenue: 180000
                    },
                    {
                        name: "XYZ Stores",
                        revenue: 160000
                    },
                    {
                        name: "Mega Mart",
                        revenue: 145000
                    },
                    {
                        name: "Global Trade",
                        revenue: 125000
                    },
                    {
                        name: "Vision Corp",
                        revenue: 100000
                    }
                ]
            };

            var oModel = new JSONModel(oData);
            this.getView().setModel(oModel);

        }

    });

});
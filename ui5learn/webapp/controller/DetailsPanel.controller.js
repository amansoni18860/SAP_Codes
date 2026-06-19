sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/routing/History"
], function (Controller, History) {
    "use strict";

    return Controller.extend(
        "sap.ui.demo.learn.controller.DetailsPanel",
        {

            onInit: function () {
                var oRouter = this.getOwnerComponent().getRouter();

                oRouter.getRoute("details").attachPatternMatched(
                    this._onRouteMatched,
                    this
                );
            },

            _onRouteMatched: function (oEvent) {

                var sInvoicePath = oEvent
                    .getParameter("arguments")
                    .invoicePath;

                this.getView().bindElement({
                    path: "/" + window.decodeURIComponent(sInvoicePath),
                    model: "invoice"
                });
            },

            onNavBack: function () {

                var oHistory = History.getInstance();
                var sPreviousHash = oHistory.getPreviousHash();

                if (sPreviousHash !== undefined) {
                    window.history.go(-1);
                } else {
                    this.getOwnerComponent()
                        .getRouter()
                        .navTo("overview", {}, true);
                }
            }

        }
    );
});
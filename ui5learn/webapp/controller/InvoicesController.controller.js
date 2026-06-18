sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/ui/demo/learn/model/formatter"
], function (Controller, JSONModel, formatter) {
    "use strict"; 
    return Controller.extend("sap.ui.demo.learn.controller.InvoicesController", {
        formatter: formatter,

        onInit: function () {
            var oModel = new JSONModel({
                currency: "EUR"
            });
            this.getView().setModel(oModel, "view");
        }       
    })
})
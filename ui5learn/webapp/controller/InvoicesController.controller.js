sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel"
], function (Controller, JSONModel) {
    "use strict"; 
    return Controller.extend("sap.ui.demo.learn.controller.InvoicesController", {
        
        onInit: function () {
            var oModel = new JSONModel({
                currency: "EUR"
            });
            this.getView().setModel(oModel, "view");
        }       
    })
})
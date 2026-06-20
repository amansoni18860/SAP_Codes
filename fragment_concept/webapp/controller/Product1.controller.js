sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "demo/frag/fragmentconcept/util/FragmentManager",
    "sap/ui/model/json/JSONModel"   
], function (Controller, FragmentManager, JSONModel) {
    "use strict";   
    return Controller.extend("demo.frag.fragmentconcept.controller.Product1", {
        onInit: function () {

        },
        onShowProductDetails: async function () {
            var prodDialog = await FragmentManager.getFragment(this);
            var oModel = new JSONModel({
                field1: "Laptop",
                price: 1500,
                field2: "Electronics"
            });
            prodDialog.setModel(oModel,"dialog");
            prodDialog.open();
        },
        
        onCloseDialogBox: function () {
    this._oDialog.close();
    this._oDialog.destroy();
    this._oDialog = null;
}
    });
});
sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "demo/frag/fragmentconcept/util/FragmentManager",
    "sap/ui/model/json/JSONModel"
], function (Controller, FragmentManager, JSONModel) {
    "use strict"; 
    return Controller.extend("demo.frag.fragmentconcept.controller.Employee1", {
        onInit: function () {

        },
        onShowEmployeeDetails: async function () {
            var empDialog = await FragmentManager.getFragment(this);
            var oModel = new JSONModel({
                field1: "John Doe",
                age: 30,
                field2: "Sales"
            });
            empDialog.setModel(oModel,"dialog");
            empDialog.open();
            
        },
        
        onCloseDialogBox: function () {
    this._oDialog.close();
    this._oDialog.destroy();
    this._oDialog = null;
}
    });
});
sap.ui.define(["sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/m/MessageToast"
], function (Controller, JSONModel, MessageToast) {
    "use strict";
     
return Controller.extend("sap.ui.demo.learn.controller.App",{
    onInit:function(){

        var oData={
            recipient:{
                name:"UI5 Application"
            }
        };
        var oModel=new JSONModel(oData);
        this.getView().setModel(oModel);        
    },

    onPress:function(){
        MessageToast.show("I am a button!");
    }
});
})  
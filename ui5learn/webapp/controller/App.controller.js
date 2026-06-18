sap.ui.define(["sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/ui/model/resource/ResourceModel",
    "sap/m/MessageToast"
], function (Controller, JSONModel, ResourceModel, MessageToast) {
    "use strict";
     
return Controller.extend("sap.ui.demo.learn.controller.App",{
    onInit:function(){

        var oData={
            recipient:{
                name:"UI5 Team"
            }
        };
        var oModel=new JSONModel(oData);
        this.getView().setModel(oModel);  
        
        var i18nModel=new ResourceModel({
            bundleName:"sap.ui.demo.learn.i18n.i18n"
        });
        this.getView().setModel(i18nModel,"i18n");
    },

    onPress:function(){
        var oBundle = this.getView().getModel("i18n").getResourceBundle();
        MessageToast.show(oBundle.getText("helloMessage", [this.getView().getModel().getProperty("/recipient/name")]));
    }
});
})  
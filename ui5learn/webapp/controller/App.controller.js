sap.ui.define(["sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/ui/model/resource/ResourceModel",
    "sap/m/MessageToast"
], function (Controller, JSONModel, ResourceModel, MessageToast) {
    "use strict";
     
return Controller.extend("sap.ui.demo.learn.controller.App",{

    onPress:function(){
        var oBundle = this.getView().getModel("i18n").getResourceBundle();
        MessageToast.show(oBundle.getText("helloMessage", [this.getView().getModel().getProperty("/recipient/name")]));
    }
});
})  
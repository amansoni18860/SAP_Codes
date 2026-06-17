sap.ui.define(["sap/ui/core/mvc/Controller","sap/ui/model/json/JSONModel","sap/ui/model/resource/ResourceModel"],(Controller, JSONModel, ResourceModel)=>{

  "use strict";
  return Controller.extend("ui5.walkthrough.controller.App",{
    
    
    onInit: function () {

        const oData = {
            message:{
                text: "Hello World"
            }
        };
        const oModel = new JSONModel(oData);
        this.getView().setModel(oModel);
        

        const i18nModel = new ResourceModel({
            bundleName: "ui5.walkthrough.i18n.i18n"
        });
        this.getView().setModel(i18nModel, "i18n");
    },

    onPress: function () {
      alert("Hello World");
    }
  });  
})
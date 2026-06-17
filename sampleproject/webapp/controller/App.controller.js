sap.ui.define(["sap/ui/core/mvc/Controller","sap/ui/model/json/JSONModel"],(Controller, JSONModel)=>{

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
    },

    onPress: function () {
      alert("Hello World");
    }
  });  
})
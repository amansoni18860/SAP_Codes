sap.ui.define([
    "sap/ui/core/UIComponent",
    "sap/ui/model/json/JSONModel",
    "sap/ui/model/resource/ResourceModel"
],function(UIComponent,JSONModel,ResourceModel){
    "use strict";

    return UIComponent.extend("sap.ui.demo.learn.Component",{
        metadata:{
            manifest:"json"
              
        },

        init:function(){
            UIComponent.prototype.init.apply(this,arguments);

            var oData={
                recipient:{
                    name:"UI5 Team"
                }
            };
            var oModel=new JSONModel(oData);
            this.setModel(oModel);


        }
})
})
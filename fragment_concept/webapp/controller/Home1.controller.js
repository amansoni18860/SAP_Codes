sap.ui.define(["sap/ui/core/mvc/Controller"],function( Controller){
    "use strict";
    return Controller.extend("demo.frag.fragmentconcept.controller.Home1",{
        onInit:function(){
        },

        onGoToEmployee:function(){
            this.getOwnerComponent().getRouter().navTo("employee");
        },

        onGoToProduct:function(){
            this.getOwnerComponent().getRouter().navTo("product");
        }
    });
})
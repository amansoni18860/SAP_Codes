sap.ui.define(["sap/ui/core/mvc/Controller",

    "sap/m/MessageToast"
], function (Controller, MessageToast) {
    "use strict";
     
return Controller.extend("sap.ui.demo.learn.controller.App",{
    onPress:function(){
        MessageToast.show("I am a button!");
    }
});
})  
sap.ui.define([],function(){
    "use strict";
    return {
        statusText: function (iStatus) {
            var oBundle = this.getView().getModel("i18n").getResourceBundle();
            switch (iStatus) {
                case "A":
                    return oBundle.getText("statusA");
                case "B":
                    return oBundle.getText("statusB");
                case "C":
                    return oBundle.getText("statusC");
                default:
                    return iStatus;
            }   
        }
    }
})
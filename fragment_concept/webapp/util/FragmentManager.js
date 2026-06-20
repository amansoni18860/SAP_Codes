sap.ui.define([
    "sap/ui/core/Fragment"
], function (Fragment) {
    "use strict";

    return {
        getFragment: async function (oController) {

            if (!oController._oDialog) {
                oController._oDialog = await Fragment.load({
                    id: oController.getView().getId(),
                    name: "demo.frag.fragmentconcept.fragment.CommonDialog",
                    controller: oController
                });

                oController.getView().addDependent(oController._oDialog);
            }

            return oController._oDialog;
        }
    };
});
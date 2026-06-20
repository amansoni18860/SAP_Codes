sap.ui.define([
    "sap/ui/core/Fragment"
], function (Fragment) {
    "use strict";

    return {

        getDialog: async function (oController, sFragmentName) {

            if (!oController._oDialog) {

                oController._oDialog = await Fragment.load({
                    id: oController.getView().getId(),
                    name: sFragmentName,
                    controller: oController
                });

                oController.getView().addDependent(
                    oController._oDialog
                );
            }

            return oController._oDialog;
        }

    };
});
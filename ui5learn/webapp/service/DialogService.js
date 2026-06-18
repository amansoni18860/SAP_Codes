sap.ui.define([
    "sap/ui/core/Fragment"
], function (Fragment) {
    "use strict";

    // Cache for all dialogs
    var mDialogs = {};

    return {

        /**
         * Opens a fragment dialog.
         *
         * @param {sap.ui.core.mvc.View} oView
         * @param {string} sFragmentName
         * @param {sap.ui.core.mvc.Controller} oController
         */
        open: async function (
            oView,
            sFragmentName,
            oController
        ) {

            // Load dialog only first time
            if (!mDialogs[sFragmentName]) {

                var oDialog = await Fragment.load({
                    id: oView.getId(),
                    name: sFragmentName,
                    controller: oController
                });

                // Attach dialog to view lifecycle
                oView.addDependent(oDialog);

                // Store dialog
                mDialogs[sFragmentName] = oDialog;
            }

            mDialogs[sFragmentName].open();
        },

        /**
         * Close dialog
         */
        close: function (sFragmentName) {

            if (mDialogs[sFragmentName]) {
                mDialogs[sFragmentName].close();
            }
        },

        /**
         * Destroy dialog
         */
        destroy: function (sFragmentName) {

            if (mDialogs[sFragmentName]) {

                mDialogs[sFragmentName].destroy();

                delete mDialogs[sFragmentName];
            }
        }
    };
});

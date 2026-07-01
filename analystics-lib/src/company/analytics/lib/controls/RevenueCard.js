sap.ui.define([
    "sap/ui/core/XMLComposite"
], function (XMLComposite) {

    "use strict";

    return XMLComposite.extend(
        "company.analytics.lib.controls.RevenueCard",
        {

            metadata: {

                properties: {

                    title: {
                        type: "string",
                        defaultValue: ""
                    },

                    revenue: {
                        type: "float",
                        defaultValue: 0
                    }

                }

            }

        }
    );

});
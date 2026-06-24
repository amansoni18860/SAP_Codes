sap.ui.define([
    "sap/ui/core/XMLComposite"
], function (XMLComposite) {
    "use strict";

    return XMLComposite.extend(
        "factory.lib.controls.MachineCard",
        {
            metadata: {
                properties: {
                    title: {
                        type: "string",
                        defaultValue: ""
                    },
                    temperature: {
                        type: "int",
                        defaultValue: 0
                    },
                    status: {
                        type: "string",
                        defaultValue: ""
                    }
                }
            }
        }
    );
});
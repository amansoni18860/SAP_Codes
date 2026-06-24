sap.ui.define([
    "sap/ui/core/XMLComposite"
], function (XMLComposite) {
    "use strict";

    return XMLComposite.extend(
        "com.training.factory.factorymonitor.control.MachineCard",
        {
            metadata: {
                properties: {
                    title: {
                        type: "string",
                        defaultValue: ""
                    },
                    status: {
                        type: "string",
                        defaultValue: ""
                    },
                    temperature: {
                        type: "int",
                        defaultValue: 0
                    }
                }
            }
        }
    );
});
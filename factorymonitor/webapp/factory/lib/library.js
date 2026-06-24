sap.ui.define([], function () {
    "use strict";

    sap.ui.getCore().initLibrary({

        name: "factory.lib",

        version: "1.0.0",

        dependencies: [
            "sap.ui.core",
            "sap.m"
        ],

        controls: [
            "factory.lib.controls.MachineCard",
            "factory.lib.controls.EmployeeCard"
        ],

        noLibraryCSS: true
    });

    return factory.lib;
});
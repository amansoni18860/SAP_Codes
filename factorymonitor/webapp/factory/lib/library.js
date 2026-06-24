sap.ui.define([],function(){
    "use strict";

    sap.ui.getCore().initLibrary({
        name:"factory.lib",
        version:"1.0.0",
        dependencies:[
            "sap.ui.core",
            "sap.m"
        ],
    });

    return factory.lib;
})
sap.ui.define(["sap/ui/core/ComponentContainer"], function ( ComponentContainer ) {
    "use strict";
   
    new ComponentContainer({
        name: "sap.ui.demo.learn",
        settings: {
            id: "learn"
        },
        async: true
    }).placeAt("content");
});
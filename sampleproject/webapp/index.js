sap.ui.define([
    "sap/m/Button",
    "sap/m/Title",
    "sap/m/VBox"
], function(Button, Title, VBox) {

    "use strict";

    var oLayout = new VBox({
        items: [
            new Title({ text: "Welcome to My First SAP UI5 App" }),
            new Button({ text: "Click Me" })
        ]
    });

    oLayout.placeAt("content11");
});
``
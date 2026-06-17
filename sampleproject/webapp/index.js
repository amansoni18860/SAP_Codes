sap.ui.define(["sap/m/Text"], function(Text) {

    "use strict";
    var oText=new Text("myText",{
        text:"Hello World"
    });
    oText.placeAt("content11");
})
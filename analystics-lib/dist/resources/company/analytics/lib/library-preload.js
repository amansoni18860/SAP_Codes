//@ui5-bundle company/analytics/lib/library-preload.js
sap.ui.predefine("company/analytics/lib/SalesCalculator", [],function(){"use strict";return{calculateRevenue:function(e,n){return e*n},calculateProfit:function(e,n){return e-n}}});
sap.ui.predefine("company/analytics/lib/controls/RevenueCard", ["sap/ui/core/XMLComposite"],function(e){"use strict";return e.extend("company.analytics.lib.controls.RevenueCard",{metadata:{properties:{title:{type:"string",defaultValue:""},revenue:{type:"float",defaultValue:0}}}})});
sap.ui.predefine("company/analytics/lib/library", [],function(){"use strict";sap.ui.getCore().initLibrary({name:"company.analytics.lib",version:"1.0.0",dependencies:["sap.ui.core","sap.m"],controls:["company.analytics.lib.controls.RevenueCard"],noLibraryCSS:true});return company.analytics.lib});
sap.ui.require.preload({
	"company/analytics/lib/controls/RevenueCard.control.xml":'<core:FragmentDefinition\n    xmlns="sap.m"\n    xmlns:core="sap.ui.core"><Panel\n        width="400px"\n        headerText="Revenue Dashboard"><content><VBox class="sapUiSmallMargin"><Title\n                    text="{$this>title}" /><ObjectNumber\n                    number="{$this>revenue}"\n                    unit="$" /></VBox></content></Panel></core:FragmentDefinition>\n'
});
//# sourceMappingURL=library-preload.js.map

sap.ui.define([
  "sap/ui/core/UIComponent",
  "sap/ui/model/json/JSONModel"
], function (UIComponent, JSONModel) {
  "use strict";

  /*
   * Component.js is the startup class of a SAPUI5 application.
   * Think of it as the application shell: it reads manifest.json, creates
   * models, and then lets UI5 create the root view declared in the manifest.
   */
  return UIComponent.extend("sap.analytics.dashboard.tutorial.Component", {
    metadata: {
      // Tells UI5 to read app configuration from webapp/manifest.json.
      manifest: "json"
    },

    /*
     * init is called once when the component starts.
     * We create the models before calling UIComponent.init so the XML view and
     * controller can use them immediately while they are being created.
     */
    init: function () {
      // Default model: holds the dashboard business data loaded from mockData.json.
      var oDataModel = new JSONModel();

      // Named "view" model: holds screen state such as selected filter values.
      var oViewModel = new JSONModel({
        selectedYear: "2026",
        selectedRegion: "All",
        selectedCategory: "All"
      });

      // setModel(model) without a name creates the default model used by "{/path}" bindings.
      this.setModel(oDataModel);

      // setModel(model, "view") creates a named model used by "{view>/path}" bindings.
      this.setModel(oViewModel, "view");

      // Starts the standard UI5 component lifecycle and creates the root XML view.
      UIComponent.prototype.init.apply(this, arguments);

      // Load tutorial data after the controller has subscribed to request events.
      oDataModel.loadData(sap.ui.require.toUrl("sap/analytics/dashboard/tutorial/model/mockData.json"));
    }
  });
});

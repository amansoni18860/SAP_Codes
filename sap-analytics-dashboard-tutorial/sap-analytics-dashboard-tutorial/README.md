# SAP Analytics Dashboard Tutorial

This is a self-contained SAPUI5 learning project for analytics and dashboard concepts. It uses mock business data, so you can study KPI tiles, filters, VizFrame charts, tables, and controller-side aggregation before connecting to CAP, RAP, or an OData service.

## What Is Included

- Executive KPI tiles for revenue, margin, pipeline, fulfillment, and risk.
- Region, product, monthly trend, and pipeline charts using `sap.viz`.
- Filter controls for year, region, and product category.
- Responsive table for top opportunities.
- Mock data in `webapp/model/mockData.json`.
- SAPUI5 project structure with `manifest.json`, `Component.js`, XML view, controller, and CSS.

## Run Locally

Use the SAPUI5 tooling through npm:

```powershell
cd C:\Users\AmanSoni\projects\sap-analytics-dashboard-tutorial
npm install
npm start
```

This starts the UI5 development server and opens `index.html`.

To serve without opening the browser:

```powershell
npm run serve
```

To create a UI5 build:

```powershell
npm run build
```

## Tutorial Ideas

1. Change values in `webapp/model/mockData.json` and watch the charts update.
2. Add a new KPI card in `webapp/view/App.view.xml`.
3. Add a new aggregation function in `webapp/controller/App.controller.js`.
4. Replace the JSON model with an OData model from CAP or S/4HANA.
5. Add semantic coloring for risks, margin, and forecast status.

## Suggested Learning Path

Start with `webapp/view/App.view.xml` to understand the dashboard layout. Then inspect `webapp/controller/App.controller.js` to see how filters and aggregations feed the charts. Finally, modify `mockData.json` to model your own business scenario.

## Beginner Explanation

Read `docs/SAPUI5_BEGINNER_GUIDE.md` for a beginner-friendly explanation of the project files, XML tags, namespaces, bindings, models, controller methods, and chart flow.

For a plain text reference, read `docs/TAGS_AND_FUNCTIONS_EXPLANATION.txt`. It explains every important tag used in `App.view.xml`, plus built-in SAPUI5 methods and user-defined controller functions.

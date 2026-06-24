# SAPUI5 Beginner Guide For This Project

This guide explains the main SAPUI5 files, tags, and binding syntax used in the dashboard.

## Project Files

| File | Purpose |
| --- | --- |
| `package.json` | JavaScript/npm project file. It defines commands such as `npm start` and the UI5 CLI dependency. JSON files cannot contain comments. |
| `ui5.yaml` | UI5 tooling configuration. It tells the UI5 CLI which framework and libraries this app uses. |
| `webapp/index.html` | Browser entry point. It loads the SAPUI5 framework and starts the component. |
| `webapp/manifest.json` | SAPUI5 app descriptor. It stores app id, libraries, root view, and app metadata. JSON files cannot contain comments. |
| `webapp/Component.js` | App startup class. It creates models and starts the UI5 component lifecycle. |
| `webapp/view/App.view.xml` | XML view. It describes the dashboard screen: filters, KPI tiles, charts, and table. |
| `webapp/controller/App.controller.js` | Controller. It handles events, filters data, calculates KPIs, and updates chart data. |
| `webapp/model/mockData.json` | Mock data for learning. In real SAP projects this is often replaced with OData from CAP, RAP, or S/4HANA. |
| `webapp/css/style.css` | Small visual adjustments for spacing and responsiveness. |

## Important SAPUI5 Concepts

### Component

`Component.js` is the main application class. It extends `sap/ui/core/UIComponent`.

In this app it creates two models:

- Default model: used with paths like `{/sales}` or `{/dashboard/kpis}`.
- Named `view` model: used with paths like `{view>/selectedYear}`.

### Model

A model stores data. This project uses `sap.ui.model.json.JSONModel`, which is easy for tutorials because it reads normal JSON.

### View

`App.view.xml` is an XML view. It declares SAPUI5 controls as XML tags. For example:

```xml
<Button text="Reset" press=".onResetFilters" />
```

This creates a SAPUI5 button. When clicked, it calls `onResetFilters` in `App.controller.js`.

### Controller

`App.controller.js` contains JavaScript logic for the view. Common controller jobs are:

- React to button presses and filter changes.
- Read data from models.
- Calculate derived data for charts.
- Write calculated data back into the model.

## XML Namespaces

At the top of `App.view.xml`, namespaces map short prefixes to SAPUI5 libraries:

| Namespace | Meaning |
| --- | --- |
| `xmlns="sap.m"` | Default controls such as `Button`, `Text`, `Table`, `Panel`, `VBox`, and `Select`. |
| `xmlns:mvc="sap.ui.core.mvc"` | MVC view support. This gives us the `<mvc:View>` root tag. |
| `xmlns:core="sap.ui.core"` | Core UI5 helpers such as `<core:Item>` inside a `Select`. |
| `xmlns:f="sap.f"` | Fiori layout controls such as `DynamicPage`. |
| `xmlns:layout="sap.ui.layout"` | Layout controls such as `Grid`. |
| `xmlns:viz="sap.viz.ui5.controls"` | Chart controls such as `VizFrame`. |
| `xmlns:viz.data="sap.viz.ui5.data"` | Chart dataset definitions. |
| `xmlns:viz.feeds="sap.viz.ui5.controls.common.feeds"` | Chart feed definitions that connect data to axes, colors, and sizes. |

## Binding Syntax

Bindings connect UI controls to model data.

| Example | Meaning |
| --- | --- |
| `{title}` | Read property `title` from the current binding context. |
| `{/dashboard/kpis}` | Read absolute path from the default model. |
| `{view>/selectedYear}` | Read absolute path from the named `view` model. |
| `{= Math.round(${probability} * 100) }` | Expression binding. It calculates a value directly in XML. |

## Important Tags In `App.view.xml`

| Tag | Explanation |
| --- | --- |
| `<mvc:View>` | Root of the XML view. It connects the XML file to its controller. |
| `<f:DynamicPage>` | Fiori page layout with title, header, and content areas. |
| `<f:DynamicPageTitle>` | Header title area of the page. |
| `<f:DynamicPageHeader>` | Expandable header area used here for filters. |
| `<HBox>` | Horizontal layout. Child controls appear left to right and can wrap. |
| `<VBox>` | Vertical layout. Child controls appear top to bottom. |
| `<Label>` | Text label for a field. |
| `<Select>` | Dropdown list. In this app it selects year, region, and category. |
| `<core:Item>` | Dropdown option inside a `Select`. |
| `<layout:Grid>` | Responsive grid layout. The `defaultSpan` property controls column width by screen size. |
| `<GenericTile>` | Fiori tile used for KPI cards. |
| `<TileContent>` | Content area inside a tile. |
| `<NumericContent>` | Large numeric value and icon inside a KPI tile. |
| `<Panel>` | Section container with a header. |
| `<viz:VizFrame>` | SAPUI5 chart control. The `vizType` property decides chart type. |
| `<viz.data:FlattenedDataset>` | Chart data source. It points to an array in the model. |
| `<viz.data:DimensionDefinition>` | Chart category field, such as Month or Region. |
| `<viz.data:MeasureDefinition>` | Chart numeric field, such as Revenue or Orders. |
| `<viz.feeds:FeedItem>` | Maps dimensions and measures to chart roles like axis, color, or size. |
| `<Table>` | Responsive SAPUI5 table. |
| `<Column>` | Table column definition. |
| `<ColumnListItem>` | One row template for table data. |
| `<ObjectIdentifier>` | Displays an object title, used here for account names. |
| `<ObjectStatus>` | Displays status text with semantic color. |
| `<ObjectNumber>` | Displays a number and unit, used for value and probability. |

## Chart Flow

The chart data does not come directly from raw sales rows. The controller first aggregates data:

1. `mockData.json` loads into the default model.
2. `onInit` calls `_refreshDashboard`.
3. `_refreshDashboard` filters raw data.
4. Helper methods group the data by month, region, and category.
5. Results are written to `/dashboard/...` paths.
6. XML bindings update the charts automatically.

This is the core SAPUI5 pattern: update the model, and the UI updates from bindings.

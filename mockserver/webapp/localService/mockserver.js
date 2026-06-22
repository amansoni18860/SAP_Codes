sap.ui.define([
    /*
     * SAPUI5 MockServer
     *
     * Used to simulate an OData backend locally.
     *
     * Instead of calling a real backend system,
     * requests are served from:
     *
     * metadata.xml
     * mockdata/*.json
     */
    "sap/ui/core/util/MockServer"
], function (MockServer) {
    "use strict";

    /*
     * Singleton MockServer instance
     */
    var oMockServer;

    return {

        /**
         * Initializes the MockServer.
         *
         * Startup Flow:
         *
         * 1. Create MockServer
         * 2. Load metadata.xml
         * 3. Load mockdata/*.json
         * 4. Generate fake OData endpoints
         * 5. Start intercepting requests
         *
         * Generated endpoints:
         *
         * /odata/v2/service/$metadata
         * /odata/v2/service/Employees
         * /odata/v2/service/Departments
         */
        init: function () {

            console.log("========== MOCK SERVER INIT ==========");

            /*
             * Create MockServer instance.
             *
             * Every request beginning with:
             *
             * /odata/v2/service/
             *
             * can be intercepted by the MockServer.
             */
            oMockServer = new MockServer({

                /*
                 * Service Root URL
                 *
                 * Must match:
                 *
                 * manifest.json datasource URI
                 * ODataModel service URL
                 */
                rootUri: "/odata/v2/service/"
            });

            console.log("Root URI:", "/odata/v2/service/");

            /*
             * Before simulation starts there are
             * no generated requests.
             */
            console.log(
                "Initial Requests:",
                oMockServer.getRequests()
            );

            /*
             * Path to OData metadata document.
             *
             * Metadata contains:
             * - Entity Types
             * - Entity Sets
             * - Associations
             * - Navigation Properties
             *
             * Examples:
             * Employee
             * Department
             */
            var sMetadataUrl = sap.ui.require.toUrl(
                "demo/mock/mockserver/localService/metadata.xml"
            );

            /*
             * Folder containing mock JSON data.
             *
             * Example:
             *
             * Employees.json
             * Departments.json
             */
            var sMockDataUrl = sap.ui.require.toUrl(
                "demo/mock/mockserver/localService/mockdata"
            );

            console.log("Metadata URL:", sMetadataUrl);
            console.log("MockData URL:", sMockDataUrl);

            try {

                console.log("Starting simulation...");

                /*
                 * Generates OData endpoints dynamically
                 * based on metadata.xml.
                 *
                 * Mapping:
                 *
                 * Employees EntitySet
                 *      ->
                 * Employees.json
                 *
                 * Departments EntitySet
                 *      ->
                 * Departments.json
                 */
                oMockServer.simulate(
                    sMetadataUrl,
                    {
                        /*
                         * Folder containing mock JSON files
                         */
                        sMockdataBaseUrl: sMockDataUrl,

                        /*
                         * false:
                         * Only use supplied mock files.
                         *
                         * true:
                         * Missing data will be generated
                         * automatically.
                         */
                        bGenerateMissingMockData: false
                    }
                );

                console.log(
                    "Simulation successful"
                );

            } catch (e) {

                console.error(
                    "Simulation failed!"
                );

                console.error(e);

            }

            try {

                /*
                 * Starts request interception.
                 *
                 * After this:
                 *
                 * GET /Employees
                 * GET /Departments
                 * GET /$metadata
                 *
                 * are handled by MockServer.
                 */
                oMockServer.start();

                console.log(
                    "Mock Server Started"
                );

                /*
                 * Display generated requests.
                 *
                 * Useful for debugging.
                 *
                 * Example:
                 * GET Employees
                 * POST Employees
                 * PUT Employees
                 * DELETE Employees
                 */
                console.log(
                    "Generated Requests:",
                    oMockServer.getRequests()
                );

            } catch (e) {

                console.error(
                    "Mock Server Start Failed"
                );

                console.error(e);

            }

            console.log(
                "======================================"
            );
        },

        /**
         * Returns the MockServer instance.
         *
         * Can be used for:
         * - debugging
         * - custom request handlers
         * - testing
         */
        getMockServer: function () {
            return oMockServer;
        }
    };
});
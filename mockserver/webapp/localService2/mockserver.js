sap.ui.define(["sap/ui/core/util/MockServer"],function(MockServer)
{
    "use strict";

    var oMockServer;

    return {

        init: function () {

            console.log("========== MOCK SERVER INIT ==========");

            oMockServer = new MockServer({
                rootUri: "/odata/v2/service/"
            });

            MockServer.config({
                autoRespond: true,
                autoRespondAfter: 1000
            });

            oMockServer.simulate(
                "./localService2/metadata.xml",
                {
                    sMockdataBaseUrl: "./localService2/mockdata",
                    bGenerateMissingMockData: true
                }
            );

            oMockServer.start();

            console.log("MockServer started at:", "/odata/v2/service/");
        }
    };

})
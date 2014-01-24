if(typeof config === "string") config = JSON.parse(config);

var Keen=Keen||{configure:function(a,b,c){this._pId=a;this._ak=b;this._op=c},addEvent:function(a,b,c,d){this._eq=this._eq||[];this._eq.push([a,b,c,d])},setGlobalProperties:function(a){this._gp=a},onChartsReady:function(a){this._ocrq=this._ocrq||[];this._ocrq.push(a)}};
(function(){var a=document.createElement("script");a.type="text/javascript";a.async=!0;a.src=("https:"==document.location.protocol?"https://":"http://")+"dc8na2hxrj29i.cloudfront.net/code/keen-2.0.0-min.js";var b=document.getElementsByTagName("script")[0];b.parentNode.insertBefore(a,b)})();

// Configure the Keen object with your Project ID and API Key
Keen.configure(config.projectId, config.apiKey);

Keen.onChartsReady(function() {
    var endDate = new Date(new Date().getTime() + 1000 * 60 * 60 * 24); //the endDate is *excluded*, but we want today to be in the timeframe.
    var startDate = new Date(endDate.getTime() - 1000 * 60 * 60 * 24 * 8); //this is *excluding* the last day, so we get data for 7 days.
    var chartOptions = {
        analysisType: "average",
        targetProperty: "score",
        timeframe: {start: startDate.toISOString(), end: endDate.toISOString()},
        interval: "daily",
        timezone: "UTC",
        groupBy: "language"
    };

    var smellData = new Keen.Series("code_smells", chartOptions);
    smellData.draw(document.getElementById("code_smells"), {
        width: "100%",
        label: "# of code smells"
    });

    var styleData = new Keen.Series("code_style", chartOptions);
    styleData.draw(document.getElementById("code_style"), {
        width: "100%",
        label: "# of style violations"
    });

    var coverageData = new Keen.Series("coverage", chartOptions);
    coverageData.draw(document.getElementById("coverage"), {
        width: "100%",
        label: "% of coverage"
    });

    var ratioData = new Keen.Series("code_to_test_ratio", chartOptions);
    ratioData.draw(document.getElementById("code_test_ratio"), {
        width: "100%",
        label: "code:test ratio"
    });

});
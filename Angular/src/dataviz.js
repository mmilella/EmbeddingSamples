var priceColumn = "XSA('Admin'.'cars93').\"Columns\".\"Price\"";
var manufacturerColumn = "XSA('Admin'.'cars93').\"Columns\".\"Manufacturer\"";

var filterColumn = {
    "sColFormula": "XSA('Admin'.'cars93').\"Columns\".\"Manufacturer\"",
         "sColName": "Manufacturer",
         "sOperator": "in", /* One of in, notIn, between, less, lessOrEqual, greater, greaterOrequal */
         "isNumericCol": false,
         "isDateCol": false,
         "bIsDoubleColumn": false,
         "aCodeValues": [],
         "aDisplayValues": ["Audi"]
}

/*var projectDemoJson = {
    "projectConfig":{"dataVisualizations":[{"logicalDataModel":{"logicalEdges":
    {"measures":{"logicalEdgeLayers":[
        {"columnID":"c1","type":"column","isUsed":true}]}}

    },"title":"Revenue","vizPluginID":"oracle.bi.tech.chart.bar"}
    ],"criteria":{"columns":[
        {"columnID":"c1","columnFormula":{"expr":{"expression":priceColumn,"type":"sawx:sqlExpression"}},"type":"saw:regularColumn"},
        {"columnID":"c2","columnFormula":{"expr":{"expression":manufacturerColumn,"type":"sawx:sqlExpression"}},"type":"saw:regularColumn"}
    ],"type":"saw:simpleCriteria"}},"_settingsVersion":"1.0.0"
};*/
var projectDemoJson=
//{"projectConfig":{"dataVisualizations":[{"logicalDataModel":{"logicalEdges":{"measures":{"logicalEdgeLayers":[{"columnID":"c1","type":"column","isUsed":true}]},"detail":{"logicalEdgeLayers":[{"columnID":"c2","type":"column","isUsed":true}]}}},"title":"Price\u0020by\u0020Manufacturer","vizPluginID":"oracle\u002ebi\u002etech\u002echart\u002ebar"}],"criteria":{"columns":[{"columnID":"c1","columnFormula":{"expr":{"expression":"XSA\u0028\u0027Admin\u0027\u002e\u0027cars93\u0027\u0029\u002e\u0022Columns\u0022\u002e\u0022Price\u0022","type":"sawx\u003asqlExpression"}},"type":"saw\u003aregularColumn"},{"columnID":"c2","columnFormula":{"expr":{"expression":"XSA\u0028\u0027Admin\u0027\u002e\u0027cars93\u0027\u0029\u002e\u0022Columns\u0022\u002e\u0022Manufacturer\u0022","type":"sawx\u003asqlExpression"}},"type":"saw\u003aregularColumn"}],"type":"saw\u003asimpleCriteria"}},"\u005fsettingsVersion":"1\u002e0\u002e0"};
{"projectConfig":{"dataVisualizations":[{"logicalDataModel":{"logicalEdges":{"measures":{"logicalEdgeLayers":[{"columnID":"c1","type":"column","isUsed":true}]},"detail":{"logicalEdgeLayers":[{"columnID":"c2","type":"column","isUsed":true}]}}},"title":"Price by Manufacturer","vizPluginID":"oracle.bi.tech.chart.bar"}],"criteria":{"columns":[{"columnID":"c1","columnFormula":{"expr":{"expression":"XSA('Admin'.'cars93').\"Columns\".\"Price\"","type":"sawx:sqlExpression"}},"type":"saw:regularColumn"},{"columnID":"c2","columnFormula":{"expr":{"expression":"XSA('Admin'.'cars93').\"Columns\".\"Manufacturer\"","type":"sawx:sqlExpression"}},"type":"saw:regularColumn"}],"type":"saw:simpleCriteria"}},"_settingsVersion":"1.0.0"}

var layer ={"logicalEdgeLayers":[{"columnID":"c2","type":"column","isUsed":true}]};

/*projectDemoJson.projectConfig.dataVisualizations[0].vizPluginID="oracle.bi.tech.chart.bar";
projectDemoJson.projectConfig["filterControls"] = [
    {
       "address":0,
       "columnID":"c2",
       "filterControlDefaultValues":{
          "type":"specificValue",
          "values":[
             "BizTech"
          ]
       },
       "filterControlSource":{
          "filterControlChoices":[
             {
                "value":{
                   "text":"Gold"
                }
             },
             {
                "value":{
                   "text":"Platinum"
                }
             },
             {
                "value":{
                   "text":"Silver"
                }
             }
          ],
          "type":"saw:fcSpecificChoices"
       },
       "filterID":"cd21ea70-5318-41e4-b420-10c90b4affff",
       "filterOperator":{
          "op":"in"
       },
       "formula":{
          "expr":{
             "expression":"\"Sample Sales Lite\".\"Products\".\"Brand\"",
             "type":"sawx:sqlExpression"
          }
       },
       "type":"saw:columnFilterControl"
    }
 ]
 */

angular.module('Carousel', ['slickCarousel'])
   .controller('CarouselController', function($scope) {
       $scope.greeting = "Oracle Analytics Cloud - Data Visualization";
       //requirejs(['knockout'],function(ko){
       //     $scope.dvfilters = ko.observableArray();
       //});
       $scope.projectPath="/users/admin/Sample1";
       $scope.filters = [];
       if(filterColumn.aDisplayValues.length === 0) {
           $scope.filters[0] = {};
       } else {
        $scope.filters[0] = filterColumn;

       }
        //$scope.dvfilters = ko.observableArray();
       $scope.filtervalues=["Acura","Audi","BMW"];
       $scope.selectedValue = $scope.filtervalues[1];
       $scope.projectDemo= projectDemoJson;

       $scope.vizTypes = [{name:"Bar",type:"oracle.bi.tech.chart.bar"},{name:"Pivot",type:"oracle.bi.tech.pivot"},{name:"Tile",type:"oracle.bi.tech.performancetile"}];

    $scope.attributes=[{name:"Brand",formula:"\"Sample Sales Lite\".\"Products\".\"Brand\""}];
    $scope.projectOptions = {"bShowFilterBar":false};

       $scope.update = function() {
           console.log($scope.selectedValue);
           //var ko = requirejs('knockout');
           //$scope.dvfilters = ko.observableArray();
            filterColumn.aDisplayValues = [];
            filterColumn.aDisplayValues.push($scope.selectedValue);
            $scope.filters[0] = filterColumn;
            //var tDiv = document.getElementById("oracle-dv-app");
           //// ko.cleanNode(tDiv);
           // ko.applyBindings({},tDiv);


       }

       $scope.changeVizType = function() {
            $scope.projectDemo.projectConfig.dataVisualizations[0].vizPluginID=$scope.selectedViz.type;
            if($scope.selectedViz.name === "Bar") {
                $scope.projectDemo.projectConfig.dataVisualizations[0].logicalDataModel.logicalEdges["detail"] = layer;
                delete $scope.projectDemo.projectConfig.dataVisualizations[0].logicalDataModel.logicalEdges.row;
            } else if($scope.selectedViz.name === "Pivot") {
                $scope.projectDemo.projectConfig.dataVisualizations[0].logicalDataModel.logicalEdges["row"] = layer;
                delete $scope.projectDemo.projectConfig.dataVisualizations[0].logicalDataModel.logicalEdges.detail;
            }
       }
});


function publishEvent(elem) {
    var e = new CustomEvent("SayHello",{detail:elem.innerHTML});
    dispatchEvent(e);
}

window.addEventListener('SayHello',function(e){
    alert(e.detail);
});

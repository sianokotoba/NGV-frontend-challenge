'use strict';

var angular = require('angular');

angular.module('main')
  .controller('loanCtrl', LoanController)
  .controller('chartCtrl', ChartController)

function ChartController($scope) {
  var _this = this;


  $scope.months = [
    {
      name: 'January'
    }, {
      name: 'February'
    }, {
      name: 'March'
    }, {
      name: 'April'
    }, {
      name: 'May'
    }, {
      name: 'June'
    }, {
      name: 'July'
    }, {
      name: 'August'
    }, {
      name: 'September'
    }, {
      name: 'October'
    }, {
      name: 'November'
    }, {
      name: 'December'
    }
  ]

  $scope.test = "I am a test"

  $scope.$watch($scope.bankVals, function(newVal, oldVal) {
    console.log("SCOPE???????", $scope)
  })

  // console.log("$SC find for payment array", $scope)
}

function calculate(amt, rate, time) {
  /*
  Daily Interest = Current Principle Balance * Interest Rate / 365.25
  Monthly Interest = Daily Interest * Number of Days in the Month
  */

  let dailyInt = (amt * rate) / 365.25;
  let monthlyInt = dailyInt * 30;
  let monthly = (amt / time) + monthlyInt;

  return monthly;
}

function payment(total, monthly) {
  let array = [];
  while (total > 0) {
    let diff = total - monthly > 0 ? total - monthly : null;
    if (diff) {
      array.push(diff);
    }
    total -= monthly;
  }
  return array;
}

function LoanController($scope, DirectLoanService) {
  var _this = this;

  $scope.subVals = [];
  $scope.unsubVals = [];
  $scope.bankVals = [];
  $scope.uniVals = [];

  _this.showChart = false;

  $scope.myJson = {
    gui: {
      contextMenu: {
        button: {
          visible: 0
        }
      }
    },
    backgroundColor: "#434343",
    globals: {
        shadow: false,
        fontFamily: "Helvetica"
    },
    type: "area",
    title:{
      text:"ZingChart Bar"
    },
    subtitle:{
      text:"Default Style"
    },
    legend: {
        layout: "5x1",
        backgroundColor: "transparent",
        borderColor: "transparent",
        marker: {
            borderRadius: "50px",
            borderColor: "transparent"
        },
        item: {
            fontColor: "white"
        }
        // x:"20%",
        // y:"8%"

    },
    scaleX: {
        maxItems: 100,
        zooming: true,
        label: 'Loan Period (months)',
        values:[],
        lineColor: "white",
        lineWidth: "1px",
        tick: {
            lineColor: "white",
            lineWidth: "1px"
        },
        item: {
            fontColor: "white",
            fontSize:"8px"
        },
        guide: {
            visible: false
        }
    },
    scaleY: {
        lineColor: "white",
        lineWidth: "1px",
        tick: {
            lineColor: "white",
            lineWidth: "1px"
        },
        guide: {
            lineStyle: "solid",
            lineColor: "#626262"
        },
        item: {
            fontColor: "white"
        },
    },
    tooltip: {
        visible: false
    },
    crosshairX: {
        scaleLabel: {
            backgroundColor: "#fff",
            fontColor: "black"
        },
        plotLabel: {
            backgroundColor: "#434343",
            fontColor: "#FFF",
            _text: "Number of hits : %v"
        }
    },
    plot: {
        lineWidth: "2px",
        aspect: "spline",
        marker: {
            visible: false
        }
    },
    series: [{
        text: "Calculated Monthly Payment",
        values: [],
        backgroundColor1: "#B22222",
        backgroundColor2: "#B22222",
        lineColor: "#B22222"
    }, {
        text: "Direct Subsidized",
        values: [],
        backgroundColor1: "#77d9f8",
        backgroundColor2: "#272822",
        lineColor: "#40beeb"
    }, {
        text: "Direct Unsubsidized",
        values: [],
        backgroundColor1: "#4AD8CC",
        backgroundColor2: "#272822",
        lineColor: "#4AD8CC"
    }, {
        text: "Private Bank",
        values: $scope.bankVals,
        backgroundColor1: "#1D8CD9",
        backgroundColor2: "#1D8CD9",
        lineColor: "#1D8CD9"
    }, {
        text: "University",
        values: $scope.uniVals,
        backgroundColor1: "#D8CD98",
        backgroundColor2: "#272822",
        lineColor: "#D8CD98"
    }]
  };

  // local state
  _this.intRate = 0.00;
  _this.loanPd = 0;

  $scope.loanAmt = 0;
  // global state
  $scope.monthlyPayment = 0;
  $scope.monthlyUnsub = 0;
  $scope.monthlySub = 0;
  $scope.monthlyBank = 0;
  $scope.monthlyUni = 0;

  _this.dlsRates = [];
  _this.subRate = 0;
  _this.unsubRate = 0;




  _this.submit = function() {


    if ($scope.loanAmt && _this.intRate && _this.loanPd) {
      DirectLoanService.executeGet()
        .then(req => {
          if (req.data.loans) {
            req.data.loans.forEach(item => {
              if (item.name === 'Direct Subsidized Loans') {
                $scope.monthlySub = calculate($scope.loanAmt, item.rate, _this.loanPd);
              } else if (item.name === 'Direct Unsubsidized Loans') {
                $scope.monthlyUnsub = calculate($scope.loanAmt, item.rate, _this.loanPd);
              }
            });

            $scope.monthlyPayment = calculate($scope.loanAmt, _this.intRate, _this.loanPd);
            $scope.monthlyBank = calculate($scope.loanAmt, 0.042, _this.loanPd);
            $scope.monthlyUni = calculate($scope.loanAmt, 0.040, _this.loanPd);
          }
        })
    }

    if ($scope.loanAmt) {
      $scope.myJson.scaleX.values = [];
      for (let i = 0; i <= _this.loanPd; i++) {
        $scope.myJson.scaleX.values.push(i);
      }

      $scope.myJson.series[0].values = payment($scope.loanAmt, $scope.monthlyPayment);

      $scope.myJson.series[2].values = payment($scope.loanAmt, $scope.monthlyBank);
      $scope.myJson.series[3].values = payment($scope.loanAmt, $scope.monthlyUni);
    }

    if ($scope.myJson.series[2].values.length) {
      _this.showChart = true;
    }
  }


  // if ($scope.$$nextSibling.loanAmt > 0) {
  //   console.log("HI")
  // }
}

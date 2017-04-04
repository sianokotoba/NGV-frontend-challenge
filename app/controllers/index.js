'use strict';

var angular = require('angular');

angular.module('main')
  .controller('loanCtrl', LoanController)

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
  total = parseInt(total);
  let array = [total];
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
    title: {
      text: "NAME"
    },
    subtitle:{
      text:"Helloooooooo"
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
        values: [],
        backgroundColor1: "#1D8CD9",
        backgroundColor2: "#1D8CD9",
        lineColor: "#1D8CD9"
    }, {
        text: "University",
        values: [],
        backgroundColor1: "#D8CD98",
        backgroundColor2: "#272822",
        lineColor: "#D8CD98"
    }]
  };

  var _this = this;

  // local state
  _this.showChart = false;

  _this.intRate = 0.00;
  _this.loanPd = 0;
  _this.loanAmt = 0;

  _this.monthlyPayment = 0;
  _this.monthlyUnsub = 0;
  _this.monthlySub = 0;
  _this.monthlyBank = 0;
  _this.monthlyUni = 0;

  _this.dlsRates = [];
  _this.subRate = 0;
  _this.unsubRate = 0;

  DirectLoanService.executeGet()
    .then(req => {
      if (req.data.loans) {
        req.data.loans.forEach(item => {
          if (item.name === 'Direct Subsidized Loans' || item.name === 'Direct Unsubsidized Loans') {
            _this.dlsRates.push(item)
          }
        })
      }
    })

  _this.submit = function() {
    if (_this.loanAmt && _this.intRate && _this.loanPd && _this.dlsRates.length > 0) {
      _this.monthlyPayment = calculate(_this.loanAmt, _this.intRate, _this.loanPd);
      _this.monthlyBank = calculate(_this.loanAmt, 0.042, _this.loanPd);
      _this.monthlyUni = calculate(_this.loanAmt, 0.040, _this.loanPd);

      _this.dlsRates.forEach(item => {
        if (item.name === 'Direct Subsidized Loans') {
          _this.monthlySub = calculate(_this.loanAmt, item.rate, _this.loanPd);
        } else {
          _this.monthlyUnsub = calculate(_this.loanAmt, item.rate, _this.loanPd);
        }
      })
    }

    let monthly = [
      _this.monthlyPayment,
      _this.monthlySub,
      _this.monthlyUnsub,
      _this.monthlyBank,
      _this.monthlyUni
    ]

    if (_this.loanAmt) {
      $scope.myJson.scaleX.values = [];
      for (let i = 0; i <= _this.loanPd; i++) {
        $scope.myJson.scaleX.values.push(i);
      }

      $scope.myJson.series.forEach((item, i) => {
        $scope.myJson.series[i].text += ` $${monthly[i].toFixed(2)}`
        $scope.myJson.series[i].values = payment(_this.loanAmt, monthly[i]);
      })
    }

    if ($scope.myJson.series[0].values.length) {
      _this.showChart = true;
    }

    if (!_this.loanAmt || !_this.intRate || !_this.loanPd) {
      _this.showChart = false;
    }
  }
}

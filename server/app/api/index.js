var api = {}

var actualDate = new Date();

var lastDate = new Date();
lastDate.setDate(actualDate.getDate() - 7);

var fortnightDate = new Date();
fortnightDate.setDate(actualDate.getDate() - 14);

var deals = [
  { date : actualDate, amount : 1, value : 150},
  { date : actualDate, amount : 2, value : 250},
  { date : actualDate, amount : 3, value : 350},
  { date : lastDate, amount : 1, value : 450},
  { date : lastDate, amount : 2, value : 550},
  { date : lastDate, amount : 3, value : 650},
  { date : fortnightDate, amount : 1, value : 750},
  { date : fortnightDate, amount : 2, value : 950},
  { date : fortnightDate, amount : 3, value : 950}
];


api.weekList = function(req, res) {
  var actualDeals = deals.filter(function(deal) {
    return deal.date > lastDate;
  });

  res.json(actualDeals);
};

api.lastWeekList = function(req, res) {
  var lastDeals = deals.filter(function(deal) {
    return deal.date < actualDate && deal.date > fortnightDate;
  });

  setTimeout(function() {
    res.json(lastDeals);
  }, 500);
};

api.fortnightWeekList = function(req, res) {
  var fortnightDeals = deals.filter(function(deal) {
    return deal.date < lastDate;
  });

  res.json(fortnightDeals);
};

api.registerDeal = function(req, res) {
  console.log(req.body);
  req.body.date = new Date(req.body.date.replace(/-/g,'/'));
  deals.push(req.body);
  res.status(200).json("Negociação recebida");
};

module.exports = api;

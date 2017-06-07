var api = require('../api');

module.exports  = function(app) {
  app.route('/deal/week')
  .get(api.weekList);

  app.route('/deal/last')
  .get(api.lastWeekList);

  app.route('/deal/fortnight')
  .get(api.fortnightWeekList);

  app.route('/deal')
  .post(api.registerDeal);
};

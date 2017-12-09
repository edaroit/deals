const api = {}
const actualDate = new Date()
const lastDate = new Date()
lastDate.setDate(actualDate.getDate() - 7)
const fortnightDate = new Date()
fortnightDate.setDate(actualDate.getDate() - 14)
const deals = [
  { date : actualDate, amount : 1, value : 150},
  { date : actualDate, amount : 2, value : 250},
  { date : actualDate, amount : 3, value : 350},
  { date : lastDate, amount : 1, value : 450},
  { date : lastDate, amount : 2, value : 550},
  { date : lastDate, amount : 3, value : 650},
  { date : fortnightDate, amount : 1, value : 750},
  { date : fortnightDate, amount : 2, value : 950},
  { date : fortnightDate, amount : 3, value : 950}
]

api.weekList = (req, res) => {
  const actualDeals = deals.filter(deal => deal.date > lastDate)
  res.json(actualDeals)
}

api.lastWeekList = (req, res) => {
  const lastDeals = deals.filter(deal => deal.date < actualDate && deal.date > fortnightDate)
  setTimeout(() => res.json(lastDeals), 500)
}

api.fortnightWeekList = (req, res) => {
  const fortnightDeals = deals.filter(deal => deal.date < lastDate)
  res.json(fortnightDeals)
}

api.registerDeal = (req, res) => {
  req.body.date = new Date(req.body.date.replace(/-/g,'/'))
  deals.push(req.body)
  res.status(200).json("Negociação recebida")
}

module.exports = api

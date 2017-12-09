export class DealsList {
  constructor () {
    this._deals = []
  }

  get deals () {
    return [].concat(this._deals)
  }

  get totalVolume () {
    return this._deals.reduce((total, deal) => total + deal.volume, 0.0)
  }

  add (deal) {
    this._deals.push(deal)
  }

  empty () {
    this._deals = []
  }

  order (column) {
    this._deals.sort(column)
  }

  reverseOrder () {
    this._deals.reverse()
  }
}

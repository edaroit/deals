import {HttpService} from './HttpService'
import {ConnectionFactory} from './ConnectionFactory'
import {DealDao} from '../dao/DealDao'
import {Deal} from '../models/Deal'

export class DealService {
  constructor () {
    this._http = new HttpService()
  }

  delete () {
    return ConnectionFactory
    .getConnection()
    .then(connection => new DealDao(connection))
    .then(dao => dao.delete())
    .then(() => 'Negociações apagadas com sucesso')
    .catch(error => {
      console.log(error)
      throw new Error('Não foi possível apagar as negociações')
    })
  }

  register (deal) {
    return ConnectionFactory
    .getConnection()
    .then(connection => new DealDao(connection))
    .then(dao => dao.add(deal))
    .then(() => 'Negociação adicionada com sucesso')
    .catch(error => {
      console.log(error)
      throw new Error('Não foi possível adicionar a negociação')
    })
  }

  import (list) {
    return this.getDeals()
    .then(deals =>
      deals.filter(deal =>
        !list.some(existingDeal =>
          JSON.stringify(deal) == JSON.stringify(existingDeal)))
      )
    .catch(error => {
      console.log(error)
      throw new Error('Não foi possível buscar negociações para importar')
    })
  }

  list () {
    return ConnectionFactory
    .getConnection()
    .then(connection => new DealDao(connection))
    .then(dao => dao.list())
    .catch(error => {
      console.log(error)
      throw new Error('Não foi possível obter as negociações')
    })
  }

  post () {

  }

  getDeals () {
    return Promise.all([
      this.getWeekDeals(),
      this.getLasWeekDeals(),
      this.getFortnightWeek()
    ]).then(periods => {
      let deals = periods
      .reduce((datas, period) => datas.concat(period), [])
      .map(data => new Deal(new Date(data.date), data.amount, data.value))

      return deals
    }).catch(error => {
      throw new Error(error)
    })
  }

  getWeekDeals () {
    return this._http
    .get('deal/week')
    .then(deals => {
      console.log(deals)
      return deals.map(object => new Deal(new Date(object.date), object.amount, object.value))
    })
    .catch(error => {
      console.log(error)
      throw new Error('Não foi possível obter as negociações da semana')
    })
  }

  getLasWeekDeals () {
    return this._http
    .get('deal/last')
    .then(deals => {
      console.log(deals)
      return deals.map(object => new Deal(new Date(object.date), object.amount, object.value))
    })
    .catch(error => {
      console.log(error)
      throw new Error('Não foi possível obter as negociações da semana anterior')
    })
  }

  getFortnightWeek () {
    return this._http
    .get('deal/fortnight')
    .then(deals => {
      console.log(deals)
      return deals.map(object => new Deal(new Date(object.date), object.amount, object.value))
    })
    .catch(error => {
      console.log(error)
      throw new Error('Não foi possível obter as negociações da semana retrasada')
    })
  }
}

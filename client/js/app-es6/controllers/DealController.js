import { Bind } from '../helpers/Bind'
import { DateConverter } from '../helpers/DateConverter'
import { Deal } from '../models/Deal'
import { DealsList } from '../models/DealsList'
import { Message } from '../models/Message'
import { DealService } from '../services/DealService'
import { HttpService } from '../services/HttpService'
import { DealsView } from '../views/DealsView'
import { MessageView } from '../views/MessageView'

class DealController {
  constructor () {
    const $ = document.querySelector.bind(document)
    this._inputDate = $('#date')
    this._inputAmount = $('#amount')
    this._inputValue = $('#value')
    this._dealList = new Bind(new DealsList(), new DealsView($('#deals-view')), 'add', 'empty', 'order', 'reverseOrder')
    this._message = new Bind(new Message(), new MessageView($('#message-view')), 'text')
    this._actualOrder = ''
    this._service = new DealService()
    this._init()
  }

  add (event) {
    event.preventDefault()
    const deal = this._createDeal()
    this._service
    .register(deal)
    .then(message => {
      this._dealList.add(deal)
      this._message.text = message
      this._cleanForm()
    })
    .catch(error => this._message.text = error)
  }

  delete () {
    this._service
    .delete()
    .then(message => {
      this._dealList.empty()
      this._message.text = message
    })
  }

  importDeals () {
    this._service
    .import(this._dealList.deals)
    .then(deals => deals.forEach(deal => {
      this._dealList.add(deal)
      this._message.text = 'Negociações do período importadas'
    }))
    .catch(error => this._message.text = error)
  }

  order (column) {
    if (this._actualOrder == column) { this._dealList.reverseOrder() } else { this._dealList.order((p, s) => p[column] - s[column]) }
    this._actualOrder = column
  }

  post (event) {
    event.preventDefault()

    const $ = document.querySelector.bind(document)
    inputDate = $('#date')
    inputAmount = $('#amount')
    inputValue = $('#value')
    const deal = {
      date: inputDate.value,
      amount: inputAmount.value,
      value: inputValue.value
    }
    new HttpService()
    .post('/deals', deal)
    .then(() => {
      inputDate.value = ''
      inputAmount.value = 1
      inputValue.value = 0.0
      inputDate.focus()
      alert('Negociação enviada com sucesso')
    })
    .catch(error => alert(`Não foi possível enviar a negociação: ${error}`))
  }

  _cleanForm () {
    this._inputDate.value = ''
    this._inputAmount.value = 1
    this._inputValue.value = 0.0
    this._inputDate.focus()
  }

  _createDeal () {
    return new Deal(
      DateConverter.textToDate(this._inputDate.value),
      parseInt(this._inputAmount.value),
      parseFloat(this._inputValue.value))
  }

  _init () {
    this._service
    .list()
    .then(deals =>
      deals.forEach(deal =>
        this._dealList.add(deal)))
    .catch(error => this._message.text = error)
    setInterval(() => {
      this.importDeals()
    }, 3000)
  }
}

export function currentInstance () { return new DealController() }

import {Deal} from '../models/Deal'

export class DealDao {
  constructor (connection) {
    this._connection = connection
    this._store = 'deals'
  }

  add (deal) {
    return new Promise((resolve, reject) => {
      let request = this._connection
      .transaction([this._store], 'readwrite')
      .objectStore(this._store)
      .add(deal)

      request.onsuccess = e => {
        resolve()
      }

      request.onerror = e => {
        console.log(e.target.error)
        reject('Não foi possível adicionar a negociação')
      }
    })
  }

  delete () {
    return new Promise((resolve, reject) => {
      let request = this._connection
      .transaction([this._store], 'readwrite')
      .objectStore(this._store)
      .clear()

      request.onsuccess = e => resolve('Negociações apagadas com sucesso')

      request.onerror = e => {
        console.log(e.target.error)
        reject('Não foi possível apagar as negociações')
      }
    })
  }

  list () {
    return new Promise((resolve, reject) => {
      let cursor = this._connection
      .transaction([this._store], 'readwrite')
      .objectStore(this._store)
      .openCursor()

      let deals = []

      cursor.onsuccess = e => {
        let actual = e.target.result

        if (actual) {
          let data = actual.value
          deals.push(new Deal(data._date, data._amount, data._value))
          actual.continue()
        } else {
          resolve(deals)
        }
      }

      cursor.onerror = e => {
        console.log(e.target.error)
        reject('Não foi possível listar as negociações')
      }
    })
  }
}

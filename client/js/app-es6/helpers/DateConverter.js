export class DateConverter {
  constructor () {
    throw new Error('Esta classe não pode ser instanciada')
  }

  static dateToText (date) {
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`
  }

  static textToDate (text) {
    if (!/\d{2}\/\d{2}\/\d{4}/.test(text)) { throw new Error('Deve estar no formato dd/mm/aaaa') }

    return new Date(...text.split('/').reverse().map((item, index) => item - index % 2))
  }
}

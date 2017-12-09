import { View } from './View'
import { currentInstance } from '../controllers/DealController'
import { DateConverter } from '../helpers/DateConverter'

export class DealsView extends View {
  constructor (element) {
    super(element)
    element.addEventListener('click', (event) => {
      if (event.target.nodeName == 'TH') { currentInstance().order(event.target.textContent.toLowerCase()) }
    })
  }

  template (model) {
    return `
      <table class="table table-hover table-bordered">
        <thead>
          <tr>
            <th>DATA</th>
            <th>QUANTIDADE</th>
            <th>VALOR</th>
            <th>VOLUME</th>
          </tr>
        </thead>
        <tbody>
          ${model.deals.map(deal => `
            <tr>
              <td>${DateConverter.dateToText(deal.date)}</td>
              <td>${deal.amount}</td>
              <td>${deal.value}</td>
              <td>${deal.volume}</td>
            </tr>
          `).join('')}
        </tbody>
        <tfoot>
          <td colspan="3"></td>
          <td>${model.totalVolume}</td>
        </tfoot>
      </table>
    `
  }
}

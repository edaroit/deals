import {currentInstance} from './controllers/DealController';
import {} from './polyfill/fetch';

let dealController = currentInstance();

document.querySelector('.form').onsubmit = dealController.add.bind(dealController);
document.querySelector('[type=button]').onclick = dealController.delete.bind(dealController);

document.querySelector('#post').onsubmit = dealController.post.bind(dealController);


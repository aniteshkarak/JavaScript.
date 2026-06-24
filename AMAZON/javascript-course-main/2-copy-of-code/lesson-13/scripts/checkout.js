import { renderOrderSummery } from './checkout/orderSummary.js';
import { renderPaymentSummery } from './checkout/paymentSummary.js';
import { loadCart } from '../data/cart.js';
// import '../data/cart-class.js';
// import '../data/backend-practice.js';

import { loadProducts, loadProductsFetch } from '../data/products.js';

function loadPage () {
    try{
        //throw 'error1';

        await loadProductsFetch();

        const value = await new Promise((resolve, reject) => {
            loadProducts(() => {
                // reject('erroe3');
                resolve('value3');
            });
        });

    } catch(error){

    }
    

    renderOrderSummery();
    renderPaymentSummery(); 
}
loadPage();

/*
Promise.all([
    new Promise((resolve) => {
        loadProducts(() => {
            resolve('value1');
        });
    }),
    new Promise((resolve) => {
        loadCart (() => {
            resolve();
        });
    })
]).then(() => {
    renderOrderSummery();
    renderPaymentSummery(); 
});
*/

/*
new Promise((resolve) => {
    loadProducts(() => {
        resolve('value1');
    });

}).then((value) => {
    return new Promise((resolve) => {
        loadCart (() => {
            resolve();
        });
    });

}).then(() => {
    renderOrderSummery();
    renderPaymentSummery(); 
});
*/

/*
loadProducts(() => {
    loadCart(() => {
        renderOrderSummery();
        renderPaymentSummery();
    });
});
*/

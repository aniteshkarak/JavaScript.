export const orders = JSON.parse(localStorage.getItem('orders')) || [];

export function addOrder(order){
    orders.unshift(order);
    saveToStorage();
}

function saveToStorage(){
    localStorage.setItem('orders', JSON.stringify(orders));
}

import { orders } from '../data/orders.js';
import { getProduct } from '../data/products.js';

let ordersHTML = '';

orders.forEach((order) => {
  order.products.forEach((productDetails) => {

    const product = getProduct(productDetails.productId);

    ordersHTML += `
      <div class="product-actions">
        <a href="tracking.html?productId=${product.id}">
          <button class="track-package-button button-secondary">
            Track Package
          </button>
        </a>
      </div>
    `;
  });
});

document.querySelector('.orders-grid').innerHTML = ordersHTML;
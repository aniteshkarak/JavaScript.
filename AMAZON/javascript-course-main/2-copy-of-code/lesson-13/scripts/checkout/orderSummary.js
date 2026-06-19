import {cart, removeFromCart, updateQuantity, updateDeliveryOption} from '../../data/cart.js';
import {products, getProduct} from '../../data/products.js';
import {formatCurrency} from '../utils/money.js';
import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js';
import {deliveryOptions, getDeliveryOption} from '../../data/deliveryOptions.js'
import { renderPaymentSummery } from './paymentSummary.js';

const today = dayjs();
const deliveryDate = today.add(7, 'days');
deliveryDate.format('dddd, MMMM, D')

export function renderOrderSummery (){

    let cartSummaryHTML = '';

    cart.forEach((cartItem) => {

        const productId = cartItem.productId;

        const matchingProduct = getProduct(productId);

        const deliveryOptionId = cartItem.deliveryOptionId || '1';

        const deliveryOption = getDeliveryOption(deliveryOptionId);

        const today = dayjs();
        const deliveryDate = today.add(
            deliveryOption.deliveryDays,
            'days'
        );
        const dateString = deliveryDate.format(
            'dddd, MMMM D'
        ); 

        cartSummaryHTML +=
        `
        <div class="cart-item-container js-cart-item-container-${matchingProduct.id}">
            <div class="delivery-date">
                Delivery date: ${dateString}
            </div>

            <div class="cart-item-details-grid">
                <img class="product-image"
                src="${matchingProduct.image}">

                <div class="cart-item-details">
                    <div class="product-name">
                        ${matchingProduct.name}
                    </div>
                    <div class="product-price">
                        ${formatCurrency(matchingProduct.priceCents)}
                    </div>


                    <div class="product-quantity">
                        <div class="quantity-control">
                            <span class="quantity-btn js-decrease-quantity" data-product-id="${matchingProduct.id}">
                            -
                            </span>

                            <span class="quantity-number">
                                ${cartItem.quantity}
                            </span>

                            <span class="quantity-btn js-increase-quantity" data-product-id="${matchingProduct.id}">
                                +
                            </span>
                        </div>

                        <span class="delete-quantity-link link-primary js-delete-link" data-product-id="${matchingProduct.id}">
                            Delete
                        </span>
                    </div>
                </div>

                <div class="delivery-options">
                    <div class="delivery-options-title">
                        Choose a delivery option:
                    </div>
                    ${deliveryOptionHTML(matchingProduct, cartItem)}
                </div>
            </div>
        </div>
        `;
    })

    function deliveryOptionHTML(matchingProduct, cartItem) {

        let html = '';

        deliveryOptions.forEach((deliveryOption) => {
            const today = dayjs();
            const deliveryDate = today.add(
                deliveryOption.deliveryDays,
                'days'
            );
            const dateString = deliveryDate.format(
                'dddd, MMMM, D'
            ); 

            const priceString = deliveryOption.priceCents === 0 ? 'FREE' : `$${formatCurrency(deliveryOption.priceCents)} -`;

            const isChecked = deliveryOption.id === cartItem.deliveryOptionId;

        html += `
            <div class="delivery-option js-delivery-option"
                data-product-id="${matchingProduct.id}"
                data-delivery-option-id="${deliveryOption.id}">

                <input type="radio"
                        ${isChecked ? 'checked' : ''}
                        class="delivery-option-input"
                        name="delivery-option-${matchingProduct.id}">

                <div>
                    <div class="delivery-option-date">
                    ${dateString}
                    </div>

                    <div class="delivery-option-price">
                    ${priceString} Shipping
                    </div>
                </div>

            </div>
            `;
        })

        return html;
    }

    const orderSummaryElement = document.querySelector('.js-order-summary');
    orderSummaryElement.innerHTML = cartSummaryHTML;

    document.querySelectorAll('.js-delete-link').forEach((link) => {
        link.addEventListener('click', () => {
            const productId = link.dataset.productId;
            removeFromCart(productId);

            const container = document.querySelector(`.js-cart-item-container-${productId}`);
            container.remove();

            renderPaymentSummery();
        });
    });

    document.querySelectorAll('.js-increase-quantity')
    .forEach((button) => {
        button.addEventListener('click', () => {
        const productId = button.dataset.productId;

        updateQuantity(productId, 1);

        location.reload();
        });
    });

    document.querySelectorAll('.js-decrease-quantity')
    .forEach((button) => {
        button.addEventListener('click', () => {
        const productId = button.dataset.productId;

        updateQuantity(productId, -1);

        location.reload();
        });
    });

    document.querySelectorAll('.js-delivery-option').forEach((element) => {
        element.addEventListener('click', () => {
            const { productId, deliveryOptionId } = element.dataset;

            updateDeliveryOption(productId, deliveryOptionId);

            location.reload();
            renderOrderSummery();
        });
    });
}


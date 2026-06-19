function Cart(localstoragekey){

    const cart ={
        cartItems : undefined,
        loadFromStorage() {
            this.cartItems = JSON.parse(localStorage.getItem('localstoragekey'));

            if (!this.cartItems) {
            this.cartItems = [
                {
                productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
                quantity: 2,
                deliveryOptionId: '1'
                },
                {
                productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
                quantity: 1,
                deliveryOptionId: '2'
                }
            ];
            }
        },
        saveToStorage() {
            localStorage.setItem(localstoragekey, JSON.stringify(this.cartItems));
        },

        addToCart(productId) {
            let matchingItem;

            this.cartItems.forEach((item) => {
                if (productId === item.productId) {
                matchingItem = item;
                }
            });

            if (matchingItem) {
                matchingItem.quantity += 1;
            } else {
                this.cartItems.push({
                productId: productId,
                quantity: 1,
                deliveryOptionId: '1'
                });
            }
            this.saveToStorage();
        },

        removeFromCart(productId) {
            const newCart = [];

            this.cartItems.forEach((cartItem) => {
                if (cartItem.productId !== productId) {
                newCart.push(cartItem);
                }
            });

            this.cartItems = newCart;

            this.saveToStorage();
        },
        updateQuantity(productId, change) {
            this.cartItems.forEach((item) => {
                if (item.productId === productId) {
                item.quantity += change;

                if (item.quantity < 1) {
                    item.quantity = 1;
                }
                }
            });

            this.saveToStorage();
        },
        updateDeliveryOption(productId, deliveryOptionId) {
            let matchingItem;

            this.cartItems.forEach((item) => {
                if (item.productId === productId) {
                matchingItem = item;
                }
            });

            matchingItem.deliveryOptionId = deliveryOptionId;
            this.saveToStorage();
        }
    };

    return cart;
}

const cart = Cart('cart-oop');

cart.loadFromStorage();
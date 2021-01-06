var app = new Vue({
    el: '#app',
    data: {
        altText: 'A pair of socks',
        cart: 0,
        details: ['80% cotton', '20% polyester', 'Gender-neutral'],
        image: './assets/vmSocks-green-onWhite.jpg',
        inStock: true,
        inventory: 100,
        link: 'http://vuejs.org',
        onSale: true,
        product: 'Socks',
        sizes: ['small', 'medium', 'large'],
        variants: [
            {
                variantId: 2234,
                variantColor: 'green',
                variantImage: './assets/vmSocks-green-onWhite.jpg'
            },
            {
                variantId: 2235,
                variantColor: 'blue',
                variantImage: './assets/vmSocks-blue-onWhite.jpg'
            }
        ]
    },
    methods: {
        addToCart() {
            this.cart += 1;
        },
        removeFromCart() {
            if (this.cart) this.cart -= 1;
        },
        updateProduct(variantImage) {
            this.image = variantImage;
        }
    }
})
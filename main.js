var app = new Vue({
    el: '#app',
    computed: {
        image: function () {
            return this.variants[this.selectedVariant].variantImage;
        },
        inStock: function () {
            return this.variants[this.selectedVariant].variantQuantity;
        },
        sale: function () {
            if(this.onSale){
                return `${this.brand} ${this.product} are on sale!`;
            }
            return `${this.brand} ${this.product} are not on sale!`;
        },
        title: function () {
            return this.brand + ' ' + this.product;
        }
    },
    data: {
        altText: 'A pair of socks',
        brand: 'Vue Mastery',
        cart: 0,
        details: ['80% cotton', '20% polyester', 'Gender-neutral'],
        link: 'http://vuejs.org',
        onSale: true,
        product: 'Socks',
        selectedVariant: 0,
        sizes: ['small', 'medium', 'large'],
        variants: [
            {
                variantId: 2234,
                variantColor: 'green',
                variantImage: './assets/vmSocks-green-onWhite.jpg',
                variantQuantity: 10
            },
            {
                variantId: 2235,
                variantColor: 'blue',
                variantImage: './assets/vmSocks-blue-onWhite.jpg',
                variantQuantity: 0
            }
        ]
    },
    methods: {
        addToCart() {
            this.cart += 1;
        },
        removeFromCart() {
            this.cart -= 1;
        },
        updateProduct(index) {
            this.selectedVariant = index;
        }
    }
})
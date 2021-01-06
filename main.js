Vue.component('product', {
    computed: {
        image: function () {
            return this.variants[this.selectedVariant].variantImage;
        },
        inStock: function () {
            return this.variants[this.selectedVariant].variantQuantity;
        },
        sale: function () {
            if (this.onSale) {
                return `${this.brand} ${this.product} are on sale!`;
            }
            return `${this.brand} ${this.product} are not on sale!`;
        },
        shipping() {
            if (this.premium) {
                return 'Free';
            } else {
                return 2.99;
            }
        },
        title: function () {
            return `${this.brand} ${this.product}`;
        }
    },
    data() {
        return {
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
        };
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
    },
    props: {
        premium: {
            type: Boolean,
            required: true
        }
    },
    template: `
        <div class="product">
            <div class="product-image">
                <img :src="image" :alt="altText" />
            </div>
            
            <div class="product-info">
                <h1> {{ title }} </h1>
                <p v-if="inStock > 10">In Stock</p>
                <p v-else-if="inStock <= 10 && inStock > 0">Almost sold out!</p>
                <p v-else :class="{ outOfStock: !inStock }">Out of Stock</p>
                <p>{{ sale }}</p>
                <p>Shipping: {{ shipping }} </p>
                <product-details :details="details"></product-details>
                <div class="color-box" v-for="(variant, index) in variants" :key="variant.variantId"
                     :style="{ backgroundColor: variant.variantColor }" @mouseover="updateProduct(index)">
                </div>
                <div v-for="size in sizes">
                    <p> {{ size }} </p>
                </div>
                <a :href="link">Link</a>
                <button @click="addToCart" :class="{ disabledButton: !inStock }" :disabled="!inStock">Add to cart</button>
                <button @click="removeFromCart" :class="{ disabledButton: !cart }" :disabled="!cart">Remove from cart</button>
                <div class="cart">
                    <p> Cart({{ cart }}) </p>
                </div>
            </div>
        </div>
    `
});

Vue.component('product-details', {
    props: {
        details: {
            type: Array,
            required: true
        }
    },
    template: `
        <ul>
            <li v-for="detail in details"> {{ detail }} </li>
        </ul>
    `
});

var app = new Vue({
    computed: {

    },
    data: {
        premium: true
    },
    el: '#app',
    methods: {

    }
});
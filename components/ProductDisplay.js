app.component('product-display', {
    computed: {
        image: function () {
            return this.variants[this.selectedVariant].image;
        },
        inStock: function () {
            return this.variants[this.selectedVariant].quantity;
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
            details: ['50% cotton', '30% wool', '20% polyester'],
            onSale: false,
            product: 'Socks',
            reviews: [],
            selectedVariant: 0,
            variants: [
                {
                    id: 2234,
                    color: 'green',
                    image: './assets/images/socks_green.jpg',
                    quantity: 100
                },
                {
                    id: 2235,
                    color: 'blue',
                    image: './assets/images/socks_blue.jpg',
                    quantity: 0
                }
            ]
        };
    },
    methods: {
        addToCart() {
            this.$emit('add-to-cart', this.variants[this.selectedVariant].id);
        },
        removeFromCart() {
            this.$emit('remove-from-cart', this.variants[this.selectedVariant].id);
        },
        updateProduct(index) {
            this.selectedVariant = index;
        }
    },
    mounted() {
        emitter.on('review-submitted', productReview => {
            this.reviews.push(productReview);
        });
    },
    props: {
        cart: {
            type: Array,
            required: true
        },
        premium: {
            type: Boolean,
            required: true
        }
    },
    template: /*html*/ `
    <div class="product-display">
        <div class="product-container">
            <div class="product-image">
                <img :src="image" :alt="altText" :class="{ 'out-of-stock-img': !inStock }">
            </div>

            <div class="product-info">
                <h1> {{ title }} </h1>
                <p v-if="inStock > 10">In Stock</p>
                <p v-else-if="inStock <= 10 && inStock > 0">Almost sold out!</p>
                <p v-else :class="{ outOfStock: !inStock }">Out of Stock</p>
                <p>{{ sale }}</p>

                <info-tabs :details="details" :shipping="shipping"></info-tabs>

                <div class="product-container">
                    <div v-for="(variant, index) in variants" :key="variant.id" class="color-circle" :style="{ backgroundColor: variant.color }" @mouseover="updateProduct(index)"></div>
                </div>

                <div class="product-container">  
                    <button class="button" :class="{ disabledButton: !inStock }" :disabled="!inStock" @click="addToCart"> Add to cart </button>
                
                    <button class="button" :class="{ disabledButton: !cart.includes(variants[selectedVariant].id) }" :disabled="!cart.includes(variants[selectedVariant].id)" @click="removeFromCart"> Remove from cart </button>
                </div>
            </div>

            <product-tabs :reviews="reviews"></product-tabs>

        </div>
    </div>
    `
});
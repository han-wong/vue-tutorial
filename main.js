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
            details: ['80% cotton', '20% polyester', 'Gender-neutral'],
            link: 'http://vuejs.org',
            onSale: true,
            product: 'Socks',
            reviews: [],
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
                    variantQuantity: 1
                }
            ]
        };
    },
    methods: {
        addReview(productReview) {
            this.reviews.push(productReview);
        },
        addToCart() {
            this.$emit('add-to-cart', this.variants[this.selectedVariant].variantId);
        },
        removeFromCart() {
            this.$emit('remove-from-cart', this.variants[this.selectedVariant].variantId);
        },
        updateProduct(index) {
            this.selectedVariant = index;
        }
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
                <button @click="removeFromCart" :class="{ disabledButton: !cart.includes(variants[selectedVariant].variantId) }" :disabled="!cart">Remove from cart</button>
            </div>
            <div>
                <h2>Reviews</h2>
                <p v-if="!reviews.length"> There are no reviews yet. </p>
                <ul>
                    <li v-for="review in reviews">
                        <p> {{ review.name }} </p>
                        <p> Rating: {{ review.rating }} </p>
                        <p> {{ review.review }} </p>
                        <p> Would you recommend this product?: {{ review.recommend }} </p>
                    </li>
                </ul>
            </div>
            <product-review @review-submitted="addReview"></product-review>
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

Vue.component('product-review', {
    data() {
        return {
            name: null,
            review: null,
            rating: null,
            recommend: null,
            errors: []
        };
    },
    methods: {
        onSubmit() {
            this.errors = [];
            if (this.name && this.review && this.rating) {
                let productReview = {
                    name: this.name,
                    review: this.review,
                    rating: this.rating,
                    recommend: this.recommend
                };
                this.$emit('review-submitted', productReview);
                this.name = null;
                this.review = null;
                this.rating = null;
                this.recommend = null;
            }
            else {
                if (!this.name) this.errors.push('Name required.');
                if (!this.review) this.errors.push('Review required.');
                if (!this.rating) this.errors.push('Rating required.');
                if (!this.recommend) this.errors.push('Recommendation required.');
            }
        }
    },
    template: `
        <form class="review-form" @submit.prevent="onSubmit">
            <p v-if="errors.length">
                <b> Please correct the following error(s): </b>
                <ul>
                    <li v-for="error in errors"> {{ error }} </li>
                </ul>
            </p>
            <p>
                <label for="name">Name:</label>
                <input type="text" id="name" v-model="name" placeholder="Name"></input>
            </p>
            <p>
                <label for="review">Review:</label>
                <textarea name="" id="review" cols="30" rows="10" v-model="review"></textarea>
            </p>
            <p>
                <label for="rating">Rating:</label>
                <select name="" id="rating" v-model.number="rating">
                    <option>5</option>
                    <option>4</option>
                    <option>3</option>
                    <option>2</option>
                    <option>1</option>
                </select>
            </p>
            <p> Would you recommend this product? <br>
                <label>Yes:</label>
                <input type="radio" v-model="recommend" value="Yes" checked />
                <label>No:</label>
                <input type="radio" v-model="recommend" value="No">
            </p>
            <p>
                <input type="submit" value="submit">
            </p>
        </form>
    `
});

var app = new Vue({
    computed: {

    },
    data: {
        cart: [],
        premium: true
    },
    el: '#app',
    methods: {
        addToCart: function (id) {
            this.cart.push(id);
        },
        removeFromCart: function (id) {
            this.cart.splice(this.cart.indexOf(id), 1);
        }
    }
});
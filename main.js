var eventBus = new Vue();

Vue.component('info-tabs', {
    data() {
        return {
            selectedTab: 'Details',
            tabs: ['Details', 'Shipping']
        };
    },
    methods: {

    },
    props: {
        details: {
            type: Array,
            required: true
        },
        shipping: {
            required: true
        }
    },
    template: `
        <div>
            <span 
                class="tab" 
                v-for="(tab, index) in tabs"
                :class="{ activeTab: selectedTab === tab }"
                :key="index"
                @click="selectedTab = tab">
                {{ tab }}
            </span>
     
            <div v-show="selectedTab === 'Details'">
                <product-details :details="details"></product-details>
            </div>

            <div v-show="selectedTab === 'Shipping'">
                <p>Shipping: {{ shipping }} </p>
            </div>

        </div>
    `
});

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
            onSale: true,
            product: 'Socks',
            reviews: [],
            selectedVariant: 0,
            variants: [
                {
                    variantId: 2234,
                    variantColor: 'green',
                    variantImage: './assets/vmSocks-green-onWhite.jpg',
                    variantQuantity: 100
                },
                {
                    variantId: 2235,
                    variantColor: 'blue',
                    variantImage: './assets/vmSocks-blue-onWhite.jpg',
                    variantQuantity: 10
                }
            ]
        };
    },
    methods: {
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
    mounted() {
        eventBus.$on('review-submitted', productReview => {
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
                
                <info-tabs :details="details" :shipping="shipping"></info-tabs>
                
                <div class="color-box" v-for="(variant, index) in variants" :key="variant.variantId"
                     :style="{ backgroundColor: variant.variantColor }" @mouseover="updateProduct(index)">
                </div>
                <button @click="addToCart" :class="{ disabledButton: !inStock }" :disabled="!inStock">Add to cart</button>
                <button @click="removeFromCart" 
                    :class="{ disabledButton: !cart.includes(variants[selectedVariant].variantId) }" 
                    :disabled="!cart.includes(variants[selectedVariant].variantId)">Remove from cart</button>
            </div>

            <product-tabs :reviews="reviews"></product-tabs>

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
                eventBus.$emit('review-submitted', productReview);
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
                <label>
                    Name: <br>
                    <input type="text" placeholder="Name" v-model="name"></input>
                </label>
            </p>
            <p>
                <label>
                    Review: <br>
                    <textarea v-model="review"></textarea>
                </label>
            </p>
            <p>
                <label>
                    Rating:
                    <select v-model.number="rating">
                        <option>5</option>
                        <option>4</option>
                        <option>3</option>
                        <option>2</option>
                        <option>1</option>
                    </select>
                </label>
            </p>
            <p>
                Would you recommend this product? <br>
                <label>
                    Yes: <input type="radio" value="Yes" v-model="recommend"></input>
                </label>
                |
                <label>
                    No: <input type="radio" value="No" v-model="recommend"></input>
                </label>
            </p>                
            <p>
                <input type="submit" value="submit"></input>
            </p>
        </form>
    `
});

Vue.component('product-tabs', {
    data() {
        return {
            selectedTab: 'Reviews',
            tabs: ['Reviews', 'Make a Review'],
        };
    },
    methods: {

    },
    props: {
        reviews: {
            type: Array,
            required: false
        }
    },
    template: `
        <div>
            <span 
                class="tab" 
                v-for="(tab, index) in tabs"
                :class="{ activeTab: selectedTab === tab }"
                :key="index"
                @click="selectedTab = tab">
                {{ tab }}
            </span>
            
            <div v-show="selectedTab === 'Reviews'">
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

            <div v-show="selectedTab === 'Make a Review'">
                <product-review></product-review>
            </div>

        </div>
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


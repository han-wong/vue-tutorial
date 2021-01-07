app.component('product-tabs', {
    data() {
        return {
            selectedTab: 'Reviews',
            tabs: ['Reviews', 'Leave a Review'],
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
    template: /*html*/ `
    <div>
        <span v-for="(tab, index) in tabs" :key="index" class="tabs" :class="{ activeTab: selectedTab === tab }" @click="selectedTab = tab"> {{ tab }} </span>

        <div v-show="selectedTab === 'Reviews'">
            <div v-if="!reviews.length" class="review-container">     
                <p> There are no reviews yet. </p>
            </div>
            <review-list v-else :reviews="reviews"></review-list>
        </div>

        <div v-show="selectedTab === 'Leave a Review'">
            <review-form></review-form>
        </div>
    </div>
    `
});
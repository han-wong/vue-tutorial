app.component('review-list', {
    props: {
        reviews: {
            type: Array,
            required: true
        }
    },
    template: /*html*/ `
    <div>
        <div v-for="(review, index) in reviews" :key="index" class="review-container">     
            <p> {{ review.name }} gave this {{ review.rating }} stars </p>
            <p> "{{ review.review }}" </p>
            <p> Would you recommend this product? <b> {{ review.recommend }} </b> </p>
        </div>
    </div>
    `
})
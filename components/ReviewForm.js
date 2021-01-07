app.component('review-form', {
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
            if (this.name && this.review && this.rating && this.recommend) {
                let productReview = {
                    name: this.name,
                    review: this.review,
                    rating: this.rating,
                    recommend: this.recommend
                };
                emitter.emit('review-submitted', productReview);
                console.log(productReview);
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
    template: /*html*/ `
    <form class="review-form" @submit.prevent="onSubmit">
        <div v-if="errors.length">
            <b> Please correct the following error(s): </b>
            <ul>
                <li v-for="error in errors"> {{ error }} </li>
            </ul>
        </div>
            
        <label>
            Name: <br>
            <input type="text" placeholder="Name" v-model="name" />
        </label>
            
        <label>
            Review: <br>
            <textarea v-model="review"></textarea>
        </label>
                
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
        
        <p> Would you recommend this product? </p>

        <div class="product-container">
            <label class="product-container">
                Yes:&nbsp; <input type="radio" value="Yes" v-model="recommend" />
            </label>
            <span> &emsp;&emsp; </span>
            <label class="product-container">
                No:&nbsp; <input type="radio" value="No" v-model="recommend" />
            </label>
        </div>
        
        <label>
            <input class="button" type="submit" value="submit" />
        </label>
    </form>
    `
});
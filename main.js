const app = Vue.createApp({
    data: function () {
        return {
            cart: [],
            premium: true
        };
    },
    methods: {
        addToCart: function (id) {
            this.cart.push(id);
        },
        removeFromCart: function (id) {
            this.cart.splice(this.cart.indexOf(id), 1);
        }
    }
});

const emitter = mitt();
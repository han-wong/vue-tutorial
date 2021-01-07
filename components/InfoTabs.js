app.component('info-tabs', {
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
    template: /*html*/ `
    <div>
        <span v-for="(tab, index) in tabs" :key="index"
        class="tabs" :class="{ activeTab: selectedTab === tab }"
        @click="selectedTab = tab"> {{ tab }} </span>

        <div v-show="selectedTab === 'Details'">
            <product-details :details="details"></product-details>
        </div>

        <div v-show="selectedTab === 'Shipping'">
            <ul>
                <li> Shipping: {{ shipping }} </li>
            </ul>
        </div>

    </div>
    `
});
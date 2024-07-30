import { shallowMount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import Vuetify from 'vuetify';
import vuetify from '@/test/vuetify';
import Index from '@/pages/index.vue'; // Adjust the import according to your file structure
import TradingViewChart from '~/components/TradingViewChart.vue';

const localVue = createLocalVue();
localVue.use(Vuex);

describe('index.vue', () => {

    let wrapper;

    beforeEach(() => {
        wrapper = shallowMount(Index, { localVue, vuetify });
    });

    it('renders the component correctly', async () => {

        const select = wrapper.findComponent({ name: 'v-select' });
        expect(select.exists()).toBe(true);

        // Check if v-select has the correct items
        await wrapper.vm.$nextTick(); // Wait for Vue to update the DOM
        const items = select.props('items');
        expect(items).toEqual([
            { value: 'BTCUSD', text: 'Bitcoin' },
            { value: 'ETHUSD', text: 'Ethereum' },
            { value: 'LTCUSD', text: 'Litecoin' },
        ]);

        // Ensure TradingViewChart is rendered with the initial symbol
        const chart = wrapper.findComponent({ name: 'trading-view-chart' });
        expect(chart.exists()).toBe(true);
        expect(chart.props('symbol')).toBe('BTCUSD');
    });

    it('updates TradingViewChart when a new symbol is selected', async () => {

        const select = wrapper.findComponent({ name: 'v-select' });
        expect(select.exists()).toBe(true);
    
        // Simulate selecting a new symbol from v-select
        select.vm.$emit('input', 'ETHUSD');
        await wrapper.vm.$nextTick(); // Wait for Vue to update the DOM
    
        // Ensure TradingViewChart is updated with the new symbol
        const chart = wrapper.findComponent({ name: 'trading-view-chart' });
        expect(chart.props('symbol')).toBe('ETHUSD');
    });
});

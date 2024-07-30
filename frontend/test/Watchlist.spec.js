import { shallowMount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import Watchlist from '@/components/Watchlist.vue'; // Adjust the import according to your file structure
import vuetify from '@/test/vuetify'; // Adjust the import according to your file structure

const localVue = createLocalVue();
localVue.use(Vuex);

describe('Watchlist.vue', () => {
  let actions;
  let store;

  beforeEach(() => {
    actions = {
      'watchlist/fetchWatchlist': jest.fn(),
      'watchlist/addToWatchlist': jest.fn(),
      'watchlist/removeFromWatchlist': jest.fn(),
    };

    store = new Vuex.Store({
      modules: {
        watchlist: {
          namespaced: true,
          actions,
          getters: {
            watchlist: () => ['BTC', 'ETH'],
            prices: () => ({ BTC: 50000, ETH: 3000 }),
          },
        },
      },
    });
  });

  it('renders watchlist items correctly', () => {
    const wrapper = shallowMount(Watchlist, { store, localVue, vuetify });

    expect(wrapper.findAll('v-list-item').length).toBe(0);
    expect(wrapper.text()).toContain('BTC');
    expect(wrapper.text()).toContain('ETH');
    expect(wrapper.text()).toContain('$ 50000');
    expect(wrapper.text()).toContain('$ 3000');
  });
});

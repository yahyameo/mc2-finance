import { shallowMount, createLocalVue, mount } from '@vue/test-utils';
import Vuex from 'vuex';
import vuetify from '@/test/vuetify'; // Adjust the import according to your file structure
import Login from '@/pages/login.vue'; // Adjust the import according to your file structure
import flushPromises from 'flush-promises';

const localVue = createLocalVue();
localVue.use(Vuex);

describe('login.vue', () => {
    let store;
    let actions;
    let wrapper;

    beforeEach(() => {
        wrapper = shallowMount(Login, { localVue, vuetify, store });

        actions = {
            'auth/login': jest.fn(),
        };

        store = new Vuex.Store({
            modules: {
                auth: {
                    namespaced: true,
                    actions,
                },
            },
        });
    });

    it('renders correctly', () => {
        const wrapper = shallowMount(Login, {
            localVue,
            vuetify,
            store,
        });
        expect(wrapper.find('.headline').text()).toBe('Login');
    });

    it('renders the component correctly', () => {
        // Check if all elements are rendered
        expect(wrapper.findComponent({ name: 'v-form' }).exists()).toBe(true);
        expect(wrapper.findComponent({ name: 'v-text-field' }).exists()).toBe(true);
        expect(wrapper.findComponent({ name: 'v-btn' }).exists()).toBe(true);
        expect(wrapper.findComponent({ name: 'v-alert' }).exists()).toBe(false);
    });
});

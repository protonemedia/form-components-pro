import Component from './../../src/Select.vue'
import { mount, shallowMount } from '@vue/test-utils'

describe('Vue 2 Core Select.vue', () => {
    it('maps an options object into an array', async () => {
        const options = [
            {
                label: "Laravel",
                value: "laravel"
            }
        ];

        const wrapper = mount(Component, {
            propsData: {
                options: {
                    laravel: "Laravel"
                }
            },
            render() { }
        });

        expect(wrapper.vm.mappedOptions).toEqual(options);
    })

    it('doesnt map an options array', async () => {
        const options = [
            {
                label: "Laravel",
                value: "laravel"
            }
        ];

        const wrapper = mount(Component, {
            propsData: {
                options: options
            },
            render() { }
        });

        expect(wrapper.vm.mappedOptions).toEqual(options);
    })

})
import Component from './../../src/SelectChild.vue'
import { mount, shallowMount } from '@vue/test-utils'

describe('Vue 2 Core SelectChild.vue', () => {
    it('renders a single option without a value', async () => {
        const wrapper = mount(Component, {
            propsData: {
                option: {
                    label: "Placeholder",
                    value: ""
                }
            }
        });

        expect(wrapper.html()).toEqual('<option value="">Placeholder</option>');
    })

    it('renders a single option', async () => {
        const wrapper = mount(Component, {
            propsData: {
                option: {
                    label: "Laravel",
                    value: "laravel"
                }
            }
        });

        expect(wrapper.html()).toEqual('<option value="laravel">Laravel</option>');
    })

    it('renders additional attributes', async () => {
        const wrapper = mount(Component, {
            propsData: {
                option: {
                    label: "Laravel",
                    value: "laravel",
                    disabled: true
                }
            }
        });

        expect(wrapper.html()).toEqual('<option disabled="disabled" value="laravel">Laravel</option>');
    })

    it('renders itself for an optgroup', async () => {
        const wrapper = mount(Component, {
            propsData: {
                option: {
                    label: "Frameworks",
                    options: [
                        {
                            label: "Laravel",
                            value: "laravel",
                        },
                        {
                            label: "Symfony",
                            value: "symfony",
                        }
                    ]
                }
            }
        });

        expect(wrapper.html().replace(/\s\s+/g, ' ').replace(/\n+/g, '')).toEqual('<optgroup label="Frameworks"> <option value="laravel">Laravel</option> <option value="symfony">Symfony</option></optgroup>');
    })
})
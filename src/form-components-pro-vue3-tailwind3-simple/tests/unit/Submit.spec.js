import Component from './App.vue'
import { mount } from '@vue/test-utils'

describe('Tailwind v3 Submit.vue', () => {
    it('has a default label', async () => {
        const wrapper = mount(Component)

        const radio = wrapper.find('form#regular-form button[type="submit"]')
        expect(radio.text()).toBe("Submit");
    })

    it('has a slot to customize the label', async () => {
        const wrapper = mount(Component)

        const radio = wrapper.find('form#bound-form button[type="submit"]')
        expect(radio.text()).toBe("Click here!");
    })
})

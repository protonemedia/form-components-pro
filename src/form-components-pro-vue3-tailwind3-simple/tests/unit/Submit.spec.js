import Component from './App.vue'
import { mount } from '@vue/test-utils'

describe('Tailwind v3 Submit.vue', () => {
    it('has a default label', async () => {
        const wrapper = mount(Component)

        const radio = wrapper.find('form#regular-form button[type="submit"]')
        expect(radio.text()).toBe("Submit");
    })

    it('has a property to customize the label', async () => {
        const wrapper = mount(Component)

        const radio = wrapper.find('form#misc-form button[type="submit"]')
        expect(radio.text()).toBe("Click here!");
    })

    it('has a slot to customize the label', async () => {
        const wrapper = mount(Component)

        const radio = wrapper.find('form#bound-form button[type="submit"]')
        expect(radio.text()).toBe("Click here!");
    })

    it('shows a spinner whenever the form is processing', async () => {
        const wrapper = mount(Component)

        expect(wrapper.find('form#misc-form button[type="submit"]').exists()).toBe(true);
        expect(wrapper.find('form#misc-form button[type="submit"] svg').exists()).toBe(false);

        wrapper.vm.resource.processing = true;

        await wrapper.vm.$nextTick();

        expect(wrapper.find('form#misc-form button[type="submit"] svg').exists()).toBe(true);
    })
})

import Component from './App.vue'
import { mount } from '@vue/test-utils'

describe('Tailwind v2 Radio.vue', () => {
    it('updates the radio value by v-model', async () => {
        const wrapper = mount(Component)

        const radio = wrapper.find('#radio-b-v-model')
        expect(radio.element.checked).toBeFalsy();

        wrapper.vm.resource.radio = "b";
        await wrapper.vm.$nextTick()
        expect(radio.element.checked).toBeTruthy();
    })

    it('updates the v-model by changing the value', async () => {
        const wrapper = mount(Component)

        const radio = wrapper.find('#radio-b-v-model')
        expect(radio.element.checked).toBeFalsy();

        // https://vue-test-utils.vuejs.org/api/wrapper/#setchecked
        radio.element.checked = true;
        radio.trigger('change')

        await wrapper.vm.$nextTick()
        expect(wrapper.vm.resource.radio).toBeTruthy();
    })

    //

    it('updates the radio value by name and form binding', async () => {
        const wrapper = mount(Component)

        const radio = wrapper.find('#radio-b-injected')
        expect(radio.element.checked).toBeFalsy();

        wrapper.vm.resource.radio = "b";
        await wrapper.vm.$nextTick()
        expect(radio.element.checked).toBeTruthy();
    })

    it('updates the form binding by changing the value', async () => {
        const wrapper = mount(Component)

        const radio = wrapper.find('#radio-b-injected')
        expect(radio.element.checked).toBeFalsy();

        // https://vue-test-utils.vuejs.org/api/wrapper/#setchecked
        radio.element.checked = true;
        radio.trigger('change')

        await wrapper.vm.$nextTick()
        expect(wrapper.vm.resource.radio).toBeTruthy();
    })

    //

    it('can display the error by a binding on the radio element', async () => {
        const wrapper = mount(Component)
        const regularForm = wrapper.find('#regular-form');

        expect(regularForm.html()).not.toContain("Whoops!");

        wrapper.vm.errors.radio = "Whoops!";
        wrapper.vm.$forceUpdate()
        await wrapper.vm.$nextTick()
        expect(regularForm.html()).toContain("Whoops!");
    })

    it('can display the error by a binding on the form element', async () => {
        const wrapper = mount(Component)
        const boundForm = wrapper.find('#bound-form');

        expect(boundForm.html()).not.toContain("Whoops!");

        wrapper.vm.errors.radio = "Whoops!";
        await wrapper.vm.$nextTick()
        expect(boundForm.html()).toContain("Whoops!");
    })
})

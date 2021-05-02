import Component from './App.vue'
import { mount } from '@vue/test-utils'

describe('Tailwind v2 Checkbox.vue', () => {
    it('updates the checkbox value by v-model', async () => {
        const wrapper = mount(Component)

        const checkbox = wrapper.find('#checkbox-v-model')
        expect(checkbox.element.checked).toBeFalsy();

        wrapper.vm.resource.checkbox = true;
        await wrapper.vm.$nextTick()
        expect(checkbox.element.checked).toBeTruthy();
    })

    it('updates the v-model by changing the value', async () => {
        const wrapper = mount(Component)

        const checkbox = wrapper.find('#checkbox-v-model')
        expect(checkbox.element.checked).toBeFalsy();

        // https://vue-test-utils.vuejs.org/api/wrapper/#setchecked
        checkbox.element.checked = true;
        checkbox.trigger('change')

        await wrapper.vm.$nextTick()
        expect(wrapper.vm.resource.checkbox).toBeTruthy();
    })

    //

    it('updates the checkbox value by name and form binding', async () => {
        const wrapper = mount(Component)

        const checkbox = wrapper.find('#checkbox-injected')
        expect(checkbox.element.checked).toBeFalsy();

        wrapper.vm.resource.checkbox = true;
        await wrapper.vm.$nextTick()
        expect(checkbox.element.checked).toBeTruthy();
    })

    it('updates the form binding by changing the value', async () => {
        const wrapper = mount(Component)

        const checkbox = wrapper.find('#checkbox-injected')
        expect(checkbox.element.checked).toBeFalsy();

        // https://vue-test-utils.vuejs.org/api/wrapper/#setchecked
        checkbox.element.checked = true;
        checkbox.trigger('change')

        await wrapper.vm.$nextTick()
        expect(wrapper.vm.resource.checkbox).toBeTruthy();
    })

    //

    it('can display the error by a binding on the checkbox element', async () => {
        const wrapper = mount(Component)
        const regularForm = wrapper.find('#regular-form');

        expect(regularForm.html()).not.toContain("Whoops!");

        wrapper.vm.errors.checkbox = "Whoops!";
        wrapper.vm.$forceUpdate()
        await wrapper.vm.$nextTick()
        expect(regularForm.html()).toContain("Whoops!");
    })

    it('can display the error by a binding on the form element', async () => {
        const wrapper = mount(Component)
        const boundForm = wrapper.find('#bound-form');

        expect(boundForm.html()).not.toContain("Whoops!");

        wrapper.vm.errors = { checkbox: "Whoops!" };
        await wrapper.vm.$nextTick()
        expect(boundForm.html()).toContain("Whoops!");
    })
})

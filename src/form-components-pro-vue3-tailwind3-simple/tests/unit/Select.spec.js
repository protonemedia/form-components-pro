import Component from './App.vue'
import { mount } from '@vue/test-utils'
import find from 'lodash-es/find'

describe('Tailwind v3 Select.vue', () => {
    it('updates the select value by v-model', async () => {
        const wrapper = mount(Component)

        const select = wrapper.find('#select-v-model')
        expect(select.element.value).toEqual('a')

        wrapper.vm.resource.select = "b";
        await wrapper.vm.$nextTick()
        expect(select.element.value).toEqual('b')
    })

    it('updates the v-model by changing the value', async () => {
        const wrapper = mount(Component)

        const select = wrapper.find('#select-v-model')
        expect(select.element.value).toEqual('a')

        await select.setValue("b")
        expect(wrapper.vm.resource.select).toEqual('b')
    })

    //

    it('updates the select value by name and form binding', async () => {
        const wrapper = mount(Component)

        const select = wrapper.find('#select-injected')
        expect(select.element.value).toEqual('a')

        wrapper.vm.resource.select = "b";
        await wrapper.vm.$nextTick()
        expect(select.element.value).toEqual('b')
    })

    it('updates the form binding by changing the value', async () => {
        const wrapper = mount(Component)

        const select = wrapper.find('#select-injected')
        expect(select.element.value).toEqual('a')

        await select.setValue("b")
        expect(wrapper.vm.resource.select).toEqual('b')
    })

    //

    it('can display the error by a binding on the select element', async () => {
        const wrapper = mount(Component)
        const regularForm = wrapper.find('#regular-form');

        expect(regularForm.html()).not.toContain("Whoops!");

        wrapper.vm.errors.select = "Whoops!";
        wrapper.vm.$forceUpdate()
        await wrapper.vm.$nextTick()
        expect(regularForm.html()).toContain("Whoops!");
    })

    it('can display the error by a binding on the form element', async () => {
        const wrapper = mount(Component)
        const boundForm = wrapper.find('#bound-form');

        expect(boundForm.html()).not.toContain("Whoops!");

        wrapper.vm.errors.select = "Whoops!";
        await wrapper.vm.$nextTick()
        expect(boundForm.html()).toContain("Whoops!");
    })

    //

    it('uses the choices library to filter through options', async () => {
        const wrapper = mount(Component)
        await wrapper.vm.$nextTick();
        await wrapper.vm.$nextTick();

        const select = wrapper.findComponent({ ref: 'select' }).vm;

        expect(select.choicesInstance).not.toBeNull();
    })

    it('uses the choices library to filter through multiple options', async () => {
        const wrapper = mount(Component)
        await wrapper.vm.$nextTick();
        await wrapper.vm.$nextTick();

        const select = wrapper.findComponent({ ref: 'multiSelect' }).vm;

        expect(select.choicesInstance).not.toBeNull();
    })

    //

    it('can give choices.js a custom set of options', async () => {
        const wrapper = mount(Component)
        await wrapper.vm.$nextTick();
        await wrapper.vm.$nextTick();

        const select = wrapper.findComponent({ ref: 'customSelect' }).vm;

        expect(select.choicesInstance).not.toBeNull();
        expect(select.choicesInstance.config.loadingText).toEqual("Waiting...");
    });

})

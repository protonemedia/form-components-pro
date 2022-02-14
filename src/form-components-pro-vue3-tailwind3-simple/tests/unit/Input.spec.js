import Component from './App.vue'
import { mount } from '@vue/test-utils'
import find from 'lodash-es/find'

describe('Tailwind v3 Input.vue', () => {
    it('updates the input value by v-model', async () => {
        const wrapper = mount(Component)

        const input = wrapper.find('#input-v-model')
        expect(input.element.value).toEqual('Initial Input')

        wrapper.vm.resource.input = "Updated Text";
        await wrapper.vm.$nextTick()
        expect(input.element.value).toEqual('Updated Text')
    })

    it('updates the v-model by changing the value', async () => {
        const wrapper = mount(Component)

        const input = wrapper.find('#input-v-model')
        expect(input.element.value).toEqual('Initial Input')

        await input.setValue("Updated Text")
        expect(wrapper.vm.resource.input).toEqual('Updated Text')
    })

    //

    it('updates the input value by name and form binding', async () => {
        const wrapper = mount(Component)

        const input = wrapper.find('#input-injected')
        expect(input.element.value).toEqual('Initial Input')

        wrapper.vm.resource.input = "Updated Text";
        await wrapper.vm.$nextTick()
        expect(input.element.value).toEqual('Updated Text')
    })

    it('updates the form binding by changing the value', async () => {
        const wrapper = mount(Component)

        const input = wrapper.find('#input-injected')
        expect(input.element.value).toEqual('Initial Input')

        await input.setValue("Updated Text")
        expect(wrapper.vm.resource.input).toEqual('Updated Text')
    })

    //

    it('can display the error by a binding on the input element', async () => {
        const wrapper = mount(Component)
        const regularForm = wrapper.find('#regular-form');

        expect(regularForm.html()).not.toContain("Whoops!");

        wrapper.vm.errors.input = "Whoops!";
        wrapper.vm.$forceUpdate()
        await wrapper.vm.$nextTick()
        expect(regularForm.html()).toContain("Whoops!");
    })

    it('can display the error by a binding on the form element', async () => {
        const wrapper = mount(Component)
        const boundForm = wrapper.find('#bound-form');

        expect(boundForm.html()).not.toContain("Whoops!");

        wrapper.vm.errors.input = "Whoops!";
        await wrapper.vm.$nextTick()
        expect(boundForm.html()).toContain("Whoops!");
    })

    //

    it('uses the flatpickr library to select a date', async () => {
        const wrapper = mount(Component)
        await wrapper.vm.$nextTick();
        await wrapper.vm.$nextTick();

        const input = wrapper.findComponent({ ref: 'date' }).vm;

        expect(input.flatpickrInstance).not.toBeNull();
        expect(input.flatpickrInstance.config.dateFormat).toEqual("Y-m-d")
    })

    it('uses the flatpickr library to select a time', async () => {
        const wrapper = mount(Component)
        await wrapper.vm.$nextTick();
        await wrapper.vm.$nextTick();

        const input = wrapper.findComponent({ ref: 'time' }).vm;

        expect(input.flatpickrInstance).not.toBeNull();
        expect(input.flatpickrInstance.config.dateFormat).toEqual("H:i")
    })

    it('uses the flatpickr library to select a datetime', async () => {
        const wrapper = mount(Component)
        await wrapper.vm.$nextTick();
        await wrapper.vm.$nextTick();

        const input = wrapper.findComponent({ ref: 'datetime' }).vm;

        expect(input.flatpickrInstance).not.toBeNull();
        expect(input.flatpickrInstance.config.dateFormat).toEqual("Y-m-d H:i")
    })

    it('can give flatpickr a custom set of options on the date attribute', async () => {
        const wrapper = mount(Component)
        await wrapper.vm.$nextTick();
        await wrapper.vm.$nextTick();

        const input = wrapper.findComponent({ ref: 'customDate' }).vm;

        expect(input.flatpickrInstance).not.toBeNull();
        expect(input.flatpickrInstance.config.dateFormat).toEqual("d-m-Y")
    })

    it('can give flatpickr a custom set of options on the time attribute', async () => {
        const wrapper = mount(Component)
        await wrapper.vm.$nextTick();
        await wrapper.vm.$nextTick();

        const input = wrapper.findComponent({ ref: 'customTime' }).vm;

        expect(input.flatpickrInstance).not.toBeNull();
        expect(input.flatpickrInstance.config.dateFormat).toEqual("i:H")
    })
})
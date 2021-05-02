import Component from './App.vue'
import { mount } from '@vue/test-utils'
import find from 'lodash-es/find'

describe('Tailwind v2 Textarea.vue', () => {
    it('updates the textarea  value by v-model', async () => {
        const wrapper = mount(Component)

        const textarea = wrapper.find('#textarea-v-model')
        expect(textarea.element.value).toEqual('Initial Textarea')

        wrapper.vm.resource.textarea = "Updated Text";
        await wrapper.vm.$nextTick()
        expect(textarea.element.value).toEqual('Updated Text')
    })

    it('updates the v-model by changing the value', async () => {
        const wrapper = mount(Component)

        const textarea = wrapper.find('#textarea-v-model')
        expect(textarea.element.value).toEqual('Initial Textarea')

        await textarea.setValue("Updated Text")
        expect(wrapper.vm.resource.textarea).toEqual('Updated Text')
    })

    //

    it('updates the textarea value by name and form binding', async () => {
        const wrapper = mount(Component)

        const textarea = wrapper.find('#textarea-injected')
        expect(textarea.element.value).toEqual('Initial Textarea')

        wrapper.vm.resource.textarea = "Updated Text";
        await wrapper.vm.$nextTick()
        expect(textarea.element.value).toEqual('Updated Text')
    })

    it('updates the form bynding by changing the value', async () => {
        const wrapper = mount(Component)

        const textarea = wrapper.find('#textarea-injected')
        expect(textarea.element.value).toEqual('Initial Textarea')

        await textarea.setValue("Updated Text")
        expect(wrapper.vm.resource.textarea).toEqual('Updated Text')
    })

    //

    it('can display the error by a binding on the textarea element', async () => {
        const wrapper = mount(Component)
        const regularForm = wrapper.find('#regular-form');

        expect(regularForm.html()).not.toContain("Whoops!");

        wrapper.vm.errors.textarea = "Whoops!";
        wrapper.vm.$forceUpdate()
        await wrapper.vm.$nextTick()
        expect(regularForm.html()).toContain("Whoops!");
    })

    it('can display the error by a binding on the form element', async () => {
        const wrapper = mount(Component)
        const boundForm = wrapper.find('#bound-form');

        expect(boundForm.html()).not.toContain("Whoops!");

        wrapper.vm.errors = { textarea: "Whoops!" };
        await wrapper.vm.$nextTick()
        expect(boundForm.html()).toContain("Whoops!");
    })

    //

    it('uses the autosize library to auto resize the textarea height', async () => {
        const wrapper = mount(Component)
        await wrapper.vm.$nextTick();

        const miscForm = wrapper.find('#misc-form');

        const textarea = find(miscForm.vm.$children, (child) => {
            return child.$el.__vue__.name === "textarea";
        })

        await wrapper.vm.$nextTick()

        expect(textarea.autosizeInstance).not.toBeNull();
    })
})

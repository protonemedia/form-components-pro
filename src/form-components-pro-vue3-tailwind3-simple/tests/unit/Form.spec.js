import Component from './App.vue'
import { mount } from '@vue/test-utils'

describe('Tailwind v3 Form.vue', () => {
    it('disables the form whenever the form is processing', async () => {
        const wrapper = mount(Component)

        expect(wrapper.find('form#bound-form fieldset').element.disabled).toBe(false)

        wrapper.vm.resource.processing = true;

        await wrapper.vm.$nextTick();

        expect(wrapper.find('form#bound-form fieldset').element.disabled).toBe(true)
    })
})

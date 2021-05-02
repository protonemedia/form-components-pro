import Component from './App.vue'
import { mount } from '@vue/test-utils'

const mockFileInput = function (fileInput) {
    const mock = jest.fn();

    Object.defineProperty(fileInput.element, 'files', {
        get: mock
    });

    return mock;
}

describe('Tailwind v2 File.vue', () => {
    it('updates the v-model by changing the value', async () => {
        const wrapper = mount(Component)

        const input = wrapper.find('#file-v-model')

        const mock = mockFileInput(input);

        mock.mockReturnValue([{
            name: 'my-file.txt'
        }])

        input.trigger('change');

        await wrapper.vm.$nextTick();

        expect(wrapper.vm.resource.file).not.toBeNull();
        expect(wrapper.html()).toContain("my-file.txt")
    })

    it('updates the input value by v-model', async () => {
        const wrapper = mount(Component)

        const input = wrapper.find('#file-v-model')
        expect(input.element.value).toEqual("");
        expect(input.element.files).toHaveLength(0);

        wrapper.vm.resource.file = {
            name: 'my-file.txt'
        };

        await wrapper.vm.$nextTick();
        expect(wrapper.html()).toContain("my-file.txt")
    })

    // //

    it('updates the form binding by changing the value', async () => {
        const wrapper = mount(Component)

        const input = wrapper.find('#file-injected')

        const mock = mockFileInput(input);

        mock.mockReturnValue([{
            name: 'my-file.txt'
        }])

        input.trigger('change');

        await wrapper.vm.$nextTick();

        expect(wrapper.vm.resource.file).not.toBeNull();
        expect(wrapper.html()).toContain("my-file.txt")
    })

    it('updates the input value by name and form binding', async () => {
        const wrapper = mount(Component)

        const input = wrapper.find('#file-injected')
        expect(input.element.value).toEqual("");
        expect(input.element.files).toHaveLength(0);

        wrapper.vm.resource.file = {
            name: 'my-file.txt'
        };

        await wrapper.vm.$nextTick();
        expect(wrapper.html()).toContain("my-file.txt")
    })

    // //

    it('can display the error by a binding on the input element', async () => {
        const wrapper = mount(Component)
        const regularForm = wrapper.find('#regular-form');

        expect(regularForm.html()).not.toContain("Whoops!");

        wrapper.vm.errors.file = "Whoops!";
        wrapper.vm.$forceUpdate()
        await wrapper.vm.$nextTick()
        expect(regularForm.html()).toContain("Whoops!");
    })

    it('can display the error by a binding on the form element', async () => {
        const wrapper = mount(Component)
        const boundForm = wrapper.find('#bound-form');

        expect(boundForm.html()).not.toContain("Whoops!");

        wrapper.vm.errors = { file: "Whoops!" };
        await wrapper.vm.$nextTick()
        expect(boundForm.html()).toContain("Whoops!");
    })
})
import Component from './App.vue'
import { mount } from '@vue/test-utils'

const mockFileInput = function (fileInput) {
    const mock = jest.fn();

    Object.defineProperty(fileInput.element, 'files', {
        get: mock
    });

    return mock;
}

describe('Tailwind v3 File.vue (multiple)', () => {
    it('updates the v-model by changing the value', async () => {
        const wrapper = mount(Component)

        const input = wrapper.find('#multi-file-v-model')

        const mock = mockFileInput(input);

        mock.mockReturnValue({
            0: { name: 'my-file1.txt' },
            1: { name: 'my-file2.txt' }
        })

        input.trigger('change');

        await wrapper.vm.$nextTick();

        expect(wrapper.vm.resource.multiFile).not.toBeNull();
        expect(wrapper.html()).toContain("my-file1.txt")
        expect(wrapper.html()).toContain("my-file2.txt")
    })

    it('updates the input value by v-model', async () => {
        const wrapper = mount(Component)

        const input = wrapper.find('#multi-file-v-model')
        expect(input.element.value).toEqual("");
        expect(input.element.files).toHaveLength(0);

        wrapper.vm.resource.multiFile = [
            { name: 'my-file1.txt' },
            { name: 'my-file2.txt' },
        ];

        await wrapper.vm.$nextTick();
        expect(wrapper.html()).toContain("my-file1.txt")
        expect(wrapper.html()).toContain("my-file2.txt")
    })

    // //

    it('updates the form binding by changing the value', async () => {
        const wrapper = mount(Component)

        const input = wrapper.find('#multi-file-injected')

        const mock = mockFileInput(input);

        mock.mockReturnValue({
            0: { name: 'my-file1.txt' },
            1: { name: 'my-file2.txt' }
        })

        input.trigger('change');

        await wrapper.vm.$nextTick();

        expect(wrapper.vm.resource.multiFile).not.toBeNull();
        expect(wrapper.html()).toContain("my-file1.txt")
        expect(wrapper.html()).toContain("my-file2.txt")
    })

    it('updates the input value by name and form binding', async () => {
        const wrapper = mount(Component)

        const input = wrapper.find('#multi-file-injected')
        expect(input.element.value).toEqual("");
        expect(input.element.files).toHaveLength(0);

        wrapper.vm.resource.multiFile = [
            { name: 'my-file1.txt' },
            { name: 'my-file2.txt' },
        ];

        await wrapper.vm.$nextTick();
        expect(wrapper.html()).toContain("my-file1.txt")
        expect(wrapper.html()).toContain("my-file2.txt")
    })
})
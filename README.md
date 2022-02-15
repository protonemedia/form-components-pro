# Form Components Pro

A set of Vue 3 components to rapidly build forms with Tailwind CSS 3. It supports validation, model binding, includes default vendor styling and is fully customizable!

## Features

* Components for input, textarea, file, multi-file, select, multi-select, checkbox and radio elements.
* Support for Tailwind 3 with [Tailwind Forms](https://tailwindcss-forms.vercel.app/).
* Support for Vue 3.
* Support for the [Inertia.js Form Helper](https://inertiajs.com/forms#form-helper).
* Component scripts independent from templates. Templates use the same logic.
* Bind a target to a form (or a set of elements) to provide default values (model binding).
* Validation errors.
* Support for [autosize](https://github.com/jackmoore/autosize)
* Support for [Choices.js](https://github.com/Choices-js/Choices)
* Support for [Flatpickr](https://flatpickr.js.org)

## Support

We proudly support the community by developing libraries and packages and giving them away for free. Keeping track of issues and pull requests takes time, but we're happy to help! If this package saves you time or if you're relying on it professionally, please consider [supporting the maintenance and development](https://github.com/sponsors/pascalbaljet).

## Documentation

* [Quick example](#quick-example)
* [Installation](#installation)
  + [Register components](#register-components)
    - [Register globally](#register-globally)
    - [Register per component](#register-per-component)
* [Reactivity](#reactivity)
  + [Use v-model on individual form elements](#use-v-model-on-individual-form-elements)
  + [Use v-model on the Form component](#use-v-model-on-the-form-component)
* [Validation errors](#validation-errors)
  + [Specify an error per element](#specify-an-error-per-element)
  + [Errors per form](#errors-per-form)
  + [Hiding errors](#hiding-errors)
* [Select element](#select-element)
* [File element](#file-element)
* [Integrations with third-party Libaries](#integrations-with-third-party-libaries)
  + [Autosize](#autosize)
  + [Flatpickr](#flatpickr)
  + [Choices.js](#choicesjs)
* [Misc](#misc)
  + [Submit button](#submit-button)
  + [Group component](#group-component)
  + [Attribute inheritance](#attribute-inheritance)

## Quick example

In the example below you'll find [two-way binding on the Form Component](#use-v-model-on-the-form-component), [validation error evaluation](#errors-per-form), integration with [Autosize, Choices.js and Flatpickr](#integrations-with-third-party-libaries), and the [Group component](#group-component).

```vue
<template>
  <div id="app">
    <Form class="p-8 max-w-md" v-model="user" :errors="errors">
      <Input name="name" label="Your name" />

      <Textarea name="biography.en" label="Write your story (English)" autosize />
      <Textarea name="biography.nl" label="Write your story (Dutch)" autosize />
      <Input name="date_of_birth" label="Date of birth" date />
      <Select name="favorite_framework" :options="frameworks" label="Pick your favorite framework" choices />
      <Select name="interests" :options="interests" label="Choose your interests" multiple choices />

      <Group label="Prefered IDE theme" name="theme" inline>
        <Radio name="theme" value="dark" label="Dark theme" />
        <Radio name="theme" value="light" label="Light theme" />
      </Group>

      <Group>
        <Checkbox name="newsletter" label="Do you want to receive my newsletter?" />
      </Group>

      <Submit />
    </Form>
  </div>
</template>

<script setup>
import { reactive } from "vue";

const user = reactive({
    name: "Form Components Pro",
    biography: {
        en: "",
        nl: "",
    },
    date_of_birth: "",
    favorite_framework: "tailwind",
    interests: ["tailwind", "inertiajs", "laravel"],
    theme: "dark",
    newsletter: true,
});

const frameworks = {
    tailwind: "Tailwind CSS",
    bootstrap: "Bootstrap",
};

const interests = [
    { value: "tailwind", label: "Tailwind CSS" },
    { value: "bootstrap", label: "Bootstrap" },
    { value: "inertiajs", label: "Inertia.js" },
    { value: "livewire", label: "Livewire" },
    { value: "laravel", label: "Laravel" },
];

const errors = reactive({
    biography: {
        en: "Tell me!",
    },
    date_of_birth: "Hey, this is required!",
});
</script>
```

<img src="https://github.com/protonemedia/form-components-pro/blob/main/form_example.png?raw=true" width="424" />

## Installation

Make sure you've installed the [@tailwindcss/forms](https://github.com/tailwindlabs/tailwindcss-forms) plugin correctly. You can install the package with `npm` or `yarn`:

```bash
npm install @protonemedia/form-components-pro-vue3-tailwind3-simple
```

## Tailwind configuration

Add the repository path to the `content` array of your [Tailwind configuration file](https://tailwindcss.com/docs/installation). This ensures that the styling also works on production builds.

```js
module.exports = {
  content: [
    './node_modules/@protonemedia/**/*.{js,vue}',
  ]
}
```

### Register components

To start using the components, you need to [register](https://vuejs.org/guide/components/registration.html) the components. You can do this globally for your Vue.js app or per component.

#### Register globally

By registering the Form Components globally, you can use them in the template of any root Vue instance (`new Vue`).

```js
import {
  Checkbox,
  Form,
  File,
  Group,
  Input,
  Radio,
  Select,
  Submit,
  Textarea,
} from "@protonemedia/form-components-pro-vue3-tailwind3-simple";

import { createApp } from 'vue'

const app = createApp({})

app
  .component('Checkbox', Checkbox)
  .component('Form', Form)
  .component('Group', Group)
  .component('Input', Input)
  .component('Radio', Radio)
  .component('Select', Select)
  .component('Submit', Submit)
  .component('Textarea', Textarea);
```

#### Register in Inertia.js apps

If you're using the `createInertiaApp` method to [boot your Inertia app](https://inertiajs.com/client-side-setup), you may register the components in the `setup` section.

```js
createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) => require(`./Pages/${name}.vue`),
    setup({ el, app, props, plugin }) {
        return createApp({ render: () => h(app, props) })
            .use(plugin)
            .mixin({ methods: { route } })
            .component('Checkbox', Checkbox)
            .component('Form', Form)
            .component('Group', Group)
            .component('Input', Input)
            .component('Radio', Radio)
            .component('Select', Select)
            .component('Submit', Submit)
            .component('Textarea', Textarea)
            .mount(el);
    },
});
```

#### Register per component

Instead of registering the components globally, you can also choose to define them in the `components` object of a Vue component.

```vue
<template>
  <div id="user_settings">
    <Form class="p-8">

    </Form>
  </div>
</template>

<script>
import {
  Checkbox,
  Form,
  File,
  Group,
  Input,
  Radio,
  Select,
  Submit,
  Textarea,
} from "@protonemedia/form-components-pro-vue3-tailwind3-simple";

export default {
  components: {
    Checkbox,
    Form,
    File,
    Group,
    Input,
    Radio,
    Select,
    Submit,
    Textarea,
  },
};
</script>
```

## Reactivity

One of the great features of Vue is [two-way data bindings](https://vuejs.org/guide/essentials/forms.html) on form elements. This is fully supported on all Form Components and all integrations with third-party libraries.

### Use v-model on individual form elements

You can set the `v-model` on each individual form element. The `label` attribute is optional.

```vue
<template>
  <div id="app">
    <Form class="p-8">
      <Input v-model="user.name" label="Your name" />
      <Textarea v-model="user.biography" label="Write your story" autosize />
      <Input v-model="user.date_of_birth" label="Date of birth" date />
      <Select v-model="user.favorite_framework" :options="frameworks" label="Pick your favorite framework"/>
      <Select v-model="user.interests" :options="interests" label="Choose your interests" multiple />

      <Group label="Prefered IDE theme" inline>
        <Radio v-model="user.theme" value="dark" label="Dark theme" />
        <Radio v-model="user.theme" value="light" label="Light theme" />
      </Group>

      <Group>
        <Checkbox v-model="user.newsletter" label="Do you want to receive my newsletter?" />
      </Group>

      <Submit />
    </Form>
  </div>
</template>

<script setup>
import { reactive } from "vue";

const user = reactive({
    name: "",
    biography: "",
    date_of_birth: "",
    favorite_framework: "",
    interests: [],
    theme: "light",
    newsletter: false,
});

const frameworks = {
    tailwind: "Tailwind CSS",
    bootstrap: "Bootstrap",
};

const interests = [
    { value: "tailwind", label: "Tailwind CSS" },
    { value: "bootstrap", label: "Bootstrap" },
    { value: "inertiajs", label: "Inertia.js" },
    { value: "livewire", label: "Livewire" },
    { value: "laravel", label: "Laravel" },
];
</script>
```

### Use v-model on the Form component

You can also pass an object to the form by using `v-model` on the `Form` component. The binding of the Form Components is now based on the `name` attribute. Nested properties using the dot-notation are supported as well (`biography` example). The package can [evaluate validation errors](#errors-per-form) by the `name` attribute as well. This is great as the `name` attribute is used for both, so you don't have to define the `v-model` and `error` attributes manually.

```vue
<template>
  <div id="app">
    <Form class="p-8" v-model="user">
      <Input name="name" label="Your name" />

      <Textarea name="biography.en" label="Write your story (English)" autosize />
      <Textarea name="biography.nl" label="Write your story (Dutch)" autosize />

      <Input name="date_of_birth" label="Date of birth" date />
      <Select name="favorite_framework" :options="frameworks" label="Pick your favorite framework" />
      <Select name="interests" :options="interests" label="Choose your interests" multiple />

      <Group label="Prefered IDE theme" inline>
        <Radio name="theme" value="dark" label="Dark theme" />
        <Radio name="theme" value="light" label="Light theme" />
      </Group>

      <Group>
        <Checkbox name="newsletter" label="Do you want to receive my newsletter?" />
      </Group>

      <Submit />
    </Form>
  </div>
</template>

<script setup>
import { reactive } from "vue";

const user = reactive({
    name: "",
    biography: {
        en: "",
        nl: "",
    },
    date_of_birth: "",
    favorite_framework: "",
    interests: [],
    theme: "light",
    newsletter: false,
});

const frameworks = [
    { value: "tailwind", label: "Tailwind CSS" },
    { value: "bootstrap", label: "Bootstrap" },
],

const interests = [
    { value: "tailwind", label: "Tailwind CSS" },
    { value: "bootstrap", label: "Bootstrap" },
    { value: "inertiajs", label: "Inertia.js" },
    { value: "livewire", label: "Livewire" },
    { value: "laravel", label: "Laravel" },
],
</script>
```

## Validation errors

### Specify an error per element

With the `error` attribute, you can pass a validation error to any form element. This also works for the `Group` component.

```vue
<Form>
  <Input v-model="user.name" :error="errors.name" />

  <Group label="Prefered IDE theme" inline :error="errors.theme">
    <Radio v-model="user.theme" value="dark" label="Dark theme" />
    <Radio v-model="user.theme" value="light" label="Light theme" />
  </Group>

  <Submit />
</Form>
```

### Errors per form

Just like passing an object to `v-model` on the `Form` component, you can give it an error object as well. Now each error will be evaluated by the `name` attribute.

```vue
<Form v-model="company" :errors="errors">
  <Input name="business_name" />
  <Input name="vat_number" />

  <Submit />
</Form>
```

### Hiding errors

Suppose you want to hide a validation error. In that case, you can use the `show-error` attribute, which defaults to `true` (except on the [Radio component](#group-component)).

```vue
<Form v-model="company" :errors="errors">
  <Input name="business_name" />
  <Input name="vat_number" :show-error="false" />

  <Submit />
</Form>
```

## Select element

You can give the `Select` component a set of options that is either an Array or an Object. If you go with an Object, it should be a simple *key-value* collection. An Array should consists of one or more objects that have a `value` and `label` key.

Object example:

```vue
<script setup>
const selectOptions = {
    tailwind: "Tailwind CSS",
    bootstrap: "Bootstrap",
};
</script>
```

Array example:

```vue
<script setup>
const selectOptions = [
    { value: "tailwind", label: "Tailwind CSS" },
    { value: "bootstrap", label: "Bootstrap" },
];
</script>
```

By using an Array, you could supply additional attributes, like `disabled`:

```vue
<script>
const selectOptions = [
    { value: "tailwind", label: "Tailwind CSS" },
    { value: "bootstrap", label: "Bootstrap", disabled: true },
];
</script>
```

There's support for grouping (`optgroup`) as well. Each group object should have a `label` key and an `options` key, which should be an Array:

```vue
<script setup>
const frameworks = [
    {
        label: "CSS Frameworks",
        options: [
            { value: "tailwind", label: "Tailwind CSS" },
            { value: "bootstrap", label: "Bootstrap" },
        ],
    },
    {
        label: "PHP Frameworks",
        options: [
            { value: "laravel", label: "Laravel" },
            { value: "symfony", label: "Symfony" },
        ],
    },
];
</script>
```

Instead of giving a set of options, you can also pass a custom slot into the `Select` component:

```vue
<Select name="favorite_framework">
  <option value="tailwind">Tailwind CSS</option>
  <option value="bootstrap">Bootstrap</option>
</Select>
```

## File element

There's a dedicated Vue component that you can use to select files. This component is based mainly on the `Input` component, but provides additional logic to display the filename of the selected file.

```vue
<File name="avatar" />
```

The component supports selecting multiple files as well by adding the `multiple` attribute.

```vue
<File name="documents" multiple />
```

## Inertia.js Form Helper

You can pass an instance of the [Inertia.js Form Helper](https://inertiajs.com/forms#form-helper) to the form using `v-model` on the `Form` component. This will bind the values, as well as the validation errors. You don't have to explicitly set the `:errors` attribute, as described [in the validation documentation](#validation).

```vue
<template>
  <Form v-model="form">
    <Input name="name" label="Your name" />
    <Submit />
  </Form>
</template>

<script setup>
import { useForm } from "@inertiajs/inertia-vue3";

const form = useForm({
  name: ""
})
</script>
```

## Integrations with third-party Libaries

### Autosize

Add the `autosize` attribute to the `Textarea` component:

```vue
<Textarea name="biography" autosize />
```

### Flatpickr

Flatpickr uses a *Stylus* stylesheet to style the library. Our stylesheet extends the vendor stylesheet (of Flatpickr) and adds some Tailwind-specific tweaks. Make sure your bundler handles Stylus stylesheets correctly, for example, by installing `stylus` and `stylus-loader`.

 You can import the stylesheet in your Vue component:

 ```js
 import "@protonemedia/form-components-pro-vue2-tailwind2-unstyled/src/flatpickr.styl"
 ```

To enable the Date Picker, add the `date` attribute to the `Input` component:

```vue
<Input name="published_at" date />
```

To enable to Time Picker, add the `time` attribute to the `Input` component:

```vue
<Input name="scheduled_at" time />
```

If you want a Date + Time Picker, add both attributes:

```vue
<Input name="scheduled_at" date time />
```

You can instantiate Flatpickr with a [custom set of options](https://flatpickr.js.org/options/) by passing an object to either the `date` or `time` attribute:

```vue
<Input name="published_at" :date="{ dateFormat: 'YYYY' }" />
```

### Choices.js

Choices.js uses a *SCSS* stylesheet to style the library. Our stylesheet extends the vendor stylesheet (of Choices.js) and adds some Tailwind-specific tweaks. Make sure your bundler handles SCSS stylesheets correctly, for example, by installing `sass` and `sass-loader`.

You can import the stylesheet in your Vue component:

```js
import "@protonemedia/form-components-pro-vue3-tailwind3-simple/src/choices.scss"
```

Add the `choices` attribute to the `Select` component:

```vue
<Select name="favorite_framework" :options="frameworks" choices />
```

This works for selecting multiple values as well:

```vue
<Select name="favorite_framework" :options="frameworks" mulitple choices />
```

You can instantiate Choices.js with a [custom set of options](https://github.com/Choices-js/Choices#setup) by passing an object to the `choices` attribute:

```vue
<Select name="favorite_framework" :options="frameworks" :choices="{ searchEnabled: false }" />
```

## Misc

### Submit button

The submit button has a default text of `Submit`, but you can pass in a slot as well:

```vue
<Submit>Do something!</Submit>
```

### Group component

With the `Group` component, you can group checkboxes and radio elements. You can use the `inline` attribute to arrange the children horizontally. Just like other the components, the `Group` component also supports the `error` and `label` attributes.

Most of the time, you don't want to show validation errors on each radio element, so the validation errors are hidden by default on the `Radio` component. Instead, you can use the `Group` component to show the error just once.

```vue
<Form v-model="settings" :errors="errors">
  <Group name="theme" inline>
    <Radio name="theme" value="dark" label="Dark theme" />
    <Radio name="theme" value="light" label="Light theme" />
  </Group>

  <Group>
    <Checkbox name="newsletter" label="Do you want to receive my newsletter?" />
    <Checkbox name="terms" label="Do you agree with the terms?" />
  </Group>
</Form>
```

If you want to show the error on the `Radio` component, you can use the `show-error` attribute:

```vue
<Form v-model="settings" :errors="errors">
  <Group>
    <Radio name="theme" value="dark" label="Dark theme" :show-error="true" />
    <Radio name="theme" value="light" label="Light theme" :show-error="true" />
  </Group>
</Form>
```

### Attribute inheritance

Additional attributes are passed down the form element itself. For example, the `placeholder` attribute is passed down to the inner input element, not to the `Input` component's outer `div`.

```vue
<Input v-model="user.name" placeholder="Your name" data-foo="bar" />
```

Rendered template:

```html
<div>
  <input v-model="..." placeholder="Your name" data-foo="bar" />
</div>
```

## Roadmap to first release

- [ ] Add `unstyled`, `underline` and `solid` styling examples from [@tailwindcss/forms examples](https://tailwindcss-forms.vercel.app)
- [ ] Better imports for the external libraries
- [x] Support for `optgroup` in the `Select` component
- [ ] Support for date ranges (Flatpickr)
- [x] Support for custom date formats (Flatpickr)
- [x] Support for time input (Flatpickr)
- [ ] Support for file input (with Filepond integration?)
- [ ] Support for markdown and WYSIWYG editors
- [x] Support custom Choices.js configuration
- [x] Support custom Flatpickr configuration
- [x] Documentation about customization
- [ ] Improve unit tests (too much copypasta)
- [x] Setup GitHub Actions

## Changelog

Please see [CHANGELOG](CHANGELOG.md) for more information about what has changed recently.

## Contributing

Please see [CONTRIBUTING](CONTRIBUTING.md) for details.

## Laravel packages

* [`Laravel Analytics Event Tracking`](https://github.com/protonemedia/laravel-analytics-event-tracking): Laravel package to easily send events to Google Analytics.
* [`Laravel Blade On Demand`](https://github.com/protonemedia/laravel-blade-on-demand): Laravel package to compile Blade templates in memory.
* [`Laravel Cross Eloquent Search`](https://github.com/protonemedia/laravel-cross-eloquent-search): Laravel package to search through multiple Eloquent models.
* [`Laravel Eloquent Scope as Select`](https://github.com/protonemedia/laravel-eloquent-scope-as-select): Stop duplicating your Eloquent query scopes and constraints in PHP. This package lets you re-use your query scopes and constraints by adding them as a subquery.
* [`Laravel Eloquent Where Not`](https://github.com/protonemedia/laravel-eloquent-where-not): This Laravel package allows you to flip/invert an Eloquent scope, or really any query constraint.
* [`Laravel FFMpeg`](https://github.com/protonemedia/laravel-ffmpeg): This package provides an integration with FFmpeg for Laravel. The storage of the files is handled by Laravel's Filesystem.
* [`Laravel Paddle`](https://github.com/protonemedia/laravel-paddle): Paddle.com API integration for Laravel with support for webhooks/events.
* [`Laravel Verify New Email`](https://github.com/protonemedia/laravel-verify-new-email): This package adds support for verifying new email addresses: when a user updates its email address, it won't replace the old one until the new one is verified.
* [`Laravel WebDAV`](https://github.com/protonemedia/laravel-webdav): WebDAV driver for Laravel's Filesystem.

## Security

If you discover any security related issues, please email pascal@protone.media instead of using the issue tracker.

## Credits

- [Pascal Baljet](https://github.com/protonemedia)
- [All Contributors](../../contributors)

## Security

If you discover any security-related issues, please email pascal@protone.media instead of using the issue tracker.

## License

The MIT License (MIT). Please see [License File](LICENSE.md) for more information.

## Treeware

This package is [Treeware](https://treeware.earth). If you use it in production, we ask that you [**buy the world a tree**](https://plant.treeware.earth/protonemedia/form-components-pro) to thank us for our work. By contributing to the Treeware forest, you'll create employment for local families and restoring wildlife habitats.

<template>
  <div id="app">
    <Form id="regular-form">
      <div>
        <Input v-model="resource.input" :error="errors.input" id="input-v-model" />
        <Textarea v-model="resource.textarea" :error="errors.textarea" id="textarea-v-model" />
        <Select
          v-model="resource.select"
          :error="errors.select"
          :options="selectOptions"
          id="select-v-model"
        />

        <Checkbox
          v-model="resource.checkbox"
          :error="errors.checkbox"
          label="checkbox"
          id="checkbox-v-model"
        />

        <Group inline :error="errors.radio">
          <Radio v-model="resource.radio" value="a" label="a" id="radio-a-v-model" />
          <Radio v-model="resource.radio" value="b" label="b" id="radio-b-v-model" />
        </Group>

        <File v-model="resource.file" :error="errors.file" id="file-v-model" />
        <File
          v-model="resource.multiFile"
          :error="errors.multiFile"
          id="multi-file-v-model"
          multiple
        />

        <Submit />
      </div>
    </Form>

    <Form id="bound-form" v-model="resource" :errors="errors">
      <div>
        <Input name="input" id="input-injected" />
        <Textarea name="textarea" id="textarea-injected" />
        <Select name="select" :options="selectOptions" id="select-injected" />
        <Checkbox name="checkbox" label="checkbox" id="checkbox-injected" />

        <Group inline name="radio">
          <Radio name="radio" value="a" label="a" id="radio-a-injected" />
          <Radio name="radio" value="b" label="b" id="radio-b-injected" />
        </Group>

        <File name="file" id="file-injected" />
        <File name="multiFile" id="multi-file-injected" multiple />
      </div>

      <Submit>Click here!</Submit>
    </Form>

    <Form id="misc-form" v-model="resource">
      <div>
        <Input name="date" id="date-input-injected" :date="true" />
        <Input name="time" id="time-input-injected" :time="true" />
        <Input name="datetime" id="time-input-injected" :date="true" :time="true" />
        <Input name="customDate" id="date-input-injected" :date="{ dateFormat: 'd-m-Y' }" />
        <Input name="customTime" id="time-input-injected" :time="{ dateFormat: 'i:H' }" />

        <Textarea name="textarea" id="autosize-textarea-injected" :autosize="true" />

        <Select
          name="select"
          :options="selectOptions"
          id="choices-select-injected"
          :choices="true"
        />

        <Select
          name="customSelect"
          :options="selectOptions"
          id="choices-select-injected"
          :choices="choicesOptions"
        />

        <Select ref="nestedSelect" :options="nestedSelectOptions" id="nested-select" />

        <Select
          name="multiSelect"
          :options="selectOptions"
          id="multi-select-injected"
          choices
          multiple
        />
      </div>
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
  Textarea,
  Select,
  Submit,
} from "../../src/index.js";

export default {
  name: "App",

  components: {
    Checkbox,
    Form,
    File,
    Group,
    Input,
    Radio,
    Textarea,
    Select,
    Submit,
  },

  data() {
    return {
      resource: {
        input: "Initial Input",
        textarea: "Initial Textarea",
        select: "a",
        checkbox: false,
        radio: "a",
        date: "2021-01-01",
        multiSelect: ["a"],
        file: null,
        multiFile: null,
      },

      selectOptions: [
        { value: "a", label: "a" },
        { value: "b", label: "b" },
        { value: "c", label: "c" },
      ],

      nestedSelectOptions: [
        {
          label: "a",
          options: [
            { value: "a1", label: "a1" },
            { value: "a2", label: "a2" },
          ],
        },
        {
          label: "b",
          options: [
            { value: "b1", label: "b1" },
            { value: "b2", label: "b2" },
            { value: "b3", label: "b3" },
          ],
        },
      ],

      nestedSelectOptions: [
        {
          label: "a",
          options: [
            { value: "a1", label: "a1" },
            { value: "a2", label: "a2" },
          ],
        },
        {
          label: "b",
          options: [
            { value: "b1", label: "b1" },
            { value: "b2", label: "b2" },
            { value: "b3", label: "b3" },
          ],
        },
      ],

      errors: {},

      choicesOptions: {
        loadingText: "Waiting...",
      },
    };
  },
};
</script>
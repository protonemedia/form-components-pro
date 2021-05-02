<template>
  <div class="mt-4">
    <label class="block">
      <Label :label="label" />

      <select
        :name="name"
        :multiple="multiple"
        v-bind="$attrs"
        v-on="listenersWithoutInput"
        v-model="model"
        ref="select"
        class="block w-full mt-0 px-0.5 border-0 border-b-2 border-gray-200 focus:ring-0 focus:border-black"
      >
        <slot>
          <SelectChild v-for="(option, key) in mappedOptions" :key="key" :option="option" />
        </slot>
      </select>
    </label>

    <Error v-if="errorMessage" :message="errorMessage" />
  </div>
</template>

<script>
import {
  Select,
  SelectChild,
} from "@protonemedia/form-components-pro-vue2-core";
import Label from "./Label.vue";
import Error from "./Error.vue";

export default {
  components: {
    Error,
    Label,
    SelectChild,
  },

  mixins: [Select],
};
</script>
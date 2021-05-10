<template>
  <div class="mt-4">
    <label class="block">
      <Label :label="label" />

      <select
        :name="name"
        :multiple="multiple"
        :disabled="disabled"
        v-bind="$attrs"
        v-on="listenersWithoutInput"
        v-model="model"
        ref="select"
        class="block w-full"
        :class="{'mt-1': label}"
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
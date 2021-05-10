<template>
  <div class>
    <label class>
      <Label :label="label" />

      <select
        :name="name"
        :disabled="disabled"
        :multiple="multiple"
        v-bind="$attrs"
        v-on="listenersWithoutInput"
        v-model="model"
        ref="select"
        class
      >
        <slot>
          <option v-for="(option, key) in options" :value="key" :key="key">{{ option }}</option>
        </slot>
      </select>
    </label>

    <Error v-if="errorMessage" :message="errorMessage" />
  </div>
</template>

<script>
import { Select } from "@protonemedia/form-components-pro-vue2-core";
import Label from "./Label.vue";
import Error from "./Error.vue";

export default {
  components: {
    Error,
    Label,
  },

  mixins: [Select],
};
</script>
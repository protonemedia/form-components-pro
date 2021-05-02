<template>
  <div :class="{ 'hidden': type == 'hidden', 'mt-4': label}">
    <label class="block">
      <Label :label="label" />

      <input
        :name="name"
        :type="type"
        v-bind="$attrs"
        v-on="listenersWithoutInput"
        v-model="model"
        ref="input"
        class="mt-0 block w-full px-0.5 border-0 border-b-2 border-gray-200 focus:ring-0 focus:border-black"
      />
    </label>

    <Error v-if="errorMessage" :message="errorMessage" />
  </div>
</template>

<script>
import { Input } from "@protonemedia/form-components-pro-vue2-core";
import Error from "./Error.vue";
import Label from "./Label.vue";

export default {
  components: {
    Error,
    Label,
  },

  mixins: [Input],
};
</script>
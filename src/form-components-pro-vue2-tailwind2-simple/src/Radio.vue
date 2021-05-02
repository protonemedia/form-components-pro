<template>
  <div>
    <label class="inline-flex items-center">
      <input
        :name="name"
        :value="value"
        :checked="checked"
        @change="emitChange"
        type="radio"
        v-bind="$attrs"
        v-on="listenersWithoutChange"
        class="rounded-full border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
      />

      <span class="ml-2">{{ label }}</span>
    </label>

    <Error v-if="errorMessage" :message="errorMessage" />
  </div>
</template>

<script>
import { Radio } from "@protonemedia/form-components-pro-vue2-core";
import Error from "./Error.vue";

export default {
  components: {
    Error,
  },

  mixins: [Radio],
};
</script>
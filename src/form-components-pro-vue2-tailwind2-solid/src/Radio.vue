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
        class="rounded-full bg-gray-200 border-transparent focus:border-transparent focus:bg-gray-200 text-gray-700 focus:ring-1 focus:ring-offset-2 focus:ring-gray-500"
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
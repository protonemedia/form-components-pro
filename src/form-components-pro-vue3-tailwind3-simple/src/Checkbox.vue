<template>
  <div class="flex flex-col">
    <label class="flex items-center">
      <input
        :name="name"
        :value="value"
        type="checkbox"
        v-bind="$attrs"
        v-on="listenersWithoutChange"
        v-model="model"
        class="
          rounded
          border-gray-300
          text-indigo-600
          shadow-sm
          focus:border-indigo-300
          focus:ring
          focus:ring-indigo-200
          focus:ring-opacity-50
          disabled:opacity-75
        "
      />

      <span class="ml-2"
        ><slot>{{ label }}</slot></span
      >
    </label>

    <Error v-if="errorMessage" :message="errorMessage" />
  </div>
</template>

<script>
import { Checkbox } from "@protonemedia/form-components-pro-vue3-core";
import Error from "./Error.vue";

export default {
  mixins: [Checkbox],
  components: { Error },
};
</script>
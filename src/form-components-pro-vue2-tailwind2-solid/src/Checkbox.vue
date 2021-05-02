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
        class="rounded bg-gray-200 border-transparent focus:border-transparent focus:bg-gray-200 text-gray-700 focus:ring-1 focus:ring-offset-2 focus:ring-gray-500"
      />

      <span class="ml-2">{{ label }}</span>
    </label>

    <Error v-if="errorMessage" :message="errorMessage" />
  </div>
</template>

<script>
import { Checkbox } from "@protonemedia/form-components-pro-vue2-core";
import Error from "./Error.vue";

export default {
  mixins: [Checkbox],
  components: { Error },
};
</script>
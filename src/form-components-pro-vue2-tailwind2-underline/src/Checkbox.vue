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
        class="border-gray-300 border-2 text-black focus:border-gray-300 focus:ring-black"
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
<template>
  <div class="mt-4">
    <label class="block">
      <Label :label="label" />

      <textarea
        :name="name"
        v-bind="$attrs"
        v-on="listenersWithoutInput"
        v-model="model"
        ref="textarea"
        class="
          block
          w-full
          rounded-md
          border-gray-300
          shadow-sm
          focus:border-indigo-300
          focus:ring
          focus:ring-indigo-200
          focus:ring-opacity-50
          disabled:opacity-75
        "
        :class="{ 'mt-1': label }"
      />
    </label>

    <Error v-if="errorMessage" :message="errorMessage" />
  </div>
</template>

<script>
import { Textarea } from "@protonemedia/form-components-pro-vue3-core";
import Error from "./Error.vue";
import Label from "./Label.vue";

export default {
  components: { Error, Label },
  mixins: [Textarea],
};
</script>
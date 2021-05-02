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
        class="block w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0"
        :class="{'mt-1': label}"
      />
    </label>

    <Error v-if="errorMessage" :message="errorMessage" />
  </div>
</template>

<script>
import { Textarea } from "@protonemedia/form-components-pro-vue2-core";
import Error from "./Error.vue";
import Label from "./Label.vue";

export default {
  components: { Error, Label },
  mixins: [Textarea],
};
</script>
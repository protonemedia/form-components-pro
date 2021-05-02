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
        class="mt-0 block w-full px-0.5 border-0 border-b-2 border-gray-200 focus:ring-0 focus:border-black"
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
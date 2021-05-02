<template>
  <div class>
    <label class>
      <Label :label="label" />

      <textarea
        :name="name"
        v-bind="$attrs"
        v-on="listenersWithoutInput"
        v-model="model"
        ref="textarea"
        class
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
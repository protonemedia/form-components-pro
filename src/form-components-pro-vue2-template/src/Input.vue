<template>
  <div class>
    <label class>
      <Label :label="label" />

      <input
        :name="name"
        :type="type"
        v-bind="$attrs"
        v-on="listenersWithoutInput"
        v-model="model"
        ref="input"
        class
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
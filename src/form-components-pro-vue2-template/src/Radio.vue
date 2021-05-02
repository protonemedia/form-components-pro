<template>
  <div class>
    <label class>
      <input
        :name="name"
        :value="value"
        :checked="checked"
        @change="emitChange"
        type="radio"
        v-bind="$attrs"
        v-on="listenersWithoutChange"
        class
      />

      <span class>{{ label }}</span>
    </label>

    <Error v-if="error" :message="error" />
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
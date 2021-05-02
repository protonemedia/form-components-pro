<template>
  <div class>
    <Label :label="label" />

    <div class>
      <slot />
    </div>

    <Error v-if="errorMessage" :message="errorMessage" />
  </div>
</template>

<script>
import { Group } from "@protonemedia/form-components-pro-vue2-core";
import Error from "./Error.vue";
import Label from "./Label.vue";

export default {
  mixins: [Group],
  components: { Error, Label },
};
</script>
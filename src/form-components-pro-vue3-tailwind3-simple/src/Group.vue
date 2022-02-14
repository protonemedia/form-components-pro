<template>
  <div class="mt-4">
    <Label :label="label" />

    <div
      :class="{
        'mt-2': label,
        'flex flex-wrap space-x-6': inline,
        'space-y-4': !inline,
      }"
    >
      <slot />
    </div>

    <Error v-if="errorMessage" :message="errorMessage" />
  </div>
</template>

<script>
import { Group } from "../../form-components-pro-vue3-core/src/index";
import Error from "./Error.vue";
import Label from "./Label.vue";

export default {
  mixins: [Group],
  components: { Error, Label },
};
</script>
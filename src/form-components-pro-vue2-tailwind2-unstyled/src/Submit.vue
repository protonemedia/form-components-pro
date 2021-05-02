<template>
  <div class="mt-6 flex items-center justify-between">
    <button
      v-bind="$attrs"
      v-on="$listeners"
      :type="type"
      class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 focus:outline-none focus:shadow-outline"
    >
      <slot>Submit</slot>
    </button>
  </div>
</template>

<script>
import { Submit } from "@protonemedia/form-components-pro-vue2-core";

export default Submit;
</script>
<template>
  <div class="mt-6 flex items-center justify-between">
    <button
      v-bind="$attrs"
      v-on="$listeners"
      :type="type"
      class="bg-gray-800 hover:bg-black text-white font-bold py-2 px-4 focus:outline-none focus:shadow-outline"
    >
      <slot>Submit</slot>
    </button>
  </div>
</template>

<script>
import { Submit } from "@protonemedia/form-components-pro-vue2-core";

export default Submit;
</script>
<template>
  <div class="mt-6 flex items-center justify-between">
    <button
      v-bind="$attrs"
      :type="type"
      class="
        rounded-md
        shadow-sm
        bg-indigo-500
        hover:bg-indigo-700
        text-white
        font-bold
        py-2
        px-4
        focus:outline-none
        focus:shadow-outline
      "
    >
      <slot>Submit</slot>
    </button>
  </div>
</template>

<script>
import { Submit } from "@protonemedia/form-components-pro-vue3-core";

export default Submit;
</script>
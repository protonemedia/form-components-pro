<template>
  <span v-if="label" class="text-gray-700">{{ label }}</span>
</template>

<script>
import { Label } from "@protonemedia/form-components-pro-vue3-core";

export default Label;
</script>
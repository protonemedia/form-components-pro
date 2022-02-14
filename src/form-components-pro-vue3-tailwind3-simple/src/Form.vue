<template>
  <form v-bind="$attrs" :method="method">
    <slot />
  </form>
</template>

<script>
import { Form } from "@protonemedia/form-components-pro-vue3-core";

export default Form;
</script>
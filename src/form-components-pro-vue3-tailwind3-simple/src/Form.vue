<template>
  <form v-bind="$attrs" :method="method">
    <slot />
  </form>
</template>

<script>
import { Form } from "../../form-components-pro-vue3-core/src/index";

export default Form;
</script>
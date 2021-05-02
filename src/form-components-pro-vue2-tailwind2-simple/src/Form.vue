<template>
  <form v-bind="$attrs" v-on="$listeners" :method="method">
    <slot />
  </form>
</template>

<script>
import { Form } from "@protonemedia/form-components-pro-vue2-core";

export default Form;
</script>
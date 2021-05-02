<template>
  <div class>
    <button v-bind="$attrs" v-on="$listeners" :type="type" class>
      <slot>Submit</slot>
    </button>
  </div>
</template>

<script>
import { Submit } from "@protonemedia/form-components-pro-vue2-core";

export default Submit;
</script>
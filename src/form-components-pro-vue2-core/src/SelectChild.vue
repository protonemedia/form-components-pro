<template>
  <optgroup v-if="option.options" :label="option.label">
    <SelectChild
      v-for="(childOption, childKey) in option.options"
      :option="childOption"
      :key="childKey"
    />
  </optgroup>
  <option v-else v-bind="bindWithoutLabel">{{ option.label }}</option>
</template>

<script>
export default {
  name: "SelectChild",

  components: {
    SelectChild: () => import("./SelectChild.vue"),
  },

  props: {
    option: {
      type: Object,
      required: true,
    },
  },

  computed: {
    bindWithoutLabel() {
      return Object.assign({}, this.option, { label: null });
    },
  },
};
</script>
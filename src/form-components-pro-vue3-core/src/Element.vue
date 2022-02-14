<script>
import HasError from "./HasError.vue";
import HasFormContext from "./HasFormContext.vue";
import InheritListeners from "./InheritListeners.vue";

export default {
  inheritAttrs: false,

  mixins: [InheritListeners, HasError, HasFormContext],

  emits: ["update:modelValue"],

  props: {
    label: {
      type: String,
      required: false,
    },

    name: {
      type: String,
      required: false,
    },
  },
};
</script>
<script>
import HasFormContext from "./HasFormContext.vue";

export default {
  inheritAttrs: false,

  mixins: [HasFormContext],

  props: {
    type: {
      type: String,
      required: false,
      default: "submit",
    },

    processing: {
      type: Boolean,
      required: false,
      default: false,
    },
  },

  computed: {
    isProcessing() {
      return this.processing || this.formIsProcessing;
    },
  },
};
</script>
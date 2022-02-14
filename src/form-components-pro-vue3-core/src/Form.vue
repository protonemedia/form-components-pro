<script>
export default {
  provide() {
    var formContext = {
      model: this.modelValue,
    };

    Object.defineProperty(formContext, "errors", {
      enumerable: true,
      get: () => this.errors,
    });

    return { formContext };
  },

  model: {
    prop: "model",
    event: "_no_event_",
  },

  props: {
    errors: {
      type: Object,
      required: false,
    },

    method: {
      type: String,
      required: false,
      default: "POST",
    },

    modelValue: {
      required: false,
    },
  },
};
</script>
<script>
import { set } from "lodash-es";
import { emit } from "vue";

export default {
  inject: {
    formContext: {
      default: null,
    },
  },

  computed: {
    hasFormContext() {
      if (!this.formContext) {
        return false;
      }

      if (!this.formContext.model) {
        return false;
      }

      if (!this.name) {
        return false;
      }

      return true;
    },

    formIsProcessing() {
      if (!this.formContext) {
        return false;
      }

      if (!this.formContext.model) {
        return false;
      }

      return this.formContext.model.processing ? true : false;
    },
  },

  methods: {
    emitValue(event, value) {
      if (this.hasFormContext) {
        set(this.formContext.model, this.name, value);
      } else {
        this.$emit("update:modelValue", value);
      }
    },

    emitInputValue(value) {
      this.emitValue("input", value);
    },

    emitChangeValue(value) {
      this.emitValue("change", value);
    },
  },
};
</script>
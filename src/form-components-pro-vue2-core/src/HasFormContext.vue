<script>
import set from "lodash-es/set";

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
  },

  methods: {
    emitValue(event, value) {
      this.hasFormContext
        ? set(this.formContext.model, this.name, value)
        : this.$emit(event, value);
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
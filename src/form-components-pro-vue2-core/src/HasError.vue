<script>
import get from "lodash-es/get";

export default {
  props: {
    error: {
      type: String,
      required: false,
    },

    showError: {
      type: Boolean,
      default: true,
      required: false,
    },
  },

  computed: {
    errorMessage() {
      if (!this.showError) {
        return null;
      }

      if (this.error) {
        return this.error;
      }

      if (!this.hasFormContext) {
        return null;
      }

      if (this.formContext.errors) {
        return get(this.formContext.errors, this.name);
      }

      const model = this.formContext.model;

      if (model.errors && model.hasErrors) {
        return get(model.errors, this.name);
      }

      return null;
    },
  },
};
</script>
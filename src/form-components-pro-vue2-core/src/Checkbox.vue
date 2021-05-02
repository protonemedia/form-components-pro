<script>
import get from "lodash-es/get";
import Element from "./Element.vue";

export default {
  mixins: [Element],

  model: {
    prop: "checked",
    event: "input",
  },

  props: {
    value: {
      default: 1,
      required: false,
    },
  },

  computed: {
    model: {
      get: function () {
        if (this.hasFormContext) {
          return get(this.formContext.model, this.name);
        }

        return this.$attrs.checked;
      },

      set: function (value) {
        this.emitInputValue(value);
      },
    },
  },
};
</script>
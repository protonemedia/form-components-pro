<script>
import get from "lodash-es/get";
import Element from "./Element.vue";

export default {
  mixins: [Element],

  model: {
    prop: "selected",
    event: "change",
  },

  props: {
    value: {
      required: true,
    },

    showError: {
      type: Boolean,
      default: false,
      required: false,
    },
  },

  computed: {
    checked() {
      if (this.hasFormContext) {
        return this.value == get(this.formContext.model, this.name);
      }

      return this.value == this.$attrs.selected;
    },
  },

  methods: {
    emitChange(e) {
      this.emitChangeValue(e.target.value);
    },
  },
};
</script>
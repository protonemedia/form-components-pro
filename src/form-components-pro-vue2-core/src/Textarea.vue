<script>
import get from "lodash-es/get";
import Element from "./Element.vue";

export default {
  mixins: [Element],

  props: {
    autosize: {
      type: Boolean,
      required: false,
      default: false,
    },

    value: {
      required: false,
    },
  },

  data() {
    return {
      autosizeInstance: null,
    };
  },

  computed: {
    model: {
      get: function () {
        if (this.hasFormContext) {
          return get(this.formContext.model, this.name);
        }

        return this.value;
      },

      set: function (value) {
        this.emitInputValue(value);
      },
    },
  },

  watch: {
    value() {
      if (!this.autosize) {
        return;
      }

      this.withAutosize((autosize) => {
        this.$nextTick(() => autosize.default.update(this.$refs["textarea"]));
      });
    },
  },

  methods: {
    withAutosize(callback) {
      import(/* webpackChunkName: "autosize" */ "autosize").then(callback);
    },
  },

  mounted() {
    if (!this.autosize) {
      return;
    }

    const vm = this;
    this.withAutosize((autosize) => {
      this.$nextTick(
        () => (vm.autosizeInstance = autosize.default(this.$refs["textarea"]))
      );
    });
  },

  beforeDestroy() {
    if (!this.autosize) {
      return;
    }

    this.withAutosize((autosize) => {
      this.$nextTick(() => autosize.default.destroy(this.$refs["textarea"]));
    });
  },
};
</script>
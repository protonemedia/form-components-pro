<script>
import get from "lodash-es/get";
import isObject from "lodash-es/isObject";
import Element from "./Element.vue";

export default {
  mixins: [Element],

  props: {
    date: {
      type: [Boolean, Object],
      required: false,
      default: false,
    },

    time: {
      type: [Boolean, Object],
      required: false,
      default: false,
    },

    type: {
      type: String,
      required: false,
      default: "text",
    },

    modelValue: {
      required: false,
    },
  },

  data() {
    return {
      flatpickrInstance: null,

      defaultFlatpickrOptions: {
        position: "left",
        static: true,
        dateFormat:
          this.date && this.time ? "Y-m-d H:i" : this.date ? "Y-m-d" : "H:i",
        noCalendar: !this.date,
        enableTime: this.time,
        time_24hr: true,
      },
    };
  },

  computed: {
    model: {
      get: function () {
        if (this.hasFormContext) {
          return get(this.formContext.model, this.name);
        }

        return this.modelValue;
      },

      set: function (value) {
        this.emitInputValue(value);
      },
    },
  },

  watch: {
    model(updatedValue) {
      if (this.flatpickrInstance) {
        this.flatpickrInstance.setDate(updatedValue);
      }
    },
  },

  methods: {
    withFlatpickr(callback) {
      import(/* webpackChunkName: "Flatpickr" */ "flatpickr").then(callback);
    },

    initFlatpickr(inputElement) {
      const vm = this;

      this.withFlatpickr((Flatpickr) => {
        const customOptions = isObject(vm.time)
          ? vm.time
          : isObject(vm.date)
          ? vm.date
          : {};

        const options = Object.assign(
          {},
          vm.defaultFlatpickrOptions,
          customOptions
        );

        const dateFormat = options.dateFormat;

        const immutableOptions = {
          dateFormat,
          onChange: (selectedDates, newValue, instance) => {
            if (newValue != vm.model) {
              vm.emitInputValue(newValue);
            }
          },
        };

        vm.flatpickrInstance = new Flatpickr.default(
          inputElement,
          Object.assign({}, options, immutableOptions)
        );
      });
    },
  },

  mounted() {
    if (this.date || this.time) {
      this.initFlatpickr(this.$refs["input"]);
    }
  },

  beforeDestroy() {
    if (this.flatpickrInstance) {
      this.flatpickrInstance.destroy();
    }
  },
};
</script>

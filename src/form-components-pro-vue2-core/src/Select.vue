<script>
import find from "lodash-es/find";
import get from "lodash-es/get";
import forEach from "lodash-es/forEach";
import isObject from "lodash-es/isObject";
import isString from "lodash-es/isString";
import Element from "./Element.vue";

export default {
  mixins: [Element],

  props: {
    choices: {
      type: [Boolean, Object],
      required: false,
      default: false,
    },

    multiple: {
      type: Boolean,
      required: false,
    },

    disabled: {
      type: Boolean,
      required: false,
    },

    options: {
      type: [Array, Object],
      default: [],
      required: false,
    },

    placeholder: {
      type: [Boolean, String],
      default: true,
      required: false,
    },

    value: {
      required: false,
    },
  },

  data() {
    return {
      choicesInstance: null,

      defaultChoicesOptions: {
        itemSelectText: "",
        removeItemButton: this.multiple || this.placeholder ? true : false,
        shouldSort: false,
        searchPlaceholderValue: "Search...",
      },
    };
  },

  computed: {
    optionsContainPlaceholder() {
      return find(this.arrayOptions, (option) => {
        return option.value === "";
      })
        ? true
        : false;
    },

    model: {
      get: function () {
        if (this.hasFormContext) {
          return get(this.formContext.model, this.name);
        }

        return this.value;
      },

      set: function (valueSelect) {
        var value = this.choicesInstance
          ? this.choicesInstance.getValue(true)
          : valueSelect;

        this.emitInputValue(value);
      },
    },

    arrayOptions() {
      if (Array.isArray(this.options)) {
        return this.options;
      }

      let mappedOptions = [];

      forEach(this.options, (label, value) => {
        mappedOptions.push({ value, label });
      });

      return mappedOptions;
    },

    mappedOptions() {
      let options = this.arrayOptions;

      if (
        this.optionsContainPlaceholder ||
        this.multiple ||
        !this.placeholder
      ) {
        return options;
      }

      const vm = this;

      return [
        {
          value: "",
          label: isString(vm.placeholder)
            ? vm.placeholder
            : vm.label
            ? vm.label
            : "Choose...",
          placeholder: "placeholder",
        },
        ...options,
      ];
    },
  },

  watch: {
    disabled(isDisabled) {
      if (this.choicesInstance) {
        isDisabled
          ? this.choicesInstance.disable()
          : this.choicesInstance.enable();
      }
    },

    model(updatedValue, oldValue) {
      if (this.choicesInstance) {
        if (JSON.stringify(updatedValue) == JSON.stringify(oldValue)) {
          return;
        }

        if (Array.isArray(updatedValue)) {
          this.choicesInstance.removeActiveItems();
        }

        this.choicesInstance.setChoiceByValue(updatedValue);
      }
    },
  },

  methods: {
    withChoices(callback) {
      import(/* webpackChunkName: "ChoicesJs" */ "choices.js").then(callback);
    },

    getItemOfCurrentModel() {
      const currentModel = this.model;

      return find(this.choicesInstance._store.choices, (item) => {
        return item.value == currentModel;
      });
    },

    getSelectedItem() {
      return find(this.choicesInstance._store.choices, (item) => {
        return item.selected;
      });
    },

    unselectSelectedItemWhenDifferentThanModel() {
      const currentModel = this.model;

      const currentModelOption = find(this.mappedOptions, (option) => {
        return option.value == currentModel;
      });

      if (currentModelOption) {
        return;
      }

      const itemToRemove = this.getSelectedItem();

      if (!itemToRemove) {
        return;
      }

      // Remove item associated with button
      this.choicesInstance._removeItem(itemToRemove);
      this.choicesInstance._triggerChange(itemToRemove.value);

      if (
        this.choicesInstance._isSelectOneElement &&
        this.choicesInstance._store.placeholderChoice
      ) {
        this.choicesInstance._selectPlaceholderChoice(
          this.choicesInstance._store.placeholderChoice
        );
      }
    },

    initChoices(selectElement) {
      const vm = this;

      this.withChoices((Choices) => {
        const options = isObject(vm.choices)
          ? Object.assign({}, vm.defaultChoicesOptions, vm.choices)
          : vm.defaultChoicesOptions;

        vm.choicesInstance = new Choices.default(selectElement, options);

        vm.choicesInstance.containerInner.element.setAttribute(
          "data-select-name",
          vm.name
        );

        selectElement.addEventListener("change", function () {
          if (vm.multiple) {
            const selectedItems = vm.choicesInstance.getValue().length;
            const totalItems = Array.from(
              selectElement.querySelectorAll("option")
            ).length;

            if (selectedItems >= totalItems) {
              vm.choicesInstance.hideDropdown();
            }
          }

          //

          const placeholder = vm.choicesInstance.containerInner.element.querySelector(
            "input[placeholder]"
          );

          if (!placeholder) {
            return;
          }

          vm.choicesInstance.getValue().length
            ? placeholder.classList.add("hidden")
            : placeholder.classList.remove("hidden");
        });

        selectElement.addEventListener("showDropdown", ($event) => {
          if (vm.multiple || !vm.model) {
            return;
          }

          const item = vm.getItemOfCurrentModel();
          const itemElement = vm.choicesInstance.dropdown.element.querySelector(
            `.choices__item[data-id="${item.id}"]`
          );

          vm.choicesInstance.choiceList.scrollToChildElement(itemElement, 1);
          vm.choicesInstance._highlightChoice(itemElement);
        });

        if (!vm.multiple && options.removeItemButton && vm.placeholder) {
          vm.unselectSelectedItemWhenDifferentThanModel();
        }
      });
    },
  },

  mounted() {
    if (this.choices || isObject(this.choices)) {
      this.initChoices(this.$refs["select"]);
    }
  },

  beforeDestroy() {
    if (this.choicesInstance) {
      this.choicesInstance.destroy();
    }
  },
};
</script>
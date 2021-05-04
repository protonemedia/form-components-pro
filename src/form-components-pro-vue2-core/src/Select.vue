<script>
import find from "lodash-es/find";
import get from "lodash-es/get";
import forEach from "lodash-es/forEach";
import isObject from "lodash-es/isObject";
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

    options: {
      type: [Array, Object],
      default: [],
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
        shouldSort: false,
        searchPlaceholderValue: "Search...",
      },
    };
  },

  computed: {
    optionsContainPlaceholder() {
      return find(this.mappedOptions, (option) => {
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

    mappedOptions() {
      if (Array.isArray(this.options)) {
        return this.options;
      }

      let mappedOptions = [];

      forEach(this.options, (label, value) => {
        mappedOptions.push({ value, label });
      });

      return mappedOptions;
    },
  },

  watch: {
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

    unselectSelectedItemWhenDifferentThanModel(options) {
      const currentModel = this.model;

      const currentModelOption = find(this.mappedOptions, (option) => {
        return option.value === currentModel;
      });

      if (currentModelOption) {
        return;
      }

      const itemToRemove = this.getSelectedItem();

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
        let defaultChoicesOptions = Object.assign(
          {},
          vm.defaultChoicesOptions,
          {
            removeItemButton: vm.optionsContainPlaceholder,
          }
        );

        const options = isObject(vm.choices)
          ? Object.assign({}, defaultChoicesOptions, vm.choices)
          : defaultChoicesOptions;

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

        this.unselectSelectedItemWhenDifferentThanModel(options);
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
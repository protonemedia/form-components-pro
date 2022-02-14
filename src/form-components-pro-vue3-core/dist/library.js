'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var get = require('lodash-es/get');
var set = require('lodash-es/set');
var vue = require('vue');
var isObject = require('lodash-es/isObject');
var map = require('lodash-es/map');
var first = require('lodash-es/first');
var find = require('lodash-es/find');
var forEach = require('lodash-es/forEach');
var isString = require('lodash-es/isString');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

function _interopNamespace(e) {
  if (e && e.__esModule) return e;
  var n = Object.create(null);
  if (e) {
    Object.keys(e).forEach(function (k) {
      if (k !== 'default') {
        var d = Object.getOwnPropertyDescriptor(e, k);
        Object.defineProperty(n, k, d.get ? d : {
          enumerable: true,
          get: function () { return e[k]; }
        });
      }
    });
  }
  n["default"] = e;
  return Object.freeze(n);
}

var get__default = /*#__PURE__*/_interopDefaultLegacy(get);
var set__default = /*#__PURE__*/_interopDefaultLegacy(set);
var isObject__default = /*#__PURE__*/_interopDefaultLegacy(isObject);
var map__default = /*#__PURE__*/_interopDefaultLegacy(map);
var first__default = /*#__PURE__*/_interopDefaultLegacy(first);
var find__default = /*#__PURE__*/_interopDefaultLegacy(find);
var forEach__default = /*#__PURE__*/_interopDefaultLegacy(forEach);
var isString__default = /*#__PURE__*/_interopDefaultLegacy(isString);

var script$f = {
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
        return get__default["default"](this.formContext.errors, this.name);
      }

      const model = this.formContext.model;

      if (model.errors && model.hasErrors) {
        return get__default["default"](model.errors, this.name);
      }

      return null;
    },
  },
};

script$f.__file = "src/HasError.vue";

var script$e = {
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
      if (this.hasFormContext) {
        set__default["default"](this.formContext.model, this.name, value);
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

script$e.__file = "src/HasFormContext.vue";

var script$d = {
  computed: {
    listenersWithoutInput() {
      return this.getListenersWithout(["input"]);
    },

    listenersWithoutChange() {
      return this.getListenersWithout(["input", "change"]);
    },
  },

  methods: {
    getListeners() {
      const onRE = /^on[^a-z]/;
      const listeners = {};
      const { $attrs } = this;

      for (const property in $attrs) {
        if (onRE.test(property)) {
          listeners[property] = $attrs[property];
        }
      }

      return listeners;
    },

    getListenersWithout(keys) {
      var listeners = Object.assign({}, this.getListeners());

      Array.from(keys).forEach((key) => {
        listeners[key] = () => {};
      });

      return listeners;
    },
  },
};

script$d.__file = "src/InheritListeners.vue";

var script$c = {
  inheritAttrs: false,

  mixins: [script$d, script$f, script$e],

  emits: ["update:modelValue"],

  props: {
    label: {
      type: String,
      required: false,
    },

    name: {
      type: String,
      required: false,
    },
  },
};

script$c.__file = "src/Element.vue";

var script$b = {
  mixins: [script$c],

  model: {
    prop: "checked",
    event: "input",
  },

  props: {
    modelValue: {
      required: false,
    },

    value: {
      default: 1,
      required: false,
    },
  },

  computed: {
    model: {
      get: function () {
        if (this.hasFormContext) {
          return get__default["default"](this.formContext.model, this.name);
        }

        return this.modelValue;
      },

      set: function (value) {
        this.emitInputValue(value);
      },
    },
  },
};

script$b.__file = "src/Checkbox.vue";

var script$a = {
  props: {
    message: {
      type: String,
      required: false,
    },
  },
};

script$a.__file = "src/Error.vue";

var script$9 = {
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

script$9.__file = "src/Form.vue";

var script$8 = {
  mixins: [script$c],

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
          return get__default["default"](this.formContext.model, this.name);
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
      Promise.resolve().then(function () { return /*#__PURE__*/_interopNamespace(require(/* webpackChunkName: "Flatpickr" */ 'flatpickr')); }).then(callback);
    },

    initFlatpickr(inputElement) {
      const vm = this;

      this.withFlatpickr((Flatpickr) => {
        const customOptions = isObject__default["default"](vm.time)
          ? vm.time
          : isObject__default["default"](vm.date)
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

script$8.__file = "src/Input.vue";

var script$7 = {
  props: {
    multiple: {
      type: Boolean,
      default: false,
      required: false,
    },
  },

  mixins: [script$8],

  methods: {
    handleFileInput(input) {
      const wrapped = this.multiple ? Object.values(input) : first__default["default"](input);

      this.emitInputValue(wrapped);
    },
  },

  computed: {
    filenames() {
      const files = this.multiple ? this.model : [this.model];

      return map__default["default"](files, (file) => {
        return file.name;
      });
    },

    listenersWithFileChange() {
      return Object.assign({}, this.listenersWithoutChange, {
        change: (event) => this.handleFileInput(event.target.files),
      });
    },
  },
};

script$7.__file = "src/File.vue";

var script$6 = {
  mixins: [script$c],

  props: {
    inline: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
};

script$6.__file = "src/Group.vue";

var script$5 = {
  props: {
    label: {
      type: String,
      required: false,
    },
  },
};

script$5.__file = "src/Label.vue";

var script$4 = {
  mixins: [script$c],

  model: {
    prop: "selected",
    event: "change",
  },

  props: {
    modelValue: {
      required: false,
    },

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
        return this.value == get__default["default"](this.formContext.model, this.name);
      }

      return this.value == this.modelValue;
    },
  },

  methods: {
    emitChange(e) {
      this.emitChangeValue(e.target.value);
    },
  },
};

script$4.__file = "src/Radio.vue";

var script$3 = {
  mixins: [script$c],

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

    modelValue: {
      required: false,
    },
  },

  data() {
    return {
      choicesInstance: null,

      defaultChoicesOptions: {
        allowHTML: false,
        itemSelectText: "",
        removeItemButton: this.multiple || this.placeholder ? true : false,
        shouldSort: false,
        searchPlaceholderValue: "Search...",
      },
    };
  },

  computed: {
    optionsContainPlaceholder() {
      return find__default["default"](this.arrayOptions, (option) => {
        return option.value === "";
      })
        ? true
        : false;
    },

    model: {
      get: function () {
        if (this.hasFormContext) {
          return get__default["default"](this.formContext.model, this.name);
        }

        return this.modelValue;
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

      forEach__default["default"](this.options, (label, value) => {
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
          label: isString__default["default"](vm.placeholder)
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

        if (updatedValue === null) {
          updatedValue = "";
        }

        this.choicesInstance.setChoiceByValue(updatedValue);
      }
    },
  },

  methods: {
    withChoices(callback) {
      Promise.resolve().then(function () { return /*#__PURE__*/_interopNamespace(require(/* webpackChunkName: "ChoicesJs" */ 'choices.js')); }).then(callback);
    },

    getItemOfCurrentModel() {
      const currentModel = this.model;

      return find__default["default"](this.choicesInstance._store.choices, (item) => {
        return item.value == currentModel;
      });
    },

    getSelectedItem() {
      return find__default["default"](this.choicesInstance._store.choices, (item) => {
        return item.selected;
      });
    },

    unselectSelectedItemWhenDifferentThanModel() {
      const currentModel = this.model;

      const currentModelOption = find__default["default"](this.mappedOptions, (option) => {
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
        const options = isObject__default["default"](vm.choices)
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

          const placeholder =
            vm.choicesInstance.containerInner.element.querySelector(
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
    if (this.choices || isObject__default["default"](this.choices)) {
      this.initChoices(this.$refs["select"]);
    }
  },

  beforeDestroy() {
    if (this.choicesInstance) {
      this.choicesInstance.destroy();
    }
  },
};

script$3.__file = "src/Select.vue";

var script$2 = {
  name: "SelectChild",

  components: {
    SelectChild: () => Promise.resolve().then(function () { return SelectChild; }),
  },

  props: {
    option: {
      type: Object,
      required: true,
    },
  },

  computed: {
    bindWithoutLabel() {
      return Object.assign({}, this.option, { label: null });
    },
  },
};

const _hoisted_1 = ["label"];

function render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_SelectChild = vue.resolveComponent("SelectChild", true);

  return ($props.option.options)
    ? (vue.openBlock(), vue.createElementBlock("optgroup", {
        key: 0,
        label: $props.option.label
      }, [
        (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList($props.option.options, (childOption, childKey) => {
          return (vue.openBlock(), vue.createBlock(_component_SelectChild, {
            option: childOption,
            key: childKey
          }, null, 8 /* PROPS */, ["option"]))
        }), 128 /* KEYED_FRAGMENT */))
      ], 8 /* PROPS */, _hoisted_1))
    : (vue.openBlock(), vue.createElementBlock("option", vue.normalizeProps(vue.mergeProps({ key: 1 }, $options.bindWithoutLabel)), vue.toDisplayString($props.option.label), 17 /* TEXT, FULL_PROPS */))
}

script$2.render = render;
script$2.__file = "src/SelectChild.vue";

var SelectChild = /*#__PURE__*/Object.freeze({
  __proto__: null,
  'default': script$2
});

var script$1 = {
  inheritAttrs: false,

  props: {
    type: {
      type: String,
      required: false,
      default: "submit",
    },
  },
};

script$1.__file = "src/Submit.vue";

var script = {
  mixins: [script$c],

  props: {
    autosize: {
      type: Boolean,
      required: false,
      default: false,
    },

    modelValue: {
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
          return get__default["default"](this.formContext.model, this.name);
        }

        return this.modelValue;
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
      Promise.resolve().then(function () { return /*#__PURE__*/_interopNamespace(require(/* webpackChunkName: "autosize" */ 'autosize')); }).then(callback);
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

script.__file = "src/Textarea.vue";

exports.Checkbox = script$b;
exports.Error = script$a;
exports.File = script$7;
exports.Form = script$9;
exports.Group = script$6;
exports.Input = script$8;
exports.Label = script$5;
exports.Radio = script$4;
exports.Select = script$3;
exports.SelectChild = script$2;
exports.Submit = script$1;
exports.Textarea = script;

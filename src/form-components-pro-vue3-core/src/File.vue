<script>
import Input from "./Input.vue";
import map from "lodash-es/map";
import first from "lodash-es/first";

export default {
  props: {
    multiple: {
      type: Boolean,
      default: false,
      required: false,
    },
  },

  mixins: [Input],

  methods: {
    handleFileInput(input) {
      const wrapped = this.multiple ? Object.values(input) : first(input);

      this.emitInputValue(wrapped);
    },
  },

  computed: {
    filenames() {
      const files = this.multiple ? this.model : [this.model];

      return map(files, (file) => {
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
</script>
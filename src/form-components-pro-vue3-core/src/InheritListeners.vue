<script>
export default {
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
</script>
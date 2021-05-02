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
    getListenersWithout(keys) {
      var listeners = Object.assign({}, this.$listeners);

      Array.from(keys).forEach((key) => {
        listeners[key] = () => {};
      });

      return listeners;
    },
  },
};
</script>
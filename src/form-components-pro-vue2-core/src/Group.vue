<script>
import Element from "./Element.vue";

export default {
  mixins: [Element],

  props: {
    inline: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
};
</script>
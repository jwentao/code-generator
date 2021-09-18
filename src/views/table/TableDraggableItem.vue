<script>
export default {
  mixins: [],
  props: {},
  data: () => ({}),
  watch: {},
  created() {
    console.log(this.$attrs);
  },
  methods: {},
  render(h) {
    return h(
      'el-table-column', {
        attrs: this.$attrs,
        on: this.$listeners
      }
    );
  }
};
</script>

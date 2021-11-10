<script>
/* eslint-disable no-unused-vars */
import draggable from 'vuedraggable';
import DraggableTable from '@/components/DraggableTable';
import BlockWrap from '@/components/BlockWrap';

const containers = {
  'empty'(h, config) {
    const { activeid } = this.$attrs;
    return (
      <div>
        <BlockWrap
          activeid={activeid}
          config={config}
        >
          <draggable
            group='containerComponent'
            list={config.children}
            handle='.drag-btn'
            class='drag-wrap'>
            <div>
              {
                config.children && config.children.map(itemConfig => render.call(this, h, itemConfig))
              }
            </div>
          </draggable>
        </BlockWrap>
      </div>
    );
  },
  'form'(h, config) {
    const { activeid } = this.$attrs;
    return (
      <div>
        <BlockWrap
          activeid={activeid}
          config={config}
        >
          <el-form></el-form>
        </BlockWrap>
      </div>
    );
  },
  'table'(h, config) {
    const { activeid } = this.$attrs;
    return (
      <BlockWrap
        activeid={activeid}
        config={config}
      >
        <DraggableTable
          config={config}
        />
      </BlockWrap>
    );
  }
};

const render = function(h, config) {
  if (config.type === 'container') return containers[config.key].call(this, h, config);
  return (<div/>);
};

export default {
  name: 'DraggableItem',
  components: {
  },
  mixins: [],
  props: {
    config: {
      type: Object,
      default: () => ({})
    }
  },
  data: () => ({}),
  watch: {},
  methods: {},
  render(h) {
    return render.call(this, h, this.config);
  }
};
</script>
<style lang='scss' scoped>
.draggable-item {
}
</style>

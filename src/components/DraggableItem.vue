<script>
/* eslint-disable no-unused-vars */
import draggable from 'vuedraggable';
import DraggableTable from '@/components/DraggableTable';
import BlockWrap from '@/components/BlockWrap';
import { DRAG_GROUP } from '@/constant';
import baseRender from '@/components/render/render';

const containers = {
  'empty'(h, config) {
    const { activeid } = this.$attrs;
    return (
      <div class='empty-container'>
        <BlockWrap
          activeid={activeid}
          config={config}
        >
          <draggable
            group={{ name: DRAG_GROUP.containerComponent, put: [DRAG_GROUP.containerComponent, DRAG_GROUP.baseComponent] }}
            list={config.children}
            handle='.drag-btn'
            class='container-wrap'>
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
  'el-form'(h, config) {
    const { activeid } = this.$attrs;
    return (
      <div>
        <BlockWrap
          activeid={activeid}
          config={config}
          class='container-wrap'>
          <el-form></el-form>
        </BlockWrap>
      </div>
    );
  },
  'el-table'(h, config) {
    const { activeid } = this.$attrs;
    return (
      <BlockWrap
        activeid={activeid}
        config={config}
        class='container-wrap'>
        <DraggableTable
          config={config}
        />
      </BlockWrap>
    );
  }
};

const bases = function(h, config) {
  const { activeid } = this.$attrs;
  return (
    <BlockWrap
      activeid={activeid}
      config={config}
    >
      <baseRender key={config.id} conf={config} onInput={ event => {
        this.$set(config.__config__, 'defaultValue', event);
      }} />
    </BlockWrap>
  );
};

const render = function(h, config) {
  if (config.__config__.type === 'container') return containers[config.__config__.tag].call(this, h, config);
  if (config.__config__.type === 'base') return bases.call(this, h, config);
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

<script>
/* eslint-disable no-unused-vars */
import draggable from 'vuedraggable';
import DraggableTable from '@/components/DraggableTable';

const containers = {
  'empty'(h, config) {
    const { activeItem } = this.$listeners;
    const { activeid } = this.$attrs;
    let className = 'common-container-wrap';
    if (activeid === config.id) className += ' active-container-wrap';
    return (
      <div class={className} onClick={ e => { activeItem(config); e.stopPropagation(); }}>
        <div class='drag-btn'>
          {
            config.id
          }
        </div>
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
      </div>
    );
  },
  'form': (h, config) => {
    return (
      <div class='common-container-wrap'>
        <el-form></el-form>
      </div>
    );
  },
  'table': (h, config) => {
    return (
      <div class='common-container-wrap'>
        <div class='drag-btn'>
          {
            config.id
          }
        </div>
        <DraggableTable
          columns={config.children}
        ></DraggableTable>
      </div>
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

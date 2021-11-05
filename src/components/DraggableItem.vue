<script>
/* eslint-disable no-unused-vars */
import draggable from 'vuedraggable';

const containers = {
  'empty'(h, config) {
    const { activeItem } = this.$listeners;
    const { activeId } = this.$attrs;
    console.log(this.$attrs);
    let className = 'common-container-wrap';
    console.log(activeId, config.id);
    if (activeId === config.id) className += ' active-container-wrap';
    return (
      <div class={className} onClick={ e => { activeItem(config); e.stopPropagation(); }}>
        <draggable
          group={{ name: 'containerComponent' }}
          list={config.children}
          class='drag-wrap'>
          {
            config.id
          }
          {
            config.children && config.children.map(itemConfig => render.call(this, h, itemConfig))
          }
        </draggable>
      </div>
    );
  },
  'form': (h) => {
    return (
      <div class='common-container-wrap'>
        <el-form></el-form>
      </div>
    );
  },
  'table': (h) => {
    return (
      <div class='common-container-wrap'>
        <el-table></el-table>
      </div>
    );
  }
};

const render = function(h, config) {
  if (config.type === 'container') return containers[config.key].call(this, h, config);
  return (<div></div>);
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

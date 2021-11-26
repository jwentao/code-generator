<script>
/* eslint-disable no-unused-vars */
import draggable from 'vuedraggable';
import DraggableTable from '@/components/DraggableTable';
import BlockWrap from '@/components/BlockWrap';
import { DRAG_GROUP } from '@/constant';
import baseRender from '@/components/render/render';
import { formExtraConfig } from '@/components/config';
import { clearFormExtraConfig, deepClone } from '@/utils';
import emitter from '@/mixins/emitter';

const containers = {
  'empty'(h, config) {
    return (
      <BlockWrap
        activeId={this.activeId}
        config={config}
        showBorder={this.showBorder}
      >
        <draggable
          group={{ name: DRAG_GROUP.CONTAINER_COMPONENT, put: [DRAG_GROUP.CONTAINER_COMPONENT, DRAG_GROUP.BASE_COMPONENT] }}
          list={config.children}
          handle='.drag-btn'
          style={Object.keys(this.config.style || {}).map(key => `${key}: ${this.config.style[key]}`).join(';')}
          onAdd={ this.handleEmptyAdd(config) }
          class='container-wrap'>
          {
            config.children?.map(itemConfig => render.call(this, h, itemConfig))
          }
        </draggable>
      </BlockWrap>
    );
  },
  'el-form'(h, config) {
    return (
      <BlockWrap
        activeId={this.activeId}
        config={config}
        showBorder={this.showBorder}
        class='container-wrap'>
        <el-form
          inline={config.inline}
          size={config.size}
          disabled={config.disabled}
          label-position={config.labelPosition}
          rules={{}}
          label-width={`${config.labelWidth}px`}>
          <draggable
            group={{ name: DRAG_GROUP.BASE_COMPONENT }}
            onAdd={ this.handleFormAdd(config) }
            list={config.children}
            handle='.drag-btn'
            class='container-wrap'
          >
            {
              config.children && config.children.map(itemConfig => (
                <el-form-item
                  label={itemConfig.__config__.showLabel ? itemConfig.__config__.label : ''}
                  label-width={itemConfig.__config__.showLabel ? (itemConfig.__config__.labelWidth && `${itemConfig.__config__.labelWidth}px`) : '0'}
                  required={itemConfig.__config__.required}
                >
                  { render.call(this, h, itemConfig) }
                </el-form-item>
              ))
            }
          </draggable>
          <el-form-item>
            <el-button type='primary'>提交</el-button>
            <el-button>重置</el-button>
          </el-form-item>
        </el-form>
      </BlockWrap>
    );
  },
  'el-table'(h, config) {
    return (
      <BlockWrap
        activeId={this.activeId}
        config={config}
        showBorder={this.showBorder}
        class='container-wrap'>
        <DraggableTable
          activeId={this.activeId}
          config={config}
        />
      </BlockWrap>
    );
  }
};

const bases = function(h, config) {
  return (
    <BlockWrap
      activeId={this.activeId}
      config={config}
      show-border={this.showBorder}
    >
      <baseRender key={config.__config__.renderKey} conf={config} onInput={ event => {
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
  mixins: [emitter],
  props: {
    config: {
      type: Object,
      default: () => ({})
    },
    showBorder: {
      type: Boolean,
      default: false
    },
    activeId: {
      type: Number,
      default: 0
    }
  },
  data: () => ({}),
  watch: {},
  methods: {
    handleFormAdd(config) {
      return (el) => {
        // config.children[el.newDraggableIndex].__config__ = Object.assign(config.children[el.newDraggableIndex].__config__, deepClone(formExtraConfig));
        this.$set(config.children[el.newDraggableIndex], '__config__', {
          ...config.children[el.newDraggableIndex].__config__,
          ...deepClone(formExtraConfig),
          label: config.children[el.newDraggableIndex].__config__.showName
        });
        this.dispatch('Home', 'active', config.children[el.newDraggableIndex]);
      };
    },
    handleEmptyAdd(config) {
      return (el) => {
        clearFormExtraConfig(config.children[el.newDraggableIndex]);
        config.children[el.newDraggableIndex].__config__.parent = { ...config, children: [] };
        this.dispatch('Home', 'active', config.children[el.newDraggableIndex]);
      };
    }
  },
  render(h) {
    return render.call(this, h, this.config);
  }
};
</script>
<style lang='scss' scoped>
.draggable-item {
}
</style>

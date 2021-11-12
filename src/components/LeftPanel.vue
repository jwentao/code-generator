<template>
  <div class="left-panel">
    <div class="component-block">
      容器
      <draggable
        :group="{name: DRAG_GROUP.containerComponent, pull: 'clone', put: false}"
        :sort="false"
        class="left-drag-wrap"
        :list="containerItems"
        :clone="cloneComponent"
      >
        <div
          v-for="(item, index) in containerItems"
          :key="index"
          class="component-item"
        >
          <div class="component-inner">
            {{ item.__config__.label }}
          </div>
        </div>
      </draggable>
    </div>
    <div class="component-block">
      基础组件
      <draggable
        :group="{name: DRAG_GROUP.baseComponent, pull: 'clone', put: false}"
        :sort="false"
        class="left-drag-wrap"
        :list="baseItems"
        :clone="cloneComponent"
      >
        <div
          v-for="(item, index) in baseItems"
          :key="index"
          class="component-item"
        >
          <div class="component-inner">
            {{ item.__config__.label }}
          </div>
        </div>
      </draggable>
    </div>
  </div>
</template>
<script>
import { containerItems, columnDefault, baseItems } from './config';
import draggable from 'vuedraggable';
import { deepClone, generateId } from '@/utils';
import { DRAG_GROUP } from '@/constant';

export default {
  name: 'LeftPanel',
  components: {
    draggable
  },
  mixins: [],
  props: {},
  data: () => ({
    DRAG_GROUP,

    containerItems,
    baseItems
  }),
  watch: {},
  methods: {
    cloneComponent(val) {
      const copyComponent = deepClone(val);
      const { type, tag } = val.__config__;
      if (type === 'container') {
        if (tag === 'el-table') {
          copyComponent.children.push(deepClone({
            ...columnDefault,
            __config__: {
              ...columnDefault.__config__,
              id: generateId()
            }
          }));
        }
      }
      if (type === 'base') {
        copyComponent.__vModel__ = 'model';
      }
      copyComponent.__config__.id = generateId();
      return copyComponent;
    }
  }
};
</script>
<style lang='scss' scoped>
.left-panel {
  padding: 5px;
  font-size: 14px;
  color: $textL1;

  .left-drag-wrap {
    display: flex;
    flex-wrap: wrap;
  }
  .component-item {
    cursor: move;
    flex: 0 0 50%;
    width: 50%;
    text-align: center;
    padding: 2px;

    .component-inner {
      background-color: $borderL4;
      height: 30px;
      line-height: 30px;

      &:hover {
        background-color: $brandColor4;
      }
    }
  }
}
</style>

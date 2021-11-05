<template>
  <div class="left-panel">
    <div class="component-block">
      容器
      <draggable
        :group="{name: 'containerComponent', pull: 'clone', put: false}"
        :sort="false"
        class="drag-wrap"
        :list="containerItems"
        :clone="cloneComponent"
      >
        <div
          v-for="(item, index) in containerItems"
          :key="index"
          class="component-item"
        >
          <div class="component-inner">
            {{ item.label }}
          </div>
        </div>
      </draggable>
    </div>
  </div>
</template>
<script>
import { containerItems } from './config';
import draggable from 'vuedraggable';
import { deepClone, generateId } from '@/utils';

export default {
  name: 'LeftPanel',
  components: {
    draggable
  },
  mixins: [],
  props: {},
  data: () => ({
    containerItems
  }),
  watch: {},
  methods: {
    cloneComponent(val) {
      return {
        ...deepClone(val),
        id: generateId()
      };
    }
  }
};
</script>
<style lang='scss' scoped>
.left-panel {
  padding: 5px;
  font-size: 14px;
  color: $textL1;

  .drag-wrap {
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

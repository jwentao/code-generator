<template>
  <div class="left-panel">
    <div class="component-block">
      <draggable
        v-model="layoutItems"
        :group="{name: 'layoutComponent', pull: 'clone', put: false}"
        :sort="false"
        :clone="cloneComponent"
      >
        <div
          v-for="(item, index) in layoutItems"
          :key="index"
          class="component-item"
        >
          {{ item.label }}
        </div>
      </draggable>
    </div>
  </div>
</template>
<script>
import { layoutItems } from './config';
import draggable from 'vuedraggable';
import { deepClone } from "@/utils";

export default {
  name: 'LeftPanel',
  components: {
    draggable
  },
  mixins: [],
  props: {},
  data: () => ({
    layoutItems
  }),
  watch: {},
  created () {
    console.log(layoutItems);
  },
  methods: {
    cloneComponent(val) {
      console.log(val);
      return deepClone(val);
    },
    onStart(){
      this.drag=true;
    },
    //拖拽结束事件
    onEnd() {
      this.drag=false;
      console.log(this.myArr, this.arr2);
    }
  }
};
</script>
<style lang='scss' scoped>
.left-panel {
  .component-item {
    cursor: move;
  }
}
</style>

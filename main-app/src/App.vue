<script setup lang="ts">
import { actions, initialState } from './store';
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
    const handleMouseDown = () => {
      console.log('handleMouseDown');
      window.abc = 12223;
      const states = { ...initialState };
      states.isLeftDrag = true;
      actions.setGlobalState(states);
      console.log(initialState);
    }

    window.document.addEventListener('mouseup', () => {
      const states = { ...initialState };
      states.isLeftDrag = false;
      actions.setGlobalState(states);
      console.log('main mouse up')
    });
</script>

<template>
  <div class="main-wrap">
    <div class="origin-box" @mousedown="handleMouseDown">
      origin
    </div>
  </div>
  <div class="mirco-wrap">
    <div id="render-view"></div>
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
.main-wrap {
  height: 333px;
  background-color: aliceblue;
}

.origin-box {
  height: 33px;
  width: 33px;
  background-color: red;
}
</style>

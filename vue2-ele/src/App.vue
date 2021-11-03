<template>
  <div id="app">
    mirco
    <div class="box-wrap" @mousemove="handleMousemove" @mouseup="handleMouseup">
      <div
        v-for="(item, index) in arrs"
        :key="item.name"
        class="box-item"
      >{{ index }}</div>
    </div>
  </div>
</template>

<script lang=ts>
export default {
  data: () => ({
    arrs: [{
      name: 123
    }]
  }),
  methods: {
    handleMousemove () :void {
      // console.log(this.$store.state.isLeftDrag)
    },
    handleMouseup () :void {
      console.log('mirco mouse up')
      if (this.$store.state.isLeftDrag) {
        this.arrs.push({
          name: Math.random()
        })
      }
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background-color: aquamarine;
  height: 333px;
}

.box-wrap {
  min-height: 111px;
  display: flex;
}

.box-item {
  height: 33px;
  width: 33px;
  padding: 3px;
  background-color: #2c3e50;
}
</style>

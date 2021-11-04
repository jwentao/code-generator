<template>
  <div class="home">
    <div class="top-container"></div>
    <div class="main-container">
      <div class="container-left">
        <LeftPanel></LeftPanel>
      </div>
      <div class="container-center"></div>
      <div class="container-right"></div>
    </div>
  </div>
</template>

<script>
import LeftPanel from '@/components/LeftPanel';

export default {
  name: 'Home',
  components: {
    LeftPanel
  }
};
</script>

<style lang="scss">
$topHeight: 50px;
$leftWidth: 220px;

.home {
  height: 100%;

  .top-container {
    height: $topHeight;
    border-bottom: 1px solid $borderL1;
  }

  .main-container {
    height: calc(100vh - #{$topHeight});
    display: flex;
  }

  .container-left {
    width: $leftWidth;
    flex: 0 0 $leftWidth;
    border-right: 1px solid $borderL1;
  }
}
</style>

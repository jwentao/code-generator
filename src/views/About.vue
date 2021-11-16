<template>
  <div class="about">
    <div class="item">
      <draggable
        :group="{ name: 'group', pull: 'clone', put: false }"
        :list="list"
        :clone="cloneComponent"
      >
        <div v-for="item in list" :key="item.id">
          {{ item.name }}
        </div>
      </draggable>
    </div>
    <div class="new-item">
      <draggable
        style="min-height: 20px;"
        group="group"
        :list="newList"
      >
        <div v-for="item in newList" :key="item.id">
          {{ item.name }}
          <draggable v-if="item.children" group="group" :list="item.children" style="min-height: 20px;">
            <div v-for="child in item.children" :key="child.id">
              <div style="padding-left: 24px;"> {{ child.name }}</div>
            </div>
          </draggable>
        </div>
      </draggable>
    </div>

    <div>
      <pre>{{ newList }}</pre>
    </div>
  </div>
</template>

<script>
import draggable from 'vuedraggable';

export default {
  components: {
    draggable
  },
  data: () => ({
    list: [
      {
        'name': 'John',
        'id': 1,
        children: []
      },
      {
        'name': 'Joao',
        'id': 2
      },
      {
        'name': 'Jean',
        'id': 3
      },
      {
        'name': 'Gerard',
        'id': 4
      }
    ],
    newList: []
  }),
  methods: {
    cloneComponent(val) {
      console.log(val);
      return {
        name: val.name,
        id: Math.random(),
        children: []
      };
    }
  }
};
</script>

<style>
.about {
  display: flex;
}

.item {
  width: 200px;
  background-color: cornflowerblue;
}

.new-item {
  width: 200px;
  background-color: red;
}
</style>

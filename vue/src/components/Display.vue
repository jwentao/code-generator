<template>
  <div ref="display" />
</template>
<script>
import Vue from 'vue';
import { getRandomStr } from '@/utils';

export default {
  name: 'Display',
  mixins: [],
  props: {
    code: {
      type: String,
      default: ''
    }
  },
  data: () => ({
    component: null,
    id: getRandomStr()
  }),
  watch: {
    code: {
      immediate: true,
      handler(val) {
        if (val) {
          this.$nextTick(() => {
            this.destroyCode();
            this.renderCode();
          });
        }
      }
    }
  },
  methods: {
    renderCode() {
      this.splitCode();

      if (this.html !== '' && this.js !== '') {
        const parseStrToFunc = new Function(this.js)();

        parseStrToFunc.template = this.html;
        const Component = Vue.extend(parseStrToFunc);
        this.component = new Component().$mount();

        this.$refs.display.appendChild(this.component.$el);
        if (this.css !== '') {
          const style = document.createElement('style');
          style.type = 'text/css';
          style.id = this.id;
          style.innerHTML = this.css;
          document.getElementsByTagName('head')[0].appendChild(style);
        }
      }
    },

    getSource(source, type) {
      const regex = new RegExp(`<${type}[^>]*>`);
      let openingTag = source.match(regex);

      if (!openingTag) return '';
      else openingTag = openingTag[0];

      return source.slice(source.indexOf(openingTag) + openingTag.length, source.lastIndexOf(`</${type}>`));
    },
    splitCode() {
      const script = this.getSource(this.code, 'script').replace(/export default/, 'return ');
      const style = this.getSource(this.code, 'style');
      const template = '<div id="display">' + this.getSource(this.code, 'template') + '</div>';

      this.js = script;
      this.css = style;
      this.html = template;
    },
    destroyCode() {
      const $target = document.getElementById(this.id);
      if ($target) $target.parentNode.removeChild($target);

      if (this.component) {
        this.$refs.display.removeChild(this.component.$el);
        this.component.$destroy();
        this.component = null;
      }
    }
  }
};
</script>
<style lang='scss' scoped>
.Display {
}
</style>

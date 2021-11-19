<template>
  <div>
    <el-form ref="elForm" :model="formData" :rules="rules123" size="medium" label-width="100px">
      <el-form-item label="单行文本" prop="model1">
        <el-input v-model="model1" placeholder="请输入" clearable :style="{width: '100%'}" />
      </el-form-item>
      <el-form-item size="large">
        <el-button type="primary" @click="submitForm">提交</el-button>
        <el-button @click="resetForm">重置</el-button>
      </el-form-item>
    </el-form>
    <div>
      <el-radio-group v-model="autio1" size="medium">
        <el-radio
          v-for="(item, index) in autio1Options"
          :key="index"
          :label="item.value"
          :disabled="item.disabled"
        >{{ item.label }}</el-radio>
      </el-radio-group>
    </div>
    <el-radio-group v-model="audio2" size="medium">
      <el-radio-button
        v-for="(item, index) in audio2Options"
        :key="index"
        :label="item.value"
        :disabled="item.disabled"
      >{{ item.label }}</el-radio-button>
    </el-radio-group>
  </div>
</template>
<script>
export default {
  components: {},
  props: [],
  data() {
    return {
      formData: {
        model1: '12312'
      },
      rules123: {
        model1: [{
          required: true,
          message: '请输入',
          trigger: 'blur'
        }, {
          pattern: /^1/,
          message: '错误提示123',
          trigger: 'blur'
        }]
      },
      autio1: undefined,
      audio2: 2,
      autio1Options: [{
        'label': '选项一',
        'value': 1
      }, {
        'label': '选项二',
        'value': 2
      }],
      audio2Options: [{
        'label': '选项一',
        'value': 1
      }, {
        'label': '选项二',
        'value': 2
      }]
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    submitFormelForm() {
      this.$refs['elForm'].validate(valid => {
        if (!valid) return;
        // TODO 提交表单
      });
    },
    resetFormelForm() {
      this.$refs['elForm'].resetFields();
    }
  }
};

</script>
<style>
</style>

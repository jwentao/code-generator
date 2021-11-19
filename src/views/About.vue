<template>
  <div>
    <el-form ref="elForm1" :model="formData1" :rules="rules1" size="medium" label-width="100px">
      <el-form-item label="单行文本" prop="model1">
        <el-input v-model="formData1.model1" placeholder="请输入" clearable :style="{width: '100%'}" />
      </el-form-item>
      <el-form-item size="large">
        <el-button type="primary" @click="submitFormElForm1">提交</el-button>
        <el-button @click="resetFormElForm1">重置</el-button>
      </el-form-item>
    </el-form>
    <el-form ref="elForm2" :model="formData" :rules="rules" size="medium" label-width="100px">
      <el-form-item label="下拉选择" prop="model1">
        <el-select v-model="formData.model1" placeholder="请选择" clearable :style="{width: '100%'}">
          <el-option
            v-for="(item, index) in model1Options"
            :key="index"
            :label="item.label"
            :value="item.value"
            :disabled="item.disabled"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="单行文本" prop="model2">
        <el-input v-model="formData.model2" placeholder="请输入" clearable :style="{width: '100%'}" />
      </el-form-item>
      <el-form-item size="large">
        <el-button type="primary" @click="submitFormElForm2">提交</el-button>
        <el-button @click="resetFormElForm2">重置</el-button>
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
      formData1: {
        model1: '12312'
      },
      rules1: {
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
      formData: {
        model1: undefined,
        model2: undefined
      },
      rules: {
        model1: [{
          required: true,
          message: '请选择',
          trigger: 'change'
        }],
        model2: [{
          required: true,
          message: '请输入',
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
    submitFormElForm1() {
      this.$refs['elForm1'].validate(valid => {
        if (!valid) return;
        // TODO 提交表单
      });
    },
    resetFormElForm1() {
      this.$refs['elForm1'].resetFields();
    },
    submitFormElForm2() {
      this.$refs['elForm2'].validate(valid => {
        if (!valid) return;
        // TODO 提交表单
      });
    },
    resetFormElForm2() {
      this.$refs['elForm2'].resetFields();
    }
  }
};

</script>
<style>
</style>

<template>
  <div>
    <el-form ref="elForm" :model="formData" :rules="rules" size="medium" label-width="100px">
      <el-form-item label="单行文本" prop="mobile">
        <el-input
          v-model="formData.mobile"
          placeholder="请输入手机号"
          :maxlength="11"
          show-word-limit
          clearable
          prefix-icon="el-icon-mobile"
          :style="{width: '100%'}"
        />
      </el-form-item>
      <el-form-item label="级联选择" prop="field101">
        <el-cascader
          v-model="formData.field101"
          :options="field101Options"
          :props="field101Props"
          :style="{width: '100%'}"
          placeholder="请选择级联选择"
          clearable
        />
      </el-form-item>
      <el-form-item label="滑块" prop="field102" required>
        <el-slider v-model="formData.field102" :max="100" :step="1" />
      </el-form-item>
      <el-form-item label="多选框组" prop="field103">
        <el-checkbox-group v-model="formData.field103" size="medium">
          <el-checkbox
            v-for="(item, index) in field103Options"
            :key="index"
            :label="item.value"
            :disabled="item.disabled"
          >{{ item.label }}</el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item size="large">
        <el-button type="primary" @click="submitForm">提交</el-button>
        <el-button @click="resetForm">重置</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="tableData" :border="true">
      <el-table-column prop="field101" label="级联选择" align="left" min-width="100" />
      <el-table-column prop="field102" label="滑块" align="left" min-width="100" />
      <el-table-column prop="field103" label="多选框组" align="left" min-width="100" />
    </el-table>
  </div>
</template>
<script>
export default {
  components: {},
  props: [],
  data() {
    return {
      formData: {
        mobile: undefined,
        field101: [],
        field102: 14,
        field103: []
      },
      rules: {
        mobile: [{
          required: true,
          message: '请输入手机号',
          trigger: 'blur'
        }, {
          pattern: /^1(3|4|5|7|8|9)\d{9}$/,
          message: '手机号格式错误',
          trigger: 'blur'
        }],
        field101: [{
          required: true,
          type: 'array',
          message: '请至少选择一个级联选择',
          trigger: 'change'
        }],
        field103: [{
          required: true,
          type: 'array',
          message: '请至少选择一个多选框组',
          trigger: 'change'
        }]
      },
      field101Options: [],
      field103Options: [{
        'label': '选项一',
        'value': 1
      }, {
        'label': '选项二',
        'value': 2
      }],
      tableData: [],
      field101Props: {
        'multiple': false,
        'label': 'label',
        'value': 'value',
        'children': 'children'
      }
    };
  },
  computed: {},
  watch: {},
  created() {
    this.getField101Options();
  },
  mounted() {},
  methods: {
    submitForm() {
      this.$refs['elForm'].validate(valid => {
        if (!valid) return;
        // TODO 提交表单
      });
    },
    resetForm() {
      this.$refs['elForm'].resetFields();
    },
    getField101Options() {
      // 注意：this.$axios是通过Vue.prototype.$axios = axios挂载产生的
      this.$axios({
        method: 'get',
        url: 'https://www.fastmock.site/mock/f8d7a54fb1e60561e2f720d5a810009d/fg/cascaderList'
      }).then(resp => {
        var {
          data
        } = resp;
        this.field101Options = data.list;
      });
    }
  }
};

</script>
<style>
</style>

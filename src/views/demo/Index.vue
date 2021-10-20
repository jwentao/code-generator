<template>
  <div>
    <el-form ref="elForm" :inline="true" :model="formData" :rules="rules" size="medium" label-width="100px">
      <el-form-item label="滑块" prop="field103" required>
        <el-slider v-model="formData.field103" :max="100" :step="1" />
      </el-form-item>
      <el-form-item label="下拉选择" prop="field106">
        <el-select
          v-model="formData.field106"
          placeholder="请选择下拉选择"
          multiple
          filterable
          clearable
          :style="{width: '100%'}"
        >
          <el-option
            v-for="(item, index) in field106Options"
            :key="index"
            :label="item.label"
            :value="item.value"
            :disabled="item.disabled"
          />
        </el-select>
      </el-form-item>
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
      <el-form-item label="多选框组" prop="field102">
        <el-checkbox-group v-model="formData.field102" size="medium">
          <el-checkbox
            v-for="(item, index) in field102Options"
            :key="index"
            :label="item.value"
            :disabled="item.disabled"
          >{{ item.label }}</el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="级联选择" prop="field104">
        <el-cascader
          v-model="formData.field104"
          :options="field104Options"
          :props="field104Props"
          :style="{width: '100%'}"
          placeholder="请选择级联选择"
          clearable
        />
      </el-form-item>
      <el-form-item label="单选框组" prop="field107">
        <el-radio-group v-model="formData.field107" size="medium">
          <el-radio
            v-for="(item, index) in field107Options"
            :key="index"
            :label="item.value"
            :disabled="item.disabled"
          >{{ item.label }}</el-radio>
        </el-radio-group>
      </el-form-item>
    </el-form>
    <el-table :data="tableData" :border="true">
      <el-table-column prop="field101" label="多选框组" align="left" min-width="100" />
      <el-table-column prop="field102" label="多选框组" align="left" min-width="100" />
      <el-table-column prop="field103" label="滑块" align="left" min-width="100" />
      <el-table-column prop="field104" label="级联选择" align="left" min-width="100" />
      <el-table-column prop="field105" label="级联选择" align="left" min-width="100" />
      <el-table-column prop="field106" label="下拉选择" align="left" min-width="100" />
      <el-table-column prop="field107" label="单选框组" align="left" min-width="100" />
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
        field103: 100,
        field106: [],
        mobile: '',
        field102: [2, 1],
        field104: [],
        field107: undefined
      },
      rules: {
        field106: [{
          required: true,
          type: 'array',
          message: '请至少选择一个下拉选择',
          trigger: 'change'
        }],
        mobile: [{
          required: true,
          message: '请输入手机号',
          trigger: 'blur'
        }, {
          pattern: /^1(3|4|5|7|8|9)\d{9}$/,
          message: '手机号格式错误',
          trigger: 'blur'
        }],
        field102: [{
          required: true,
          type: 'array',
          message: '请至少选择一个多选框组',
          trigger: 'change'
        }],
        field104: [{
          required: true,
          type: 'array',
          message: '请至少选择一个级联选择',
          trigger: 'change'
        }],
        field107: [{
          required: true,
          message: '单选框组不能为空',
          trigger: 'change'
        }]
      },
      field106Options: [{
        'label': '选项一',
        'value': 1
      }, {
        'label': '选项二',
        'value': 2
      }],
      field102Options: [{
        'label': '选项一',
        'value': 1
      }, {
        'label': '选项二',
        'value': 2
      }],
      field104Options: [],
      field107Options: [{
        'label': '选项一',
        'value': 1
      }, {
        'label': '选项二',
        'value': 2
      }],
      tableData: [],
      field104Props: {
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
    this.getField104Options();
  },
  mounted() {},
  methods: {
    getField104Options() {
      // 注意：this.$axios是通过Vue.prototype.$axios = axios挂载产生的
      this.$axios({
        method: 'get',
        url: 'https://www.fastmock.site/mock/f8d7a54fb1e60561e2f720d5a810009d/fg/cascaderList'
      }).then(resp => {
        var {
          data
        } = resp;
        this.field104Options = data.list;
      });
    }
  }
};

</script>
<style>
</style>

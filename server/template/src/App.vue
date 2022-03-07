<template>
  <div>
    <div :style="{width: '100%',display: 'block',padding: '6px 6px 6px 6px',margin: '0 0 0 0'}">
      <el-form :style="{width: '100%'}" ref="elForm" :model="formData" :rules="rules" size="medium"
               :inline=false label-width="100px">
        <el-form-item label="单行文本" prop="customer1">
          <el-input v-model="formData.customer1" placeholder="请输入" clearable :style="{width: '100%'}">
          </el-input>
        </el-form-item>
        <el-form-item size="large">
          <el-button type="primary" @click="submitFormElForm">提交</el-button>
          <el-button @click="resetFormElForm">重置</el-button>
        </el-form-item>
      </el-form>
      <el-table :data="undefined" :style="{width: '100%'}"></el-table>
    </div>
  </div>
</template>
<script>
export default {
  components: {},
  props: [],
  data () {
    return {
      formDataCustomer1Options: undefined,
      formData: {
        customer1: 222
      },
      rules: {
        customer1: [{
          required: true,
          message: '请输入',
          trigger: 'blur'
        }]
      }
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {
    submitFormElForm () {
      this.$refs.elForm.validate(valid => {
        if (!valid) return
        this.$axios({
          method: 'post',
          url: 'http://localhost:3000/test',
          data: this.formData
        }).then(resp => {
          const {
            data
          } = resp
          this.undefined = data
        })
      })
    },
    resetFormElForm () {
      this.$refs.elForm.resetFields()
    }
  }
}

</script>
<style>
</style>

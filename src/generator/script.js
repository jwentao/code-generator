import { exportDefault, titleCase, deepClone } from '@/utils/index';
import ruleTrigger from './ruleTrigger';

const isArray = Array.isArray;

const units = {
  KB: '1024',
  MB: '1024 / 1024',
  GB: '1024 / 1024 / 1024'
};

const inheritAttrs = {
  file: '',
  dialog: 'inheritAttrs: false,'
};

function buildAttributes(scheme, dataList, optionsList, methodList, propsList, uploadVarList, created) {
  const config = scheme.__config__;
  const slot = scheme.__slot__;
  buildData(scheme, dataList);

  // 特殊处理options属性
  if (scheme.options || (slot && slot.options && slot.options.length)) {
    buildOptions(scheme, optionsList);
    if (config.dataType === 'dynamic') {
      const model = `${scheme.__vModel__}Options`;
      const options = titleCase(model);
      const methodName = `get${options}`;
      buildOptionMethod(methodName, model, methodList, scheme);
      callInCreated(methodName, created);
    }
  }

  // 处理props
  if (scheme.props && scheme.props.props) {
    buildProps(scheme, propsList);
  }

  // 处理el-upload的action
  if (scheme.action && config.tag === 'el-upload') {
    uploadVarList.push(
      `${scheme.__vModel__}Action: '${scheme.action}',
      ${scheme.__vModel__}fileList: [],`
    );
    methodList.push(buildBeforeUpload(scheme));
    // 非自动上传时，生成手动上传的函数
    if (!scheme['auto-upload']) {
      methodList.push(buildSubmitUpload(scheme));
    }
  }

  if (config.tag === 'el-form') {
    mixinMethod(scheme, methodList);
  }

  if (isArray(scheme.children) && scheme.__config__.tag !== 'el-form') {
    scheme.children.forEach(child => {
      buildAttributes(child, dataList, optionsList, methodList, propsList, uploadVarList, created);
    });
  }
}

// 构建data
function buildData(scheme, dataList) {
  if (scheme.__config__.tag === 'el-form') {
    if (scheme.formModel) {
      const children = [];
      scheme.children.forEach(child => {
        buildData(child, children);
      });
      dataList.push(`${scheme.formModel}: {
        ${children.join('\n')}
      },`);
    }
    if (scheme.formRules) {
      const children = [];
      scheme.children.forEach(child => {
        buildRules(child, children);
      });
      dataList.push(`${scheme.formRules}: {
        ${children.join('\n')}
      },`);
    }
  } else {
    const config = scheme.__config__;
    if (scheme.__vModel__ === undefined) return;
    const defaultValue = JSON.stringify(config.defaultValue);
    dataList.push(`${scheme.__vModel__}: ${defaultValue},`);
  }
}

// 构建校验规则
function buildRules(scheme, ruleList) {
  const config = scheme.__config__;
  if (scheme.__vModel__ === undefined) return;
  const rules = [];
  if (ruleTrigger[config.tag]) {
    if (config.required) {
      const type = isArray(config.defaultValue) ? 'type: \'array\',' : '';
      let message = isArray(config.defaultValue) ? `请至少选择一个${config.label}` : scheme.placeholder;
      if (message === undefined) message = `${config.label}不能为空`;
      rules.push(`{ required: true, ${type} message: '${message}', trigger: '${ruleTrigger[config.tag]}' }`);
    }
    if (config.regList && isArray(config.regList)) {
      config.regList.forEach(item => {
        if (item.pattern) {
          rules.push(
            // eslint-disable-next-line no-eval
            `{ pattern: ${eval(item.pattern)}, message: '${item.message}', trigger: '${ruleTrigger[config.tag]}' }`
          );
        }
      });
    }
    ruleList.push(`${scheme.__vModel__}: [${rules.join(',')}],`);
  }
}

// 构建options
function buildOptions(scheme, optionsList) {
  if (scheme.__vModel__ === undefined) return;
  // el-cascader直接有options属性，其他组件都是定义在slot中，所以有两处判断
  let { options } = scheme;
  if (!options) options = scheme.__slot__.options;
  if (scheme.__config__.dataType === 'dynamic') { options = []; }
  const str = `${scheme.__vModel__}Options: ${JSON.stringify(options)},`;
  optionsList.push(str);
}

function buildOptionMethod(methodName, model, methodList, scheme) {
  const config = scheme.__config__;
  const str = `${methodName}() {
    // 注意：this.$axios是通过Vue.prototype.$axios = axios挂载产生的
    this.$axios({
      method: '${config.method}',
      url: '${config.url}'
    }).then(resp => {
      var { data } = resp
      this.${model} = data.${config.dataKey}
    })
  },`;
  methodList.push(str);
}

function buildProps(scheme, propsList) {
  const str = `${scheme.__vModel__}Props: ${JSON.stringify(scheme.props.props)},`;
  propsList.push(str);
}

// el-upload的BeforeUpload
function buildBeforeUpload(scheme) {
  const config = scheme.__config__;
  const unitNum = units[config.sizeUnit]; let rightSizeCode = ''; let acceptCode = ''; const
    returnList = [];
  if (config.fileSize) {
    rightSizeCode = `let isRightSize = file.size / ${unitNum} < ${config.fileSize}
    if(!isRightSize){
      this.$message.error('文件大小超过 ${config.fileSize}${config.sizeUnit}')
    }`;
    returnList.push('isRightSize');
  }
  if (scheme.accept) {
    acceptCode = `let isAccept = new RegExp('${scheme.accept}').test(file.type)
    if(!isAccept){
      this.$message.error('应该选择${scheme.accept}类型的文件')
    }`;
    returnList.push('isAccept');
  }
  const str = `${scheme.__vModel__}BeforeUpload(file) {
    ${rightSizeCode}
    ${acceptCode}
    return ${returnList.join('&&')}
  },`;
  return returnList.length ? str : '';
}

// el-upload的submit
function buildSubmitUpload(scheme) {
  return `submitUpload() {
    this.$refs['${scheme.__vModel__}'].submit()
  },`;
}

// 在Created调用函数
function callInCreated(methodName, created) {
  created.push(`this.${methodName}()`);
}

// 混入处理函数
function mixinMethod(scheme, methodList, type = 'file') {
  const minxins = {
    file: scheme.formBtn ? {
      submitForm: `submitForm${titleCase(scheme.formRef)}() {
        this.$refs['${scheme.formRef}'].validate(valid => {
          if(!valid) return
          // TODO 提交表单
        })
      },`,
      resetForm: `resetForm${titleCase(scheme.formRef)}() {
        this.$refs['${scheme.formRef}'].resetFields()
      },`
    } : null,
    dialog: {
      onOpen: `on${titleCase(scheme.formRef)}Open() {},`,
      onClose: `on${titleCase(scheme.formRef)}Close() {
        this.$refs['${scheme.formRef}'].resetFields()
      },`,
      close: `close${titleCase(scheme.formRef)}() {
        this.$emit('update:visible', false)
      },`,
      handleConfirm: `handle${titleCase(scheme.formRef)}Confirm() {
        this.$refs['${scheme.formRef}'].validate(valid => {
          if(!valid) return
          this.close()
        })
      },`
    }
  };

  const methods = minxins[type];
  if (methods) {
    Object.keys(methods).forEach(key => {
      methodList.push(methods[key]);
    });
  }
}

// js整体拼接
function buildExport(type, data, selectOptions, uploadVar, props, methods, created) {
  return `${exportDefault}{
  ${inheritAttrs[type]}
  components: {},
  props: [],
  data () {
    return {
      ${data}
      ${uploadVar}
      ${selectOptions}
      ${props}
    }
  },
  computed: {},
  watch: {},
  created () {
    ${created}
  },
  mounted () {},
  methods: {
    ${methods}
  }
}`;
}

/**
 * @description 拼接script
 * @example {}
 * @param {Array} allConfig 整个配置
 * @param {String}type 弹框或页面
 * @return {string}
 */
export function makeupScript(allConfig, type = 'file') {
  const dataList = [];
  const optionsList = [];
  const propsList = [];
  const methodList = [];
  const uploadVarList = [];
  const created = [];
  const configClone = deepClone(allConfig);
  configClone.forEach(config => {
    buildAttributes(config, dataList, optionsList, methodList, propsList, uploadVarList, created);
  });

  const str = buildExport(
    type,
    dataList.join('\n'),
    optionsList.join('\n'),
    uploadVarList.join('\n'),
    propsList.join('\n'),
    methodList.join('\n'),
    created.join('\n')
  );
  return str;
}

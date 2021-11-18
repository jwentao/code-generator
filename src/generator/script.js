import { exportDefault, titleCase, deepClone } from '@/utils/index';
import ruleTrigger from './ruleTrigger';

const isArray = Array.isArray;
console.log(titleCase, exportDefault);

function buildAttributes(scheme, dataList, ruleList, optionsList, methodList, propsList, uploadVarList, created) {
  // const config = scheme.__config__;
  // const slot = scheme.__slot__;
  buildData(scheme, dataList);
  buildRules(scheme, ruleList);
  if (isArray(scheme.children) && scheme.__config__.tag !== 'el-form') {
    scheme.children.forEach(child => {
      buildAttributes(child, dataList, ruleList, optionsList, methodList, propsList, uploadVarList, created);
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
      }`);
    }
    if (scheme.formRules) {
      const children = [];
      scheme.children.forEach(child => {
        buildRules(child, children);
      });
      dataList.push(`${scheme.formRules}: {
        ${children.join('\n')}
      }`);
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
  console.log(scheme);
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

/**
 * @description 查询兑换记录
 * @example {}
 * @param {Array} allConfig 整个配置
 * @return {string}
 */
export function makeupScript(allConfig) {
  const dataList = [];
  const ruleList = [];
  const optionsList = [];
  const propsList = [];
  const methodList = [];
  const uploadVarList = [];
  const created = [];
  const configClone = deepClone(allConfig);
  configClone.forEach(config => {
    buildAttributes(config, dataList, ruleList, optionsList, methodList, propsList, uploadVarList, created);
  });
  console.log(dataList);
}

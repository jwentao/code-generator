import { Injectable } from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';
import { Connection } from 'mongoose';
const { execSync } = require('child_process');
const script = 'sh ./script/build.sh';

const fs = require('fs');
const path = require('path');
const root = path.join(__dirname);

@Injectable()
export class AppService {
  constructor(@InjectConnection() private  connection: Connection) {
  }

  getHello(): string {
    execSync(script, (err, stdout, stderr) => {
      if (!err) {
        console.log(stdout);
      } else {
        console.log(stderr);
      }
    });
    return 'Hello World!';
  }

  async init({ name }): Promise<string> {
    // console.log(name);
    // check path
    const path = root.replace('src', 'test-lib');

    const fileNames = fs.readdirSync(path);
    for (let i = 0; i < fileNames.length; i++) {
      const item = fileNames[i];
      if (item === name) {
        const info = fs.statSync(`${path}/${item}`);
        if (info.isDirectory()) {
          return 'this name is exist';
        }
      }
    }
    fs.writeFileSync(root.replace('src', 'template/src/App.vue'), '<template>\n' +
        '  <div>\n' +
        '    <div :style="{width: \'100%\',display: \'block\',padding: \'6px 6px 6px 6px\',margin: \'0 0 0 0\'}">\n' +
        '      <el-form :style="{width: \'100%\'}" ref="elForm" :model="formData" :rules="rules" size="medium"\n' +
        '               :inline=false label-width="100px">\n' +
        '        <el-form-item label="单行文本" prop="customer1">\n' +
        '          <el-input v-model="formData.customer1" placeholder="请输入" clearable :style="{width: \'100%\'}">\n' +
        '          </el-input>\n' +
        '        </el-form-item>\n' +
        '        <el-form-item size="large">\n' +
        '          <el-button type="primary" @click="submitFormElForm">提交</el-button>\n' +
        '          <el-button @click="resetFormElForm">重置</el-button>\n' +
        '        </el-form-item>\n' +
        '      </el-form>\n' +
        '      <el-table :data="undefined" :style="{width: \'100%\'}"></el-table>\n' +
        '    </div>\n' +
        '  </div>\n' +
        '</template>\n' +
        '<script>\n' +
        'export default {\n' +
        '  components: {},\n' +
        '  props: [],\n' +
        '  data () {\n' +
        '    return {\n' +
        '      formDataCustomer1Options: undefined,\n' +
        '      formData: {\n' +
        '        customer1: 222\n' +
        '      },\n' +
        '      rules: {\n' +
        '        customer1: [{\n' +
        '          required: true,\n' +
        '          message: \'请输入\',\n' +
        '          trigger: \'blur\'\n' +
        '        }]\n' +
        '      }\n' +
        '    }\n' +
        '  },\n' +
        '  computed: {},\n' +
        '  watch: {},\n' +
        '  created () {},\n' +
        '  mounted () {},\n' +
        '  methods: {\n' +
        '    submitFormElForm () {\n' +
        '      this.$refs.elForm.validate(valid => {\n' +
        '        if (!valid) return\n' +
        '        this.$axios({\n' +
        '          method: \'post\',\n' +
        '          url: \'http://localhost:3000/test\',\n' +
        '          data: this.formData\n' +
        '        }).then(resp => {\n' +
        '          const {\n' +
        '            data\n' +
        '          } = resp\n' +
        '          this.undefined = data\n' +
        '        })\n' +
        '      })\n' +
        '    },\n' +
        '    resetFormElForm () {\n' +
        '      this.$refs.elForm.resetFields()\n' +
        '    }\n' +
        '  }\n' +
        '}\n' +
        '\n' +
        '</script>\n' +
        '<style>\n' +
        '</style>\n')

    fs.writeFileSync(root.replace('src', 'template/package.json'), `{
      "name": "${name}",
      "version": "0.1.0",
      "private": true,
      "scripts": {
        "serve": "vue-cli-service serve",
        "build": "vue-cli-service build",
        "lint": "vue-cli-service lint"
      },
      "dependencies": {
        "core-js": "^3.8.3",
        "element-ui": "^2.15.6",
        "vue": "^2.6.14",
        "vue-router": "^3.5.1",
        "vuex": "^3.6.2"
      },
      "devDependencies": {
        "@babel/core": "^7.12.16",
        "@babel/eslint-parser": "^7.12.16",
        "@vue/cli-plugin-babel": "~5.0.0",
        "@vue/cli-plugin-eslint": "~5.0.0",
        "@vue/cli-plugin-router": "~5.0.0",
        "@vue/cli-plugin-vuex": "~5.0.0",
        "@vue/cli-service": "~5.0.0",
        "@vue/eslint-config-standard": "^6.1.0",
        "eslint": "^7.32.0",
        "eslint-plugin-import": "^2.25.3",
        "eslint-plugin-node": "^11.1.0",
        "eslint-plugin-promise": "^5.1.0",
        "eslint-plugin-vue": "^8.0.3",
        "open-browser-webpack-plugin": "^0.0.5",
        "vue-template-compiler": "^2.6.14"
      }
    }
    `)
    try {
      return execSync(`${script} ${name}`).toString();
    } catch (e) {
      console.log(e);
      return e;
    }
  }

  testScript() {
    try {
      const a = execSync('sh ./script/deploy.sh').toString();
      console.log(a);
    } catch (e) {
      console.log(e.output.map(item => item && item.toString()));
      console.log(e);
    }
  }
}

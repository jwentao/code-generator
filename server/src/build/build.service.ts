import { Injectable } from '@nestjs/common';
import { Lib_Path, ROOT_PATH } from '../config/app.config';
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');
const root = path.join(__dirname);
const script = `sh ${ROOT_PATH}/script/build.sh`;

console.log(root, root.replace('src', 'test-lib'), Lib_Path)

@Injectable()
export class BuildService {
  async build({ name, code, deployId }: { name: string, code: string, deployId: string }) {
    // 确认没有同名
    const fileNames = fs.readdirSync(Lib_Path);
    for (let i = 0; i < fileNames.length; i++) {
      const item = fileNames[i];
      if (item === name) {
        const info = fs.statSync(`${Lib_Path}/${item}`);
        if (info.isDirectory()) {
          throw new Error('this name is exist');
        }
      }
    }

    // 写App.vue
    fs.writeFileSync(`${ROOT_PATH}/template/src/App.vue`, code);

    // 写package.json
    fs.writeFileSync(`${ROOT_PATH}/template/package.json`, `{
      "name": "${name}",
      "version": "1.0.0",
      "deployId": "${deployId}",
      "private": true,
      "scripts": {
        "serve": "vue-cli-service serve",
        "build": "vue-cli-service build",
        "lint": "vue-cli-service lint",
        "eslint-fix": "eslint --fix ./src"
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

    execSync(`${script} ${name} ${deployId}`);
  }
}

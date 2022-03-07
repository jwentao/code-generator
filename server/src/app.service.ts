import { Injectable } from '@nestjs/common';
const exec = require('child_process').exec;
const script = 'sh ./script/build.sh';

@Injectable()
export class AppService {
  getHello(): string {
    exec(script, (err, stdout, stderr) => {
      if (!err) {
        console.log(stdout);
      } else {
        console.log(stderr);
      }
    });
    return 'Hello World!';
  }
}

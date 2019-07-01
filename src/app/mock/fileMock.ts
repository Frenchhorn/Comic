import { File } from '@ionic-native/file/ngx';

export class FileMock extends File {
  checkDir(path: string, dir: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      resolve(true);
    });
  }

  readAsText(path: string, file: string): Promise<string> {
    console.log('[readAsText]', path, file);
    let str;
    if (file === 'setting.json') {
      str = JSON.stringify({
        'test': '1'
      });
    }
    return new Promise((resolve, reject) => {
      if(str) {
        resolve(str);
      } else {
        reject('File does not exist');
      }
    });
  }
}

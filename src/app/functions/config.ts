let STORAGE: Storage;
let CONFIG = {};

export function initConfig(storage, config = '') {
  STORAGE = storage;
  if (config) {
    CONFIG = Object.assign(CONFIG, JSON.parse(config));
  }
  console.log('[initConfig]', STORAGE, CONFIG);
}

export function getConfig() {
  return CONFIG;
}

export function setConfig(config) {
  CONFIG = Object.assign(CONFIG, config);
  STORAGE.setItem('config', JSON.stringify(CONFIG));
}

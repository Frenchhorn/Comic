let STORAGE;
let CONFIG = {};

export function initConfig(storage, config) {
  STORAGE = storage;
  if (config) {
    CONFIG = Object.assign(CONFIG, JSON.parse(config));
  }
  console.log('[initConfig]', STORAGE, CONFIG);
}

const VERSION = '1.0';
const TABLE_CONFIG_VERSION_KEY = 'table_config_version';
const TABLE_CONFIG_KEY = 'table_config';

export function getTableLocalConfig() {
  const version = localStorage.getItem(TABLE_CONFIG_VERSION_KEY);
  if (version !== VERSION) {
    localStorage.setItem(TABLE_CONFIG_VERSION_KEY, VERSION);
    saveTableLocalConfig([]);
    return null;
  }

  const str = localStorage.getItem(TABLE_CONFIG_KEY);
  if (str) return JSON.parse(str);
  return null;
}

export function saveTableLocalConfig(config) {
  localStorage.setItem(TABLE_CONFIG_KEY, JSON.stringify(config));
}

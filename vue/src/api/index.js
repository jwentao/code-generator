const STORAGE_KEY = 'CONFIG_STORAGE_KEY';

export const saveConfig = (config) => {
  console.log(config);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(config));
};

export const getConfig = () => {
  try {
    const data = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (Array.isArray(data)) {
      return data;
    }
    return [];
  } catch (e) {
    return [];
  }
};

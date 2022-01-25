export const generateId = () => (`${Date.now()}${Math.random().toString(10).substr(2, 4)}`);

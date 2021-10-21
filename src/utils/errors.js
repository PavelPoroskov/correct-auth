const isObject = (value) => value !== null && typeof value === 'object';

const addDataToError = ({ error, data }) => {
  if (data) {
    Object.entries(data).forEach(([key, value]) => {
      // eslint-disable-next-line no-param-reassign
      error[key] = isObject(error[key])
        ? {
          ...error[key],
          ...value,
        }
        : value;
    });
  }

  return error;
};

module.exports = {
  addDataToError,
};

export default (state = '', { type, payload }) => {
  switch (type) {
    case 'UPDATE_USER_INPUT':
      return payload;

    default:
      return state;
  }
};

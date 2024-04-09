module.exports = {
  ...jest.requireActual("react-router-dom"),
  useHistory: jest.fn(),
};

export const handleErrors = (value) => {
  let errors = [];
  if (value.length === 0 || value === undefined) {
    errors.push("Please fill out this field.");
  }
  return errors;
};


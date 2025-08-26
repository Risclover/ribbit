export const validateUsername = (username, usernameTaken) => {
  let errors = [];
  if (username === "") {
    errors.push("Please fill out this field.");
  } else if (username.length < 3) {
    errors.push(
      `\n\nPlease lengthen this text to 3 characters or more (you are currently using ${
        username.length
      } character${username.length <= 1 ? "" : "s"}).`
    );
  } else if (!/^[A-Za-z0-9_-]*$/.test(username)) {
    errors.push('username can only contain letters, numbers, "-", and "_"');
  } else if (usernameTaken) {
    errors.push("that username is already taken");
  } else {
    errors = [];
  }
  return errors;
};

export const validatePassword = (password) => {
  const errors = [];
  if (password === "") {
    errors.push("Please fill out this field.");
  } else if (password.length < 8) {
    errors.push(
      `\n\nPlease lengthen this text to 8 characters or more (you are currently using ${
        password.length
      } character${password.length <= 1 ? "" : "s"}).`
    );
  }
  return errors;
};

export function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!email?.includes("@")) {
    if (email === "") {
      return "Please enter an email address.";
    } else {
      return (
        "Please include an '@' in the email address. '" +
        email +
        "' is missing an '@'."
      );
    }
  }

  const parts = email.split("@");
  if (parts.length !== 2 || parts[0] === "" || parts[1] === "") {
    if (parts.length === 1) {
      return (
        "Please enter a part followed by '@'. '" + email + "' is incomplete."
      );
    } else if (parts[0] === "") {
      return "Please enter a part before '@'. '" + email + "' is incomplete.";
    } else {
      return (
        "Please enter a part following '@'. '" + email + "' is incomplete."
      );
    }
  }

  if (!emailRegex.test(email)) {
    const domainParts = parts[1].split(".");
    if (domainParts.length <= 1) {
      return "'.' is used at a wrong position in '" + parts[1] + "'.";
    }
    const topLevelDomain = domainParts.pop();
    const secondLevelDomain = domainParts.pop();
    return (
      "'." +
      topLevelDomain +
      "' is used at a wrong position in '" +
      secondLevelDomain +
      "." +
      topLevelDomain +
      "'."
    );
  }
}

export function handleEmailErrors(email, emailTaken) {
  let errors = [];
  if (email === "") {
    errors.push("Please fill out this field.");
  } else if (validateEmail(email) && validateEmail(email).length > 0) {
    errors.push(validateEmail(email));
  } else {
    if (emailTaken) {
      errors.push("that email is already taken");
    } else {
      errors = [];
    }
  }
  return errors;
}

import validator from "validator";

export function SignUpFormUsernameValidator(
  setUsernameErrors,
  usernameErrors,
  username
) {
  let usernames = [];

  if (username.length < 3 || username.length > 20) {
    usernames.push("Username must be between 3 and 20 characters.");
  }

  if (!/^[a-zA-Z0-9-_]+$/.test(username) && username.length > 0) {
    usernames.push(
      "Letters, numbers, dashes, and underscores only. Please try again without symbols."
    );
  }

  if (usernames.length > 0) {
    setUsernameErrors(usernames);
    console.log("username errors:", usernameErrors);
  }
}

export function SignUpFormPasswordValidator(
  password,
  setPasswordErrors,
  passwordErrors,
  repeatPassword
) {
  let passes = [];

  if (password !== repeatPassword) {
    passes.push("Your passwords don't match. Please try again.");
  }
  if (password.length < 8) {
    passes.push("Password must be at least 8 characters long.");
  }

  console.log("passes:", passes);
  if (passes.length > 0) {
    setPasswordErrors(passes);
    console.log("password errors:", passwordErrors);
  }
}

export function SignUpFormEmailValidator(setEmailErrors, email) {
  let emails = [];

  if (!validator.isEmail(email)) {
    emails.push("Not a valid email address.");
  }

  if (emails.length > 0) {
    setEmailErrors(emails);
  }
}

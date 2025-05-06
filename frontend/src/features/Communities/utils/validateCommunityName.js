export function validateCommunityName(name, nameTaken) {
  if (name.length === 0) {
    return "A community name is required.";
  } else if (
    (name.length < 3 && name.length >= 1) ||
    name.length > 21 ||
    !/^\w+$/.test(name)
  ) {
    return "Community names must be between 3–21 characters, and can only contain letters, numbers, or underscores.";
  } else if (nameTaken) {
    return `Sorry, c/${name} is taken. Try another.`;
  }
  return [];
}

export function validateCommunityName(name) {
  if (name.length < 3 || name.length > 21 || !/^\w+$/.test(name)) {
    return [
      "Community names must be between 3–21 characters, and can only contain letters, numbers, or underscores.",
    ];
  }
  return [];
}

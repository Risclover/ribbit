// utils/validateCommunityName.ts
/**
 * Validate a new community name.
 *
 * @param name       The raw name the user typed (no leading “c/”).
 * @param nameTaken  Result of an async check that the name is already used.
 * @returns          ""  – no error
 *                   any non‑empty string – message to show the user
 */
export function validateCommunityName(
  name: string,
  nameTaken: boolean
): string {
  const trimmed = name.trim();

  if (trimmed.length === 0) {
    return "A community name is required.";
  }

  if (
    trimmed.length < 3 ||
    trimmed.length > 21 ||
    !/^\w+$/.test(trimmed)          // letters, numbers, underscores only
  ) {
    return (
      "Community names must be between 3–21 characters and may only contain " +
      "letters, numbers, or underscores."
    );
  }

  if (nameTaken) {
    return `Sorry, c/${trimmed} is taken. Try another.`;
  }

  /* No problems found */
  return "";
}

/**
 * Look up a community’s numeric/string ID by its slug-name.
 *
 * @param name         Community slug, e.g. `"javascript"`
 * @param communities  The `communities` slice from Redux (object keyed by id)
 * @returns            The matching community’s id, or `null` when not found
 */
export function getIdFromName<T extends { id: number | string; name: string }>(
  name: string,
  communities: Record<string, T>
): T["id"] | null {
  const match = Object.values(communities).find((c) => c.name === name);
  return match ? match.id : null;
}

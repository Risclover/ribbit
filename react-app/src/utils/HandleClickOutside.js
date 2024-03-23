export function HandleClickOutside(
  event,
  ref,
  showComponent,
  setShowComponent
) {
  if (ref.current && !ref.current.contains(event.target)) {
    setShowComponent(!showComponent);
  }
}

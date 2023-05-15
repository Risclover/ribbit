export default function HandleClickOutside(
  event,
  ref,
  showComponent,
  setShowComponent
) {
  if (ref.current && !ref.current.contains(event.target)) {
    setTimeout(() => {
      setShowComponent(false);
    }, [200]);
  }
}

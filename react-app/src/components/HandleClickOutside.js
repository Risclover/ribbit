export default function HandleClickOutside(
  event,
  ref,
  showComponent,
  setShowComponent
) {
  if (ref.current && !ref.current.contains(event.target)) {
    console.log(showComponent);
    setTimeout(() => {
      setShowComponent(false);
    }, [200]);
  }
}

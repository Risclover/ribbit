export function groupAndSortNotifications(notifications) {
  // Make a fresh copy before sorting
  const sorted = [...notifications].sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );

  const today = sorted.filter(
    (n) => new Date(n.createdAt).getDay() === new Date().getDay()
  );

  const earlier = sorted.filter(
    (n) => new Date(n.createdAt).getDay() !== new Date().getDay()
  );

  return { sorted, today, earlier };
}

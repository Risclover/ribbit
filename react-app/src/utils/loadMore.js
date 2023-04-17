export const loadMore = (posts, items, page, setLoading, setItems, setPage) => {
  setLoading(true);
  setTimeout(() => {
    setItems([...items, ...posts.slice(page * 5, page * 5 + 5)]);
    setPage(page + 1);
    setLoading(false);
  }, 1000);
};

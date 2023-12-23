// SearchComponent.jsx
import { useDispatch, useSelector } from "react-redux";
import { setSearchQuery } from "../../../store";

export const buildSearchParams = (searchQuery) => {
  const params = new URLSearchParams();
  params.append("query", searchQuery);
  return params.toString();
};

export const FakeSearch = () => {
  const dispatch = useDispatch();
  const searchQuery = useSelector((state) => state.searchQuery);

  const handleSearchChange = (e) => {
    dispatch(setSearchQuery(e.target.value));
  };

  const handleSearchSubmit = () => {
    const queryString = buildSearchParams(searchQuery);
    // Use queryString as needed (e.g., update the browser URL, make API request)
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search..."
        value={searchQuery}
        onChange={handleSearchChange}
      />
    </div>
  );
};

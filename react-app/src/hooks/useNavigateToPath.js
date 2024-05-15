import { useHistory } from "react-router-dom";

export const useNavigateToPath = () => {
  const history = useHistory();

  return (path) => () => history.push(path);
};

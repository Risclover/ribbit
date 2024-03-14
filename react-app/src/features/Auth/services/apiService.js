import { useDispatch } from "react-redux";
import { checkUsername } from "../../../store";

export const useCheckUsername = (username) => {
  const dispatch = useDispatch();

  const checkUsernameTaken = async () => {
    const res = await dispatch(checkUsername(username));
    const { Message } = await res.json();
    return Message;
  };

  return { checkUsernameTaken };
};

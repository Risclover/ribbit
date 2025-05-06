import { useDispatch } from "react-redux";
import { checkCommunityName } from "@/store";

export const useCheckCommunityName = (name) => {
  const dispatch = useDispatch();

  const checkNameTaken = async () => {
    const res = await dispatch(checkCommunityName(name));
    const { Message } = await res.json();
    return Message;
  };

  return { checkNameTaken };
};

import { useAppDispatch } from "@/store";
import { checkCommunityName } from "@/store";

export const useCheckCommunityName = (name) => {
  const dispatch = useAppDispatch();

  const checkNameTaken = async () => {
    const res = await dispatch(checkCommunityName(name));
    const { Message } = await res.json();
    return Message;
  };

  return { checkNameTaken };
};

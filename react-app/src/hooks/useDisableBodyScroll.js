import { useEffect } from "react";

export const useDisableBodyScroll = (open) => {
  useEffect(() => {
    document.body.style.overflow = "unset";
  }, [open]);
};

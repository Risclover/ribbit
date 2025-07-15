import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "./index";

/** Instead of plain `useDispatch` */
export const useAppDispatch = () => useDispatch<AppDispatch>();

/** Instead of plain `useSelector` */
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

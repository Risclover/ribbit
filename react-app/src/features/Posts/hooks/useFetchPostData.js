import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getCommunities,
  getPosts,
  getSubscriptions,
  getFollowers,
} from "../../../store";

export function useFetchPostData() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(getCommunities());
      await dispatch(getPosts());
      await dispatch(getSubscriptions());
      await dispatch(getFollowers());
      setLoading(false);
    };
    fetchData();
  }, [dispatch]);

  return { loading };
}

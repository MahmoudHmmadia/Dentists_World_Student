import { UseContext } from "./../context/Context";
import { useEffect } from "react";
import { axiosPrivate } from "../api/axios";
import useRefresh from "./useRefresh";

function useAxiosPrivate() {
  const { refresh } = useRefresh();
  const { auth } = UseContext();
  useEffect(() => {
    const requestIntercept = axiosPrivate.interceptors.request.use(
      (config) => {
        if (!config.headers["Authorization"]) {
          config.headers.Authorization = `Bearer ${auth?.token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );
    const responseIntercept = axiosPrivate.interceptors.response.use(
      (response) => response,
      async (error) => {
        const prevReq = error.config;
        if (error.response.status === 403 && !prevReq.sent) {
          const newToken = await refresh();
          prevReq.sent = true;
          prevReq.headers.Authorization = `Bearer ${newToken}`;
          return axiosPrivate(prevReq);
        } else {
          return Promise.reject(error);
        }
      }
    );
    return () => {
      axiosPrivate.interceptors.request.eject(requestIntercept);
      axiosPrivate.interceptors.response.eject(responseIntercept);
    };
  }, [auth, refresh]);
  return { axiosPrivate };
}

export default useAxiosPrivate;

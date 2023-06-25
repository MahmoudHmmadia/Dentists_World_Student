import axios from "../api/axios";
import { UseContext } from "../context/Context";
function useRefresh() {
  const { setAuth } = UseContext();
  async function refresh() {
    const response = await axios.get("/refresh", {
      withCredentials: true,
    });
    setAuth!((prev) => {
      if (prev)
        return {
          ...prev,
          token: response.data?.token,
        };
    });
    return response.data.token;
  }
  return { refresh };
}
export default useRefresh;

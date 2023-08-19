import { useRef } from "react";
import { SERVER_ERROR, UseContext } from "../context/Context";
import { axiosPrivate } from "../api/axios";

function useMessages() {
  const { auth, setServerResponse, setLoader } = UseContext();
  const name = auth?.fullName;
  const messageRef = useRef<HTMLTextAreaElement>(null);
  function sendMessage() {
    setLoader(true);
    axiosPrivate
      .post("/message", { name, message: messageRef.current?.value })
      .then(() => {
        setLoader(false);
        setServerResponse({
          type: "done",
          content: "تم استلام رسالتك بنجاح ، شكراً لتواصلك معنا ",
        });
      })
      .catch(() => {
        setLoader(false);
        setServerResponse(SERVER_ERROR);
      });
  }
  return {
    messageRef,
    sendMessage,
  };
}
export default useMessages;

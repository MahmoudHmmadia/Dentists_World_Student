import { useRef } from "react";
import { SERVER_ERROR, UseContext } from "../context/Context";
import { axiosPrivate } from "../api/axios";
import { servicesVersion } from "typescript";

function useMessages() {
  const { auth, setServerResponse } = UseContext();
  const name = auth?.fullName;
  const messageRef = useRef<HTMLTextAreaElement>(null);
  function sendMessage() {
    axiosPrivate
      .post("/message", { name, message: messageRef.current?.value })
      .then(() => {
        setServerResponse({
          type: "done",
          content: "تم استلام رسالتك بنجاح ، شكراً لتواصلك معنا ",
        });
      })
      .catch(() => {
        setServerResponse(SERVER_ERROR);
      });
  }
  return {
    messageRef,
    sendMessage,
  };
}
export default useMessages;

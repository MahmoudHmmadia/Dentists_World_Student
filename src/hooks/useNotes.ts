import { useRef, useState } from "react";
import { SERVER_ERROR, UseContext } from "../context/Context";
import useAxiosPrivate from "./useAxiosPrivate";
import { nanoid } from "nanoid";
export type notes = {
  title: string | undefined;
  content: string | undefined;
  id: string;
};
export function useNotes() {
  const noteTitleRef = useRef<HTMLInputElement>(null);
  const noteContentRef = useRef<HTMLTextAreaElement>(null);
  const [isSeen, setIsSeen] = useState(false);
  const [isNote, setIsNote] = useState(false);
  const { auth, setAuth, setServerResponse } = UseContext();
  const { axiosPrivate } = useAxiosPrivate();
  function handleSaveNote() {
    noteContentRef.current?.value && noteTitleRef.current?.value
      ? setIsNote(true)
      : setIsNote(false);
  }
  async function handleNotes() {
    await axiosPrivate
      .post(`/user/${auth?.id}/notes`, {
        id: nanoid(),
        title: noteTitleRef.current?.value,
        content: noteContentRef.current?.value,
      })
      .then((res) => {
        setAuth!({ ...auth, ...res.data.user });
        noteContentRef.current!.value = "";
        noteTitleRef.current!.value = "";
        setIsSeen(true);
        setIsNote(false);
      })
      .catch(() => {
        setServerResponse(SERVER_ERROR);
      });
  }
  async function deleteNote(noteId: string) {
    await axiosPrivate.put(`/user/${auth?.id}/notes`, { noteId }).then(() => {
      getNotes();
    });
  }
  async function getNotes() {
    await axiosPrivate
      .get(`/user/${auth?.id}/notes`)
      .then((res) => {
        setAuth!({ ...auth, ...res.data.user });
      })
      .catch(() => {
        setServerResponse(SERVER_ERROR);
      });
  }

  return {
    noteContentRef,
    noteTitleRef,
    isNote,
    isSeen,
    handleNotes,
    handleSaveNote,
    setIsSeen,
    deleteNote,
    getNotes,
  };
}

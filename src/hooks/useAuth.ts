import { SyntheticEvent, useRef, useState } from "react";
export function useAuth() {
  const nameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const passwordCRef = useRef<HTMLInputElement>(null);
  const universityIdRef = useRef<HTMLInputElement>(null);
  const imageRef = useRef<HTMLInputElement>(null);
  const firstYearRef = useRef<HTMLInputElement>(null);
  const secondYearRef = useRef<HTMLInputElement>(null);
  const thirdYearRef = useRef<HTMLInputElement>(null);
  const fourthYearRef = useRef<HTMLInputElement>(null);
  const fivYearRef = useRef<HTMLInputElement>(null);
  const masterYearRef = useRef<HTMLInputElement>(null);
  const [isRegister, setIsRegister] = useState(true);
  const [isValid, setIsValid] = useState(false);
  // ==> For Animation <== //

  function handleBlur(e: SyntheticEvent) {
    const target = e.target as HTMLInputElement;
    if (target?.value === "") {
      target.parentElement?.classList.remove("move");
    } else {
      target.parentElement?.classList.add("move");
    }
  }
  function handleFocus(e: SyntheticEvent) {
    const target = e.target as HTMLInputElement;
    target.parentElement?.classList.add("move");
  }
  function reset() {
    document.querySelectorAll(".input-container").forEach((e) => {
      e?.classList.remove("move");
    });
  }

  // ==> Logic <== //

  function getFormData(formData: FormData) {
    if (isRegister) {
      formData.append("fullName", nameRef.current?.value!);
      formData.append("password", passwordRef.current?.value!);
      formData.append("passwordC", passwordCRef.current?.value!);
      formData.append("universityID", universityIdRef.current?.value!);
      formData.append("image", imageRef.current?.files![0]!);
      formData.append("profileImage", imageRef.current?.files![0]!.name!);
      formData.append(
        "academicYear",
        [
          firstYearRef,
          secondYearRef,
          thirdYearRef,
          fourthYearRef,
          firstYearRef,
          masterYearRef,
        ].filter((e) => e.current?.checked && e.current)[0].current?.id!
      );
    } else {
      formData.append("fullName", nameRef.current?.value!);
      formData.append("password", passwordRef.current?.value!);
    }
  }
  function valid() {
    if (isRegister) {
      if (
        imageRef.current?.files![0] &&
        nameRef.current?.value &&
        passwordRef.current?.value &&
        passwordCRef.current?.value &&
        universityIdRef.current?.value
      ) {
        setIsValid(true);
      } else {
        setIsValid(false);
      }
    } else {
      if (nameRef.current?.value && passwordRef.current?.value) {
        setIsValid(true);
      } else {
        setIsValid(false);
      }
    }
  }
  function clearInputs() {
    if (isRegister) {
      nameRef.current!.value = "";
      passwordRef.current!.value = "";
      passwordCRef.current!.value = "";
      universityIdRef.current!.value = "";
      reset();
    } else {
      nameRef.current!.value = "";
      passwordRef.current!.value = "";
      reset();
    }
    valid();
  }

  return {
    handleFocus,
    handleBlur,
    setIsRegister,
    getFormData,
    valid,
    clearInputs,
    reset,
    isValid,
    nameRef,
    passwordRef,
    passwordCRef,
    universityIdRef,
    firstYearRef,
    secondYearRef,
    thirdYearRef,
    fourthYearRef,
    fivYearRef,
    masterYearRef,
    imageRef,
  };
}

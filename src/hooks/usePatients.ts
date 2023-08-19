import { useRef, useState } from "react";
import axios from "../api/axios";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { SERVER_ERROR, UseContext } from "../context/Context";
import { Form, useNavigate } from "react-router-dom";
export type patient = {
  _id: string;
  fullName: string;
  address: string;
  phoneId: number;
  clinics: string[];
  xRay: string;
  state: any;
  smoker: string;
  occupation: string;
  gender: string;
  age: number;
  createdAt: string;
  updatedAt: string;
  __v: number;
  reserved: boolean;
};
export function usePatients() {
  const { axiosPrivate } = useAxiosPrivate();
  const {
    auth,
    patientState,
    setAuth,
    setPatients,
    setReservedPatient,
    setServerResponse,
    setLoader,
  } = UseContext();
  const navigate = useNavigate();
  const [clinicName, setClinicName] = useState("التشخيص");
  const [reservedPatients, setReservedPatients] = useState<patient[]>([]);
  const [isSeenStatesMenu, setIsSeenStatesMenu] = useState(false);
  const smookRef = useRef<HTMLInputElement>(null);
  const xRayRef = useRef<HTMLInputElement>(null);
  async function getPatients() {
    setLoader(true);
    await axios
      .get("/patient")
      .then((res) => {
        setLoader(false);
        setPatients(res.data);
      })
      .catch(() => {
        setLoader(false);
        setServerResponse(SERVER_ERROR);
      });
  }
  async function reservePatient(id: string) {
    setLoader(true);
    await axiosPrivate
      .put(`/patient/${id}/${auth?.id}`)
      .then((res) => {
        setLoader(false);
        setPatients(res.data.patients);
        setAuth!({ ...auth, ...res.data.user });
        navigate("/", { replace: true });
      })
      .catch(() => {
        setLoader(false);
        setServerResponse(SERVER_ERROR);
      });
  }
  async function updatePatientState(id: string) {
    setLoader(true);
    const formData = new FormData();
    formData.append("smook", smookRef.current!.checked ? "yes" : "no");
    formData.append("xray", xRayRef.current?.files![0]!);
    if (xRayRef.current?.files![0])
      formData.append("xRayName", xRayRef.current?.files![0].name!);
    formData.append("patientState", JSON.stringify(patientState));
    await axiosPrivate
      .post(`/patient/${id}/${auth?.id}`, formData)
      .then((res) => {
        setLoader(false);
        setAuth!({ ...auth, ...res.data.user });
        setServerResponse({
          content:
            "تم عمل تحديث لبيانات المريض ، قم بفك الحجز عنه في حال انتهيت من خطة معالجته ",
          type: "done",
        });
      })
      .catch(() => {
        setServerResponse(SERVER_ERROR);
        setLoader(false);
      });
  }
  async function endTreatmentPlan(id: string) {
    setLoader(true);
    await axiosPrivate
      .delete(`/patient/${id}/${auth?.id}`)
      .then((res) => {
        setLoader(false);
        setAuth!({ ...auth, ...res.data.user });
        setPatients([...res.data.patients]);
        setReservedPatient(undefined);
        navigate("/", { replace: true });
      })
      .catch(() => {
        setLoader(false);
        setServerResponse(SERVER_ERROR);
      });
  }
  return {
    clinicName,
    reservedPatients,
    setClinicName,
    getPatients,
    setReservedPatients,
    reservePatient,
    updatePatientState,
    endTreatmentPlan,
    isSeenStatesMenu,
    setIsSeenStatesMenu,
    smookRef,
    xRayRef,
  };
}

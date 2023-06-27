import { useRef, useState } from "react";
import axios from "../api/axios";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { SERVER_ERROR, UseContext } from "../context/Context";
import { useNavigate } from "react-router-dom";
export type patient = {
  _id: string;
  fullName: string;
  address: string;
  phoneId: number;
  clinics: string[];
  xRays: string[];
  state: any;
  smoker: boolean;
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
  } = UseContext();
  const navigate = useNavigate();
  const [clinicName, setClinicName] = useState("التشخيص");
  const [isSeenMenu, setIsSeenMenu] = useState(false);
  const [reservedPatients, setReservedPatients] = useState<patient[]>([]);
  const smookRef = useRef<HTMLInputElement>(null);
  async function getPatients() {
    await axios.get("/patient").then((res) => {
      setPatients(res.data);
    });
  }
  async function reservePatient(id: string) {
    await axiosPrivate.put(`/patient/${id}/${auth?.id}`).then((res) => {
      setPatients(res.data.patients);
      setAuth!({ ...auth, ...res.data.user });
      navigate("/", { replace: true });
    });
  }
  async function updatePatientState(id: string) {
    await axiosPrivate
      .post(`/patient/${id}/${auth?.id}`, {
        patientState,
        smook: smookRef.current?.checked ? true : false,
      })
      .then((res) => {
        setAuth!({ ...auth, ...res.data.user });
        navigate("/", { replace: true });
      });
  }
  async function endTreatmentPlan(id: string) {
    await axiosPrivate
      .delete(`/patient/${id}/${auth?.id}`)
      .then((res) => {
        setAuth!({ ...auth, ...res.data.user });
        setPatients([...res.data.patients]);
        setReservedPatient(undefined);
        navigate("/", { replace: true });
      })
      .catch(() => {
        setServerResponse(SERVER_ERROR);
      });
  }
  return {
    clinicName,
    isSeenMenu,
    reservedPatients,
    setClinicName,
    setIsSeenMenu,
    getPatients,
    setReservedPatients,
    reservePatient,
    updatePatientState,
    endTreatmentPlan,
    smookRef,
  };
}

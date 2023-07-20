import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from "react";
import { patient } from "../hooks/usePatients";
import { notes } from "../hooks/useNotes";
import { ErrorI } from "../pages/register";
export type clinic = {
  info: string;
  extra?: string[] | [];
};

export interface PatientStatesI {
  ["لثة"]: clinic[] | undefined;
  ["متحركة"]: clinic[] | undefined;
  ["ثابتة"]: clinic[] | undefined;
  ["لبية"]: clinic[] | undefined;
  ["ترميمية"]: clinic[] | undefined;
  ["أطفال"]: clinic[] | undefined;
  ["تخدير و قلع"]: clinic[] | undefined;
  ["طب الفم و التقويم"]: clinic[] | undefined;
}
export interface AuthI {
  id: number;
  fullName: string;
  password: string;
  universityID: Number;
  academicYear: String;
  role: Number;
  profileImage: string;
  notes: [] | notes[];
  reservedCases: patient[];
  gender: string;
  token: string;
  _id?: number;
}
export const SERVER_ERROR = {
  type: "error",
  content: "هناك عطل بالسيرفر ، حاول لاحقاً",
};
interface ContextI {
  patientState:
    | PatientStatesI
    | undefined
    | { [x: string]: clinic[] | undefined };
  setPatientState?: Dispatch<
    SetStateAction<
      PatientStatesI | undefined | { [x: string]: clinic[] | undefined }
    >
  >;
  auth: AuthI | undefined;
  setAuth?: Dispatch<SetStateAction<AuthI | undefined>>;
  patients: patient[] | undefined;
  setPatients: Dispatch<SetStateAction<patient[] | undefined>>;
  reservedPatient: patient | undefined;
  setReservedPatient: Dispatch<SetStateAction<patient | undefined>>;
  serverResponse: { type: string; content: string | ErrorI[] } | undefined;
  setServerResponse: Dispatch<
    SetStateAction<{ type: string; content: string | ErrorI[] } | undefined>
  >;
  isOverLay: boolean;
  setIsisOverLay: Dispatch<SetStateAction<boolean>>;
}
const context = createContext<ContextI>({
  patientState: undefined,
  setPatientState: () => {},
  auth: undefined,
  setAuth: () => {},
  patients: undefined,
  setPatients: () => {},
  reservedPatient: undefined,
  setReservedPatient: () => {},
  serverResponse: undefined,
  setServerResponse: () => {},
  isOverLay: false,
  setIsisOverLay: () => {},
});

export function Provider({ children }: { children: ReactNode }) {
  const [patients, setPatients] = useState<patient[]>();
  const [auth, setAuth] = useState<AuthI | undefined>(undefined);
  const [reservedPatient, setReservedPatient] = useState<patient | undefined>();
  const [patientState, setPatientState] = useState<
    PatientStatesI | undefined | { [x: string]: clinic[] | undefined }
  >(reservedPatient?.state);
  const [serverResponse, setServerResponse] = useState<
    undefined | { type: string; content: string | ErrorI[] }
  >(undefined);
  const [isOverLay, setIsisOverLay] = useState(false);
  return (
    <context.Provider
      value={{
        patientState,
        setPatientState,
        auth,
        setAuth,
        patients,
        setPatients,
        reservedPatient,
        setReservedPatient,
        serverResponse,
        setServerResponse,
        isOverLay,
        setIsisOverLay,
      }}
    >
      {children}
    </context.Provider>
  );
}
export const UseContext = () => useContext(context);

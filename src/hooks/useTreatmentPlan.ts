import { SyntheticEvent } from "react";
import { UseContext } from "../context/Context";

export function useTreatmentPlan() {
  const { patientState, setPatientState } = UseContext();
  function getPatientState(e: SyntheticEvent) {
    const target = e.currentTarget as HTMLInputElement;
    const clinicTitle: string = target.name;
    const clinicInfo = target.id;
    const parent = target.parentElement;
    const inputContainer = parent?.parentElement;
    if (target.checked) {
      inputContainer?.classList.add("showen-collection");
      if (patientState) {
        if (patientState![clinicTitle as keyof typeof patientState]) {
          const arr = patientState![clinicTitle as keyof typeof patientState];
          if (arr) {
            setPatientState!({
              ...patientState,
              [clinicTitle]: [...arr, { info: clinicInfo }],
            });
          }
        } else {
          setPatientState!({
            ...patientState,
            [clinicTitle]: [{ info: clinicInfo }],
          });
        }
      } else {
        setPatientState!({
          [clinicTitle]: [
            {
              info: clinicInfo,
            },
          ],
        });
      }
    } else {
      inputContainer?.classList.remove("showen-collection");
      if (patientState) {
        const arr = patientState[
          clinicTitle as keyof typeof patientState
        ]?.filter((e) => e.info !== clinicInfo);
        setPatientState!({
          ...patientState,
          [clinicTitle]: arr,
        });
      }
    }
  }

  function reset(title: string) {
    setPatientState!({
      ...patientState,
      [title]: undefined,
    });
  }

  return { getPatientState, reset };
}

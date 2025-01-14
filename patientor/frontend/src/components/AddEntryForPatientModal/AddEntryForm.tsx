import {EntryFormValues, Diagnosis} from "../../types";
import AddHealthCheckEntry from "./AddHealthCheckEntry.tsx";
import AddHospitalEntry from "./AddHospitalEntry.tsx";
import AddOccupationalEntry from "./AddOccupationalEntry.tsx";


interface Props {
    onCancel: () => void;
    onSubmit: (values: EntryFormValues) => void;
    entryType: string;
    diagnoses: Diagnosis[];
}

export interface PropsWithoutEntryType extends Omit<Props, "entryType"> {}

const AddEntryForm = ({ onCancel, onSubmit, entryType, diagnoses }: Props) => {
    switch(entryType) {
        case "HealthCheck":
            return <AddHealthCheckEntry onCancel={onCancel} onSubmit={onSubmit} diagnoses={diagnoses} />
        case "Hospital":
            return <AddHospitalEntry onCancel={onCancel} onSubmit={onSubmit} diagnoses={diagnoses}  />
        case "Occupational":
            return <AddOccupationalEntry onCancel={onCancel} onSubmit={onSubmit} diagnoses={diagnoses}  />
    }
};

export default AddEntryForm;
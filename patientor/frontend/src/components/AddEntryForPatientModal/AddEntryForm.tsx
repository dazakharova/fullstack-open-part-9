import {EntryFormValues} from "../../types";
import AddHealthCheckEntry from "./AddHealthCheckEntry.tsx";
import AddHospitalEntry from "./AddHospitalEntry.tsx";
import AddOccupationalEntry from "./AddOccupationalEntry.tsx";


interface Props {
    onCancel: () => void;
    onSubmit: (values: EntryFormValues) => void;
    entryType: string
}

export interface PropsWithoutEntryType extends Omit<Props, "entryType"> {}

const AddEntryForm = ({ onCancel, onSubmit, entryType }: Props) => {
    switch(entryType) {
        case "HealthCheck":
            return <AddHealthCheckEntry onCancel={onCancel} onSubmit={onSubmit} />
        case "Hospital":
            return <AddHospitalEntry onCancel={onCancel} onSubmit={onSubmit} />
        case "Occupational":
            return <AddOccupationalEntry onCancel={onCancel} onSubmit={onSubmit} />
    }
};

export default AddEntryForm;
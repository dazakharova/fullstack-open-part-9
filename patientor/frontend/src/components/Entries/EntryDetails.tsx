import { Entry} from "../../types.ts";
import HospitalEntryDetails from "./HospitalEntryDetails.tsx";
import HealthCheckEntryDetails from "./HealthCheckEntryDetails.tsx";
import OccupationalHealthcareEntryDetails from "./OccupationalHealthcareEntryDetails.tsx";

const assertNever = (value: never): never => {
    throw new Error(
        `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
};

interface EntryDetailsProps {
    entry: Entry;
    findDiagnosisName: (name: string) => string
}

const EntryDetails = (props: EntryDetailsProps) => {
    switch (props.entry.type) {
        case "Hospital":
            return <HospitalEntryDetails findDiagnosisName={props.findDiagnosisName} entry={props.entry} />
        case "HealthCheck":
            return <HealthCheckEntryDetails findDiagnosisName={props.findDiagnosisName} entry={props.entry} />
        case "OccupationalHealthcare":
            return <OccupationalHealthcareEntryDetails findDiagnosisName={props.findDiagnosisName} entry={props.entry} />
        default:
            return assertNever(props.entry);
    }
};

export default EntryDetails;
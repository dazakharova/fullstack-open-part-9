import { HealthCheckEntry } from "../../types.ts";
import MedicalServicesIcon from "@mui/icons-material/MedicalServices";

interface Props {
    entry: HealthCheckEntry,
    findDiagnosisName: (name: string) => string
}

const HealthCheckEntryDetails = (props: Props) => {

    return (
        <div>
            <span>{props.entry.date}</span>&nbsp;
            <MedicalServicesIcon/>
            <p><i>{props.entry.description}</i></p>

            <ul>
                {props.entry.diagnosisCodes ? props.entry.diagnosisCodes.map((code, i) => <li
                    key={i}>{code} {props.findDiagnosisName(code)}</li>) : null}
            </ul>
            <p>Health Check rating: {props.entry.healthCheckRating}</p>
        </div>
    )
};

export default HealthCheckEntryDetails;
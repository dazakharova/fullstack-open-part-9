import { HospitalEntry } from "../../types.ts";
import MedicalServicesIcon from "@mui/icons-material/MedicalServices";

interface Props {
    entry: HospitalEntry;
    findDiagnosisName: (name: string) => string;
}

const HospitalEntryDetails = (props: Props) => {
    return (
        <div>
            <span>{props.entry.date}</span>&nbsp;
            <MedicalServicesIcon/><br/>
            <p><i>{props.entry.description}</i></p>

            <ul>
                {props.entry.diagnosisCodes ? props.entry.diagnosisCodes.map((code, i) => <li
                    key={i}>{props.findDiagnosisName(code)}</li>) : null}
            </ul>
            <p>{props.entry.discharge.date} {props.entry.discharge.criteria}</p>
        </div>
    )
};

export default HospitalEntryDetails;
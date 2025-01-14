import {OccupationalHealthcareEntry} from "../../types.ts";
import WorkIcon from "@mui/icons-material/Work";

interface Props {
    entry: OccupationalHealthcareEntry,
    findDiagnosisName: (name: string) => string
}

const OccupationalHealthcareEntryDetails = (props: Props) => {
    return (
        <div>

            <span>{props.entry.date}</span>&nbsp;
            <WorkIcon/>&nbsp;
            <span><i>{props.entry.employerName}</i></span>
            <p><i>{props.entry.description}</i></p>

            <ul>
                {props.entry.diagnosisCodes ? props.entry.diagnosisCodes.map((code, i) => <li
                    key={i}>{props.findDiagnosisName(code)}</li>) : null}
            </ul>

            {props.entry.sickLeave ?
                <p>Sick leave: from {props.entry.sickLeave.startDate} to {props.entry.sickLeave.endDate}</p> : null}
        </div>
    )
};

export default OccupationalHealthcareEntryDetails;
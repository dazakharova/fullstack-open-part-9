import { Entry, Diagnosis } from '../../types';

interface EntriesProps {
    entries: Entry[];
    diagnoses: Diagnosis[];
}

const Entries = (props: EntriesProps) => {
    const findDiagnosisName = (code: string): string => {
        const diagnosis = props.diagnoses.find((d: Diagnosis) => d.code === code);
        return diagnosis ? `${code} ${diagnosis.name}` : code;
    };

    for (const entry of props.entries) {
        switch (entry.type) {
            case 'HealthCheck':
                return (
                    <div>
                        <p>{entry.date} {entry.description}</p>
                        <ul>
                            {entry.diagnosisCodes ? entry.diagnosisCodes.map((code, i) => <li key={i}>{code} {findDiagnosisName(code)}</li>) : null}
                        </ul>
                        <p>Health Check rating: {entry.healthCheckRating}</p>
                    </div>
                )
            case 'Hospital':
                return (
                    <div>
                        <p>{entry.date} {entry.description}</p>
                        <ul>
                            {entry.diagnosisCodes ? entry.diagnosisCodes.map((code, i) => <li key={i}>{code} {findDiagnosisName(code)}</li>) : null}
                        </ul>
                        <p>{entry.discharge.date} {entry.discharge.criteria}</p>
                    </div>
                )
            case 'OccupationalHealthcare':
                return (
                    <div>
                        <p>{entry.date} {entry.description}</p>
                        <ul>
                            {entry.diagnosisCodes ? entry.diagnosisCodes.map((code, i) => <li key={i}>{code} {findDiagnosisName(code)}</li>) : null}
                        </ul>
                        <p>Employer name: {entry.employerName}</p>
                        {entry.sickLeave ? <p>Sick leave: from {entry.sickLeave.startDate} to {entry.sickLeave.endDate}</p> : null}
                    </div>
                )
        }
    }
}

export default Entries;
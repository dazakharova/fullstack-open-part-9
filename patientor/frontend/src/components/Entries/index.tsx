import { Entry } from '../../types';

interface EntriesProps {
    entries: Entry[];
}

const Entries = (props: EntriesProps) => {
    for (const entry of props.entries) {
        switch (entry.type) {
            case 'HealthCheck':
                return (
                    <div>
                        <p>{entry.date} {entry.description}</p>
                        <ul>
                            {entry.diagnosisCodes ? entry.diagnosisCodes.map(code => <li>{code}</li>) : null}
                        </ul>
                        <p>Health Check rating: {entry.healthCheckRating}</p>
                    </div>
                )
            case 'Hospital':
                return (
                    <div>
                        <p>{entry.date} {entry.description}</p>
                        <ul>
                            {entry.diagnosisCodes ? entry.diagnosisCodes.map(code => <li>{code}</li>) : null}
                        </ul>
                        <p>{entry.discharge.date} {entry.discharge.criteria}</p>
                    </div>
                )
            case 'OccupationalHealthcare':
                return (
                    <div>
                        <p>{entry.date} {entry.description}</p>
                        <ul>
                            {entry.diagnosisCodes ? entry.diagnosisCodes.map(code => <li>{code}</li>) : null}
                        </ul>
                        <p>Employer name: {entry.employerName}</p>
                        {entry.sickLeave ? <p>Sick leave: from {entry.sickLeave.startDate} to {entry.sickLeave.endDate}</p> : null}
                    </div>
                )
        }
    }
}

export default Entries;
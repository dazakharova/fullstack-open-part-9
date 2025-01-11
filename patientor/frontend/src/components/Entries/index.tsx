import { Entry, Diagnosis } from '../../types';
import EntryDetails from "./EntryDetails.tsx";
import Box from "@mui/material/Box";

interface EntriesProps {
    entries: Entry[];
    diagnoses: Diagnosis[];
}

const Entries = (props: EntriesProps) => {
    const findDiagnosisName = (code: string): string => {
        const diagnosis = props.diagnoses.find((d: Diagnosis) => d.code === code);
        return diagnosis ? `${code} ${diagnosis.name}` : code;
    };

    return props.entries.map((e: Entry, i: number) => (
        <Box key={i}
            sx={{
                width: '100%',
                height: 'auto',
                border: '2px solid #1976d2',
                borderRadius: '4px',
                padding: 2,
            }}
        >
            <EntryDetails entry={e} findDiagnosisName={findDiagnosisName} />
        </Box>
    ))
}

export default Entries;
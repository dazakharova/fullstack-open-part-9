import AddEntryForm from "./AddEntryForm.tsx";
import {Alert, Dialog, DialogContent, DialogTitle, Divider} from "@mui/material";
import {EntryFormValues, Diagnosis} from "../../types.ts";

interface Props {
    modalOpen: boolean;
    onClose: () => void;
    onSubmit: (values: EntryFormValues) => void;
    error?: string;
    entryType: string | null;
    diagnoses: Diagnosis[];
}

const AddEntryForPatientModal = ({modalOpen, onClose, onSubmit, error, entryType, diagnoses}: Props) => {
    const getTitle = () => {
        switch (entryType) {
            case "HealthCheck":
                return "New Health Check Entry";
            case "Hospital":
                return "New Hospital Entry";
            case "Occupational":
                return "New Occupational Entry";
            default:
                return "";
        }
    };

    return (
        <Dialog fullWidth={true} open={modalOpen} onClose={() => onClose()}>
            <DialogTitle>{getTitle()}</DialogTitle>
            <Divider />
            <DialogContent>
                {error && <Alert severity="error">{error}</Alert>}
                {entryType && (
                    <AddEntryForm entryType={entryType} onSubmit={onSubmit} onCancel={onClose} diagnoses={diagnoses} />
                )}
            </DialogContent>
        </Dialog>
    )
}

export default AddEntryForPatientModal;
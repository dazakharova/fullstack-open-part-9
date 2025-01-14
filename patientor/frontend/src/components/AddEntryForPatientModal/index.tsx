import AddEntryForm from "./AddEntryForm.tsx";
import {Alert, Dialog, DialogContent, DialogTitle, Divider} from "@mui/material";
import {EntryFormValues} from "../../types.ts";

interface Props {
    modalOpen: boolean;
    onClose: () => void;
    onSubmit: (values: EntryFormValues) => void;
    error?: string;
    entryType: string | null;
}

const AddEntryForPatientModal = ({modalOpen, onClose, onSubmit, error, entryType}: Props) => {
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
                    <AddEntryForm entryType={entryType} onSubmit={onSubmit} onCancel={onClose} />
                )}
            </DialogContent>
        </Dialog>
    )
}

export default AddEntryForPatientModal;
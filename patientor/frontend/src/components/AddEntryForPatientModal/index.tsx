import AddEntryForm from "./AddEntryForm.tsx";
import {Alert, Dialog, DialogContent, DialogTitle, Divider} from "@mui/material";
import {EntryFormValues} from "../../types.ts";

interface Props {
    modalOpen: boolean;
    onClose: () => void;
    onSubmit: (values: EntryFormValues) => void;
    error?: string;
}

const AddEntryForPatientModal = ({modalOpen, onClose, onSubmit, error}: Props) => {
    return (
        <Dialog fullWidth={true} open={modalOpen} onClose={() => onClose()}>
            <DialogTitle>New HealthCheck Entry</DialogTitle>
            <Divider />
            <DialogContent>
                {error && <Alert severity="error">{error}</Alert>}
                <AddEntryForm onSubmit={onSubmit} onCancel={onClose}/>
            </DialogContent>
        </Dialog>
    )
}

export default AddEntryForPatientModal;
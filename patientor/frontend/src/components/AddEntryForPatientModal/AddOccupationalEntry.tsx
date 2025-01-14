import {PropsWithoutEntryType} from "./AddEntryForm";
import {SyntheticEvent, useState} from "react";
import {
    Button,
    Checkbox,
    Grid,
    InputLabel,
    ListItemText,
    MenuItem,
    Select,
    SelectChangeEvent,
    TextField
} from "@mui/material";

const AddOccupationalEntry = ({ onCancel, onSubmit, diagnoses }: PropsWithoutEntryType) => {
    const [description, setDescription] = useState<string>("");
    const [date, setDate] = useState<string>("");
    const [specialist, setSpecialist] = useState<string>("");
    const [diagnosisCodes, setDiagnosisCodes] = useState<string[]>([]);
    const [employerName, setEmployerName] = useState<string>("");
    const [sickLeaveStartDate, setSickLeaveStartDate] = useState<string>("");
    const [sickLeaveEndDate, setSickLeaveEndDate] = useState<string>("");

    const onDiagnosisCodesChange = (event: SelectChangeEvent<string[]>) => {
        const selectedValues = event.target.value as string[];
        setDiagnosisCodes(selectedValues);
    };

    const diagnosesCodesOptions: { value: string; label: string; }[] = diagnoses.map(v => ({
        value: v.code,
        label: v.code
    }))

    const addEntry = (event: SyntheticEvent) => {
        event.preventDefault();
        onSubmit({
            type: "OccupationalHealthcare",
            description,
            date,
            specialist,
            diagnosisCodes,
            employerName: employerName,
            sickLeave: {
                startDate: sickLeaveStartDate,
                endDate: sickLeaveEndDate
            }
        });
    };

    return (
        <div>
            <form onSubmit={addEntry}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField
                            label="Description"
                            fullWidth
                            value={description}
                            onChange={({target}) => setDescription(target.value)}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label="Date"
                            type="date"
                            InputLabelProps={{ shrink: true }}
                            fullWidth
                            value={date}
                            onChange={({target}) => setDate(target.value)}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label="Specialist"
                            fullWidth
                            value={specialist}
                            onChange={({target}) => setSpecialist(target.value)}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <InputLabel>Diagnosis Codes</InputLabel>
                        <Select
                            label="Diagnosis Codes"
                            fullWidth
                            multiple
                            value={diagnosisCodes}
                            onChange={onDiagnosisCodesChange}
                            renderValue={(selected) => (selected as string[]).join(", ")}
                        >
                            {diagnosesCodesOptions.map((option, i) => (
                                <MenuItem key={i} value={option.value}>
                                    <Checkbox checked={diagnosisCodes.includes(option.value)} />
                                    <ListItemText primary={option.label} />
                                </MenuItem>

                            ))}
                        </Select>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label="Employer name"
                            fullWidth
                            value={employerName}
                            onChange={({target}) => setEmployerName(target.value)}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <InputLabel style={{ marginBottom: 5 }}>Sick Leave</InputLabel>
                        <Grid container spacing={2}>
                            <Grid item xs={6}>
                                <TextField
                                    label="Start Date"
                                    type="date"
                                    fullWidth
                                    InputLabelProps={{ shrink: true }}
                                    value={sickLeaveStartDate}
                                    onChange={({ target }) => setSickLeaveStartDate(target.value)}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    label="End Date"
                                    type="date"
                                    fullWidth
                                    InputLabelProps={{ shrink: true }}
                                    value={sickLeaveEndDate}
                                    onChange={({ target }) => setSickLeaveEndDate(target.value)}
                                />
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>

                <Grid>
                    <Grid item>
                        <Button
                            color="secondary"
                            variant="contained"
                            style={{float: "left"}}
                            type="button"
                            onClick={onCancel}
                        >
                            Cancel
                        </Button>
                    </Grid>
                    <Grid item>
                        <Button
                            style={{
                                float: "right",
                            }}
                            type="submit"
                            variant="contained"
                        >
                            Add
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </div>
    )
}

export default AddOccupationalEntry;
import {PropsWithoutEntryType} from "./AddEntryForm";
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
import {SyntheticEvent, useState} from "react";

const AddHospitalEntry = ({ onCancel, onSubmit, diagnoses }: PropsWithoutEntryType) => {
    const [description, setDescription] = useState<string>("");
    const [date, setDate] = useState<string>("");
    const [specialist, setSpecialist] = useState<string>("");
    const [diagnosisCodes, setDiagnosisCodes] = useState<string[]>([]);
    const [dischargeDate, setDischargeDate] = useState<string>("");
    const [dischargeCriteria, setDischargeCriteria] = useState<string>("");

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
            type: "Hospital",
            description,
            date,
            specialist,
            diagnosisCodes,
            discharge: {
                date: dischargeDate,
                criteria: dischargeCriteria
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
                        <InputLabel style={{ marginBottom: 5}}>Discharge</InputLabel>
                        <Grid container spacing={2}>
                            <Grid item xs={6}>
                                <TextField
                                    label="Discharge date"
                                    type="date"
                                    InputLabelProps={{ shrink: true }}
                                    fullWidth
                                    value={dischargeDate}
                                    onChange={({target}) => setDischargeDate(target.value)}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    label="Criteria"
                                    fullWidth
                                    value={dischargeCriteria}
                                    onChange={({target}) => setDischargeCriteria(target.value)}
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

export default AddHospitalEntry;
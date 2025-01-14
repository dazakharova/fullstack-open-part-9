import {PropsWithoutEntryType} from "./AddEntryForm";
import {Checkbox, ListItemText, Button, Grid, InputLabel, MenuItem, Select, TextField, SelectChangeEvent} from "@mui/material";
import {HealthCheckRating} from "../../types.ts";
import {SyntheticEvent, useState} from "react";

interface HealthCheckRatingOption{
    value: HealthCheckRating;
    label: string;
}

const ratingOptions: HealthCheckRatingOption[] = Object.values(HealthCheckRating)
    .filter((v): v is HealthCheckRating => typeof v === "number")
    .map(v => ({
        value: v,
        label: v.toString(),
    }));

const AddHealthCheckEntry = ({ onCancel, onSubmit, diagnoses }: PropsWithoutEntryType) => {
    const [description, setDescription] = useState<string>("");
    const [date, setDate] = useState<string>("");
    const [specialist, setSpecialist] = useState<string>("");
    const [healthCheckRating, setHealthCheckRating] = useState<HealthCheckRating>(0);
    const [diagnosisCodes, setDiagnosisCodes] = useState<string[]>([]);

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
            type: "HealthCheck",
            description,
            date,
            specialist,
            healthCheckRating,
            diagnosisCodes
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
                        <InputLabel>HealthCheck Rating</InputLabel>
                        <Select
                            label="HealthCheck Rating"
                            fullWidth
                            value={healthCheckRating}
                            onChange={({target}) => {
                                setHealthCheckRating(target.value as HealthCheckRating)
                            }}
                        >
                            {ratingOptions.map(option =>
                                <MenuItem
                                    key={option.label}
                                    value={option.value}
                                >
                                    {option.label
                                    }</MenuItem>
                            )}
                        </Select>
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

export default AddHealthCheckEntry;

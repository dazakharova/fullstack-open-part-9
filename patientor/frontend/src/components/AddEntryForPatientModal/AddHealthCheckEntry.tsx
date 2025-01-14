import {PropsWithoutEntryType} from "./AddEntryForm";
import {Button, Grid, InputLabel, MenuItem, Select, TextField} from "@mui/material";
import {HealthCheckRating} from "../../types.ts";
import React, {SyntheticEvent, useState} from "react";

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

const AddHealthCheckEntry = ({ onCancel, onSubmit }: PropsWithoutEntryType) => {
    const [description, setDescription] = useState<string>("");
    const [date, setDate] = useState<string>("");
    const [specialist, setSpecialist] = useState<string>("");
    const [healthCheckRating, setHealthCheckRating] = useState<HealthCheckRating>(0);
    const [diagnosisCodes, setDiagnosisCodes] = useState<string[]>([]);

    const onDiagnosisCodesChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        event.preventDefault();

        if (typeof event.target.value === "string") {
            const inputCodes = event.target.value;
            const codes = inputCodes.split("/[\\s,]+/").map((code: string) => code.trim()).filter((code: string) => code !== "");
            setDiagnosisCodes(codes);
        }
    }

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
                <TextField
                    label="Description"
                    fullWidth
                    value={description}
                    onChange={({target}) => setDescription(target.value)}
                />
                <TextField
                    label="Date"
                    placeholder="YYYY-MM-DD"
                    fullWidth
                    value={date}
                    onChange={({target}) => setDate(target.value)}
                />
                <TextField
                    label="Specialist"
                    fullWidth
                    value={specialist}
                    onChange={({target}) => setSpecialist(target.value)}
                />

                <InputLabel style={{marginTop: 20}}>HealthCheck Rating</InputLabel>
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

                <TextField
                    label="Diagnosis codes"
                    fullWidth
                    value={diagnosisCodes ? diagnosisCodes.join(", ") : ""}
                    onChange={onDiagnosisCodesChange}
                />

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

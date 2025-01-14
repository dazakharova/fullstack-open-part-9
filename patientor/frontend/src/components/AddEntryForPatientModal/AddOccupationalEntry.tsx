import {PropsWithoutEntryType} from "./AddEntryForm";
import React, {SyntheticEvent, useState} from "react";
import {Button, Grid, TextField} from "@mui/material";

const AddOccupationalEntry = ({ onCancel, onSubmit }: PropsWithoutEntryType) => {
    const [description, setDescription] = useState<string>("");
    const [date, setDate] = useState<string>("");
    const [specialist, setSpecialist] = useState<string>("");
    const [diagnosisCodes, setDiagnosisCodes] = useState<string[]>([]);
    const [employerName, setEmployerName] = useState<string>("");
    const [sickLeaveStartDate, setSickLeaveStartDate] = useState<string>("");
    const [sickLeaveEndDate, setSickLeaveEndDate] = useState<string>("");

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

                <TextField
                    label="Diagnosis codes"
                    fullWidth
                    value={diagnosisCodes ? diagnosisCodes.join(", ") : ""}
                    onChange={onDiagnosisCodesChange}
                />

                <TextField
                    label="Employer name"
                    fullWidth
                    value={employerName}
                    onChange={({target}) => setEmployerName(target.value)}
                />

                <TextField
                    label="Sick leave start date"
                    placeholder="YYYY-MM-DD"
                    fullWidth
                    value={sickLeaveStartDate}
                    onChange={({target}) => setSickLeaveStartDate(target.value)}
                />

                <TextField
                    label="Sick leave end date"
                    fullWidth
                    value={sickLeaveEndDate}
                    onChange={({target}) => setSickLeaveEndDate(target.value)}
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

export default AddOccupationalEntry;
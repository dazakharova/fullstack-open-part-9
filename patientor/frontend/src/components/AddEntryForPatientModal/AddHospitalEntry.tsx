import {PropsWithoutEntryType} from "./AddEntryForm";
import {Button, Grid, TextField} from "@mui/material";
import React, {SyntheticEvent, useState} from "react";

const AddHospitalEntry = ({ onCancel, onSubmit }: PropsWithoutEntryType) => {
    const [description, setDescription] = useState<string>("");
    const [date, setDate] = useState<string>("");
    const [specialist, setSpecialist] = useState<string>("");
    const [diagnosisCodes, setDiagnosisCodes] = useState<string[]>([]);
    const [dischargeDate, setDischargeDate] = useState<string>("");
    const [dischargeCriteria, setDischargeCriteria] = useState<string>("");

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
                    label="Discharge date"
                    placeholder="YYYY-MM-DD"
                    fullWidth
                    value={dischargeDate}
                    onChange={({target}) => setDischargeDate(target.value)}
                />

                <TextField
                    label="Discharge criteria"
                    fullWidth
                    value={dischargeCriteria}
                    onChange={({target}) => setDischargeCriteria(target.value)}
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

export default AddHospitalEntry;
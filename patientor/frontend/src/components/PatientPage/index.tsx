import { useParams } from "react-router-dom";
import {Patient, Diagnosis, EntryFormValues, Entry} from "../../types.ts";
import Entries from '../Entries/index.tsx';
import patientService from "../../services/patients.ts";
import FemaleIcon from '@mui/icons-material/Female';
import MaleIcon from '@mui/icons-material/Male';
import {useEffect, useState} from "react";
import {Button, Grid} from "@mui/material";
import AddEntryForPatientModal from "../AddEntryForPatientModal";
import axios from "axios";

interface PatientPageProps {
    diagnoses: Diagnosis[];
}

const PatientPage = (props: PatientPageProps) => {
    const [patient, setPatient] = useState<Patient>();
    const [entries, setEntries] = useState<Entry[]|[]>([]);
    const [modalOpen, setModalOpen] = useState<boolean>(false);
    const [error, setError] = useState<string>();
    const [entryType, setEntryType] = useState<"HealthCheck" | "Hospital" | "Occupational" | null>(null);

    const openModal = (type: "HealthCheck" | "Hospital" | "Occupational"): void => {
        setEntryType(type);
        setModalOpen(true);
    };

    const closeModal = (): void => {
        setModalOpen(false);
        setError(undefined);
        setEntryType(null);
    };

    const id  = useParams().id;
    if (!id) return null;

    useEffect(() => {
        const fetchPatient = async () => {
            const patient = await patientService.getById(id);
            setPatient(patient);
            if (patient.entries) {
                setEntries(patient.entries);
            }
        }
        void fetchPatient();
    }, []);

    if (!patient) {
        return <div>Patient not found!</div>;
    }

    const submitNewEntry = async (values: EntryFormValues) => {
        try {
            const entry = await patientService.createEntry(patient.id, values);

            setEntries((prevEntries) => [...prevEntries, entry]);
            setPatient((prevPatient) => prevPatient ? { ...prevPatient, entries: [...(prevPatient.entries || []), entry] } : undefined);

            setModalOpen(false);
        } catch (e: unknown) {
            if (axios.isAxiosError(e)) {
                if (e?.response?.data && typeof e?.response?.data === "string") {
                    const message = e.response.data.replace('Something went wrong. Error: ', '');
                    console.error(message);
                    setError(message);
                } else {
                    setError("Unrecognized axios error");
                }
            } else {
                console.error("Unknown error", e);
                setError("Unknown error");
            }
        }
    };

    return (
        <div>

            <div style={{display: 'flex', alignItems: 'center'}}>
                <h2 style={{margin: 0, paddingRight: '10px'}}>{patient.name}</h2>
                <span>
                    {patient.gender === 'male' ? <MaleIcon/> : (patient.gender === 'female' ? <FemaleIcon/> : null)}
                </span>
            </div>
            {patient.ssn ? (<p>ssn: {patient.ssn}</p>) : null}
            <p>occupation: {patient.occupation}</p>

            <AddEntryForPatientModal
                modalOpen={modalOpen}
                onSubmit={submitNewEntry}
                error={error}
                onClose={closeModal}
                entryType={entryType}
            />
            <Grid container spacing={2}>
                <Grid item>
                    <Button variant="contained" onClick={() => openModal("HealthCheck")}>
                        Add Health Check Entry
                    </Button>
                </Grid>
                <Grid item>
                    <Button variant="contained" onClick={() => openModal("Hospital")}>
                        Add Hospital Entry
                    </Button>
                </Grid>
                <Grid item>
                    <Button variant="contained" onClick={() => openModal("Occupational")}>
                        Add Occupational Entry
                    </Button>
                </Grid>
            </Grid>

            {entries ? <Entries entries={entries} diagnoses={props.diagnoses} /> : null}

        </div>
    )
}

export default PatientPage;
import { useParams } from "react-router-dom";
import { Patient } from "../../types.ts";
import Entries from '../Entries/index.tsx';
import patientService from "../../services/patients.ts";
import FemaleIcon from '@mui/icons-material/Female';
import MaleIcon from '@mui/icons-material/Male';
import {useEffect, useState} from "react";

const PatientPage = () => {
    const [patient, setPatient] = useState<Patient>();
    const id  = useParams().id;
    if (!id) return null;

    useEffect(() => {
        const fetchPatient = async () => {
            const patient = await patientService.getById(id);
            setPatient(patient);
        }
        void fetchPatient();
    }, []);


    if (!patient) {
        return <div>Patient not found!</div>;
    }

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
            {patient.entries ? <Entries entries={patient.entries} /> : null}

        </div>
    )
}

export default PatientPage;
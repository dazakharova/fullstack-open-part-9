import {Dispatch, SetStateAction, useState} from 'react';
import { createDiaryEntry } from '../services/diaryService.ts';
import { DiaryEntry, NewDiaryEntry } from '../types.ts';

interface NewDiaryEntryFormProps {
    diaryEntries: DiaryEntry[];
    setDiaryEntries: Dispatch<SetStateAction<DiaryEntry[]>>;
    setNotification: Dispatch<SetStateAction<string>>;
}

const NewDiaryEntryForm = (props: NewDiaryEntryFormProps) => {
    const [date, setDate] = useState<string>('');
    const [visibility, setVisibility] = useState<string>('');
    const [weather, setWeather] = useState<string>('');
    const [comment, setComment] = useState<string>('');

    const newDiaryEntry = {
        date: date,
        visibility: visibility,
        weather: weather,
        comment: comment,
    }

    const diaryEntryCreation = (event: React.SyntheticEvent) => {
        event.preventDefault();
        createDiaryEntry(newDiaryEntry as NewDiaryEntry)
            .then((data: DiaryEntry) => {
                props.setDiaryEntries([...props.diaryEntries, data]);
        })
            .catch((error: Error) => {
                props.setNotification(error.message);
                setTimeout(() => {
                    props.setNotification('');
                }, 5000);
            })
    }

    return (
        <div>
            <h3>Add new entry</h3>
            <form onSubmit={diaryEntryCreation}>
                <div>
                    date
                    <input
                        id="date"
                        value={date}
                        onChange={(event) => setDate(event.target.value)}
                    />
                </div>

                <div>
                    visibility
                    <input
                        id="visibility"
                        value={visibility}
                        onChange={(event) => setVisibility(event.target.value)}
                    />
                </div>

                <div>
                    weather
                    <input
                        id="weather"
                        value={weather}
                        onChange={(event) => setWeather(event.target.value)}
                    />
                </div>

                <div>
                    comment
                    <input
                        id="comment"
                        value={comment}
                        onChange={(event) => setComment(event.target.value)}
                    />
                </div>
                <button type='submit'>add</button>
            </form>
        </div>
    )
}

export default NewDiaryEntryForm;
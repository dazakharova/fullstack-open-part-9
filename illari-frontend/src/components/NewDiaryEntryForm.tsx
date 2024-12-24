import {Dispatch, SetStateAction, useState} from 'react';
import { createDiaryEntry } from '../services/diaryService.ts';
import { DiaryEntry, NewDiaryEntry } from '../types.ts';

interface NewDiaryEntryFormProps {
    diaryEntries: DiaryEntry[];
    setDiaryEntries: Dispatch<SetStateAction<DiaryEntry[]>>;
    setNotification: Dispatch<SetStateAction<string>>;
}

const NewDiaryEntryForm = (props: NewDiaryEntryFormProps) => {
    const [date, setDate] = useState<string>("2024-12-01");
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
                    date&nbsp;
                    <input
                        id="date"
                        type="date"
                        value={date}
                        onChange={(event) => setDate(event.target.value)}
                    />
                </div>

                <div>
                    visibility&nbsp;
                    <span>
                        great
                        <input
                            type="radio"
                            name="visibility"
                            id="visibility1"
                            value="great"
                            onChange={(event) => setVisibility(event.target.value)}
                        />
                    </span>
                    <span>
                        good
                        <input
                            type="radio"
                            name="visibility"
                            id="visibility2"
                            value="good"
                            onChange={(event) => setVisibility(event.target.value)}
                        />
                    </span>
                    <span>
                        ok
                        <input
                            type="radio"
                            name="visibility"
                            id="visibility3"
                            value="ok"
                            onChange={(event) => setVisibility(event.target.value)}
                        />
                    </span>
                    <span>
                        poor
                        <input
                            type="radio"
                            name="visibility"
                            id="visibility4"
                            value="poor"
                            onChange={(event) => setVisibility(event.target.value)}
                        />
                    </span>
                </div>

                <div>
                    weather&nbsp;
                    <span>
                        sunny
                        <input
                            type="radio"
                            name="weather"
                            id="weather1"
                            value="sunny"
                            onChange={(event) => setWeather(event.target.value)}
                        />
                    </span>
                    <span>
                        rainy
                        <input
                            type="radio"
                            name="weather"
                            id="weather2"
                            value="rainy"
                            onChange={(event) => setWeather(event.target.value)}
                        />
                    </span>
                    <span>
                        cloudy
                        <input
                            type="radio"
                            name="weather"
                            id="weather3"
                            value="cloudy"
                            onChange={(event) => setWeather(event.target.value)}
                        />
                    </span>
                    <span>
                        stormy
                        <input
                            type="radio"
                            name="weather"
                            id="weather4"
                            value="stormy"
                            onChange={(event) => setWeather(event.target.value)}
                        />
                    </span>
                    <span>
                        windy
                        <input
                            type="radio"
                            name="weather"
                            id="weather5"
                            value="windy"
                            onChange={(event) => setWeather(event.target.value)}
                        />
                    </span>
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
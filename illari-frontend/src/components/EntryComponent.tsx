import DiaryEntry from '../types.ts';

interface DiaryEntryProps {
    diaryEntry: DiaryEntry
}

const EntryComponent = (props: DiaryEntryProps) => {

    return (
        <div>
            <p><b>{props.diaryEntry.date}</b></p>
            <p>visibility: {props.diaryEntry.visibility}<br/>weather: {props.diaryEntry.weather}</p>
        </div>
    )
}

export default EntryComponent
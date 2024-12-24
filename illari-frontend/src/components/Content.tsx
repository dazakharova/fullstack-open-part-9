import EntryComponent from './EntryComponent.tsx';
import DiaryEntry from '../types.ts';

interface ContentProps {
    diaryEntries: DiaryEntry[]
}

const Content = (props: ContentProps) => {
    return (
        <div>
            <h3>Diary Entries</h3>
            {props.diaryEntries.map((entry, i) => (
                <EntryComponent key={i} diaryEntry={entry}/>
            ))}
        </div>
    )
}

export default Content;
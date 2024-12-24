import {useEffect, useState} from 'react';
import Content from './components/Content.tsx';
import NewDiaryEntryForm from './components/NewDiaryEntryForm.tsx';
import { getAllDiaryEntries } from './services/diaryService.ts';
import { DiaryEntry } from './types.ts';

const App= () => {
    const [diaryEntries, setDiaryEntries] = useState<DiaryEntry[]>([]);
    useEffect(() => {
        getAllDiaryEntries().then((data) => {
            setDiaryEntries(data);
        });
    })

  return (
      <>
          <NewDiaryEntryForm diaryEntries={diaryEntries} setDiaryEntries={setDiaryEntries} />
          <Content diaryEntries={diaryEntries} />
      </>
  )
}

export default App

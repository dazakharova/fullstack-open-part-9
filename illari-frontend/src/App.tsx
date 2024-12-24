import {useEffect, useState} from 'react';
import Content from './components/Content.tsx';
import NewDiaryEntryForm from './components/NewDiaryEntryForm.tsx';
import { getAllDiaryEntries } from './services/diaryService.ts';
import { DiaryEntry } from './types.ts';
import Notification from "./components/Notification.tsx";

const App= () => {
    const [diaryEntries, setDiaryEntries] = useState<DiaryEntry[]>([]);
    const [notification, setNotification] = useState<string>('');

    useEffect(() => {
        getAllDiaryEntries().then((data) => {
            setDiaryEntries(data);
        });
    })

  return (
      <>
          <Notification text={notification} />
          <NewDiaryEntryForm diaryEntries={diaryEntries} setDiaryEntries={setDiaryEntries} setNotification={setNotification} />
          <Content diaryEntries={diaryEntries} />
      </>
  )
}

export default App

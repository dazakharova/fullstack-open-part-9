import coursePart from '../types.ts';
import Part from './Part.tsx';

interface ContentProps {
    courseParts: coursePart[];
}

const Content = (props: ContentProps) => {
    return (
        <>
            {props.courseParts.map((part, i) => (
               <Part key={i} {...part} />
            ))}
        </>
    )
};

export default Content;
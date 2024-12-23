import CoursePart from '../types.ts';

const assertNever = (value: never): never => {
    throw new Error(
        `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
};

const Part = (part: CoursePart) => {
    switch (part.kind) {
        case "basic":
            return (
                <>
                    <p>{part.name} {part.exerciseCount}<br />
                        <i>{part.description}</i>
                    </p>
                </>
            )
        case "group":
            return (
                <>
                    <p>{part.name} {part.exerciseCount}<br />
                        project exercise {part.groupProjectCount}
                    </p>
                </>
            )
        case "background":
            return (
                <>
                    <p>{part.name} {part.exerciseCount}<br />
                        <i>{part.description}</i>
                        {part.backgroundMaterial}
                    </p>
                </>
            )
        case "special":
            return (
                <>
                    <p>{part.name} {part.exerciseCount}<br />
                        <i>{part.description}</i><br />
                        required skills: {part.requirements.join(', ')}
                    </p>
                </>
            )
        default:
            assertNever(part)
    }
};

export default Part;
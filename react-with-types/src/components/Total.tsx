interface TotalProps {
    totalExercises: number
}

const Total = (props: TotalProps) => {
    return (
        <p>{props.totalExercises}</p>
    )
};

export default Total;
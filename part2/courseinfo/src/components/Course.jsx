const Header = ({course}) => {
    const title = course.name
    return <h2>{title}</h2>
}

const Part = ({name, exercises}) => {
    return (
        <p>
            {name} {exercises}
        </p>
    )
}

const Content = ({ course }) => {
    const parts = course.parts
    return (
        <div>
            {parts.map( part => 
                <Part key={part.id} name={part.name} exercises={part.exercises} />
            )}
        </div>
    )
}

const Total = ({ course }) => {
    const parts = course.parts
    const total = parts.reduce(((sum, parte) => {return parte.exercises + sum}), 0)
    return (
        <p><b>
            total of {total} exercises
        </b></p>
    )
}

const Course = ({ course }) => {
    return (
        <div>
            <Header course={course} />
            <Content course={course} />
            <Total course={course} />
        </div>
    )
}

export default Course
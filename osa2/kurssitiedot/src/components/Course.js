const Course = ({courses}) => {
  return (
    <div>
      {courses.map(course =>
        <Display key={course.id} course={course}/>
        )}
    </div>
  )
}
  
  const Display = ({course}) => {
    return (
      <div>
        <Header name={course.name}/>
        <Content parts={course.parts}/>
        <Total parts={course.parts}/>
      </div>
    )
  }

  const Header = ({name}) => {
    return (
      <div>
        <h2>{name}</h2>
      </div>
    )
  }
  
  const Part = (props) => {
    return (
      <div>
        <p>
          {props.name} {props.exercises}
        </p>
      </div>
    )
  }
  
  const Content = ({parts}) => {
    
    return (
          <div>          
            {parts.map(part =>
              <Part key={part.id} name={part.name} exercises={part.exercises}/>
              )}
          </div>
    )
  }
  
  const Total = ({parts}) => {
    return (
      <div>
        <strong>
          total of {parts.reduce((total, part) => 
            total + part.exercises, 0
            )} exercises</strong>
      </div>
    )
  }

  export default Course
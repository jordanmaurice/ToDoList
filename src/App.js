import React from 'react';
import './App.css';

class ToDoListContainer extends React.Component{
  constructor(props){
    super(props);
    this.clearAllTasks = this.clearAllTasks.bind(this);
    this.clearCompletedTasks = this.clearCompletedTasks.bind(this);
  }

  state = {
    tasks: [{taskname: "Create a todo list", completed: true}]
  };

  // This function when given a task creates a new array, adds that task to it and updates the state
  handleNewTaskAddition = task => {
    // When a new task is added, it is set to not completed by default
    const newTask = {taskname: task, completed: false};
    this.setState({ tasks: [...this.state.tasks, newTask]});
  }

  // Mark a task as completed, or unmark as completed.
  completeTask = (index) => {
    // Create a copy of the tasks list
    const copyState = [...this.state.tasks];

    //Toggle the task completion
    copyState[index].completed = !copyState[index].completed;

    this.setState({ tasks: copyState });
  } 

  // Remove tasks from the task list that are in the completed state
  clearCompletedTasks() {
    const newState = [...this.state.tasks];
    for (var i = 0; i < newState.length; i++){
      if (newState[i].completed === true){
        newState.splice(i, 1);
        // After the array is spliced, reduce the iterator to catch the next element in array
        i--;
      }
    }

    this.setState({tasks: newState});
  }


  clearAllTasks() {
    const emptyList = [];
    this.setState({ tasks: emptyList });
  }

  render(){
    return(
      <div className = "todolistcontainer">
        <div className = "pattern">
          <div id="content">
            <Header />
            <div className='action-buttons-container'>
              <ActionButtion name="Clear Checked" submitHandle={this.clearCompletedTasks}/>
              <ActionButtion name="Clear All" submitHandle={this.clearAllTasks}/>
            </div>
            <ToDoList tasks={this.state.tasks} completeHandler={this.completeTask} />
            <AddNewTaskForm onFormSubmit={this.handleNewTaskAddition} />
          </div>
        </div>
      </div>
    );
  }
}

// Header object that outputs the number of tasks that the user has on their list...
const Header = (props) => {
  return(
    <div className='heading-container'>
      <h1 className="to-do-list-heading">TO DO LIST</h1>
    </div>
  );
}

// Action buttons that will be used to complete given actions on the list..
const ActionButtion = (props) => {
  return (
    <button className="action-btn" onClick={props.submitHandle}>{props.name}</button>
  );
}


// List item that outputs the list of to do items..
const ToDoList = (props) => {
  const todoItems = props.tasks.map((todoTask, index) => {
    return <ToDoTask content={todoTask.taskname} key={index} id={index} completed={todoTask.completed} completeHandler={props.completeHandler} />
  });
  
  return (
    <div className = "todo-list-wrapper">
      {todoItems}
    </div>
  )
}

// ToDo task for each item on the task list
class ToDoTask extends React.Component {
  render() {
    // If the task is completed, add the "completed" class to the task-item
    return(
      <div className={`todo-task-item ${this.props.completed ? "completed" : ""}`}>
        <button 
          className="complete-box" 
          onClick={() => {this.props.completeHandler(this.props.id)} }
        >
          <i className={`${this.props.completed ? "far fa-check-square" : "far fa-square"}`}></i>
        </button>
        <span className="task-content">{this.props.content}</span>
      </div>
    );
  }
}

class AddNewTaskForm extends React.Component {
  state = { taskToAdd: "" };

  // On submit, prevent page from reloading and then add the task, reset the input afterwards. 
  handleSubmit = (e) => {
    e.preventDefault();
    if (this.state.taskToAdd === '') return;
    this.props.onFormSubmit(this.state.taskToAdd);
    this.setState({ taskToAdd: '' });
  }

  render() {
    return(
      <div id = "new-task-form-container">
        <form onSubmit = {this.handleSubmit}>
          <button className="button"><i className="fas fa-plus"></i></button>
          <input
            type = 'text'
            className = 'input'
            placeholder = 'Add New Task'
            value={this.state.taskToAdd}
            onChange={(e) => this.setState({ taskToAdd: e.target.value})}
            />

        </form>
      </div>
    );
  }
}

function App() {
  return (
    <div className="App">
      <div className = "app-wrapper">
        <ToDoListContainer />
      </div>

    </div>
  );
}

export default App;

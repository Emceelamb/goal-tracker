import React, { Component } from "react";

class TodoItems extends Component {
  constructor(props){
    super(props);
    this.createTasks = this.createTasks.bind(this);
  }

  delete(key) {
    this.props.delete(key);
  }

  createTasks(item){
    return <li onClick={()=> this.delete(item.id)} key={item.id}> <b>{item.todo}</b> <br /> {item.goaltime} minutes </li>
  }

  render() {
    let todoEntries = this.props.entries;
    let listItems = todoEntries.map(this.createTasks);

    return (
      <ul className="theList">
        {listItems}
      </ul>
    )
  }
}

export default TodoItems;

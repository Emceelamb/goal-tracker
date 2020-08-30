import React, { Component } from "react";
import TodoItems from "./TodoItems";
import "./TodoList.css";

import axios from 'axios'

class TodoList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            items: []
        };

        this.addItem = this.addItem.bind(this);
        this.deleteItem = this.deleteItem.bind(this);
    }

  componentDidMount() {
    axios.get('/api')
      .then(res => {
        const items = res.data;
        this.setState({items})
        console.log(items)
        // todos.forEach((item)=>{
        //   this.setState((prevState)=>{
        //     return {
        //       items: prevState.items.concat(item)
        //     }
        //   })
        // })
      })
  }

    addItem(e){
        if (this._inputElement.value !== "") {
            let body = {
                todo: this._inputElement.value,
                goaltime: this._inputElement_time.value,
                key: Date.now(),
            };

          axios({
            method: 'post',
            url: '/api',
            data: {
              todo: this._inputElement.value,
              goal: this._inputElement_time.value,
            }
          });
            
            // axios.post('/api', {body})
            // .then(res =>{
            //   console.log(res);
            //   console.log(res.data)
            // })

            this.setState((prevState)=>{
                return {
                    items: prevState.items.concat(body)
                };
            });

            this._inputElement.value = "";
            this._inputElement_time.value = "";
        }

        console.log(this.state.items);
        e.preventDefault();
    }

    deleteItem(id){
        // let filteredItems = this.state.items.filter(function(item) {
        //     return(item.key !== key);
        // });
      let idkey = id

      axios.delete(`/api/${idkey}`)
      axios.get('/api')
        .then(res => {
          const items = res.data;
          // this.setState({items})
          this.setState(()=>{
              return {
                  items: (items)
              };
          });
          console.log(items)
        })
      }

    render() {
        return (
            <div className="todoListMain">
                <div className="header">
                    <form onSubmit={this.addItem}>
                        <input ref={(a)=>this._inputElement = a}
                        placeholder="enter task">
                        </input>
                        <input ref={(a)=>this._inputElement_time = a}
                        placeholder="enter time goal">
                        </input>
                        <button type="submit">add</button>
                    </form>
                </div>
                <TodoItems entries={this.state.items}
                delete={this.deleteItem}/>
            </div>
        );
    }
}

export default TodoList;

import React, { useState } from 'react';
import './ToDoList.css';
import DateTimePicker from 'react-datetime-picker';
import Countdown from 'react-countdown';

export class InputTask extends React.Component {

    
    constructor(props) {
        super(props);
        this.state = { items: [] };
        this.deleteItem = this.deleteItem.bind(this);
        this.enterTask = this.enterTask.bind(this);
    }

    deleteItem(key) {
        var filteredItems = this.state.items.filter(function(item) {
            return (item.key !== key);
        });
        this.setState({
            items: filteredItems
        });
    }

    enterTask(task) {
        this.setState((prevState) => {
            return {
                items: prevState.items.concat(task)
            };
        });
        console.log(this.state.items);
    }
    

    render() {
        return (
            <div className="inputMain">
                <div className="inputButton">
                    <InputBar enterTask={this.enterTask} />
                </div>
                <div className="todoList">
                    Today
                    <ToDoList entries={this.state.items} delete={this.deleteItem}/>
                </div>
            </div>
        )
    }
}


export class ToDoList extends React.Component {
    constructor(props) {
        super(props);
        this.createTasks = this.createTasks.bind(this);
    }

    delete(key) {
        this.props.delete(key);
    }

    createTasks(item) {
        return <li onClick={() => this.delete(item.key)} key={item.key} className={false ? "redTask" : "normalTask"}>
            {item.taskName} {item.timeLeft}
            </li>
    }

    render() {
        var todoEntries = this.props.entries;
        var listItems = todoEntries.map(this.createTasks);
        if (listItems.length !== 0) {
            return (
                <ul className="theList">
                    {listItems}
                </ul>
            );
        } else {
            return (
                <ul className="theList">
                    Nothing 😎
                </ul>
            )
        }
    }
}


class InputBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            taskName:"",
            timeLeft:"",
            key:""
        };
        this.handleTaskName = this.handleTaskName.bind(this);
        this.handleTimeChange = this.handleTimeChange.bind(this);
        this.addItem = this.addItem.bind(this);
    }

    handleTaskName(event) {
        this.setState({
            "taskName" : [event.target.value]
        });
    }

    handleTimeChange(event) {
        const num = Number(event.target.value) * 1000;
        console.log(num);
        this.setState({
            "timeLeft" : <Countdown date={Date.now() + num} />
        })
    }

    addItem() {
        if (this.state.taskName != "") {
            this.state.key = Date.now();
            console.log(this.state);
            this.props.enterTask(this.state);
        }
    }

    render() {
        return (
            <div>
                <button onClick={this.addItem} className="button" type="submit">
                    Enter a New Task! 📝
                </button>
                <input className="inputBar" placeholder="Task Name" name="taskName" onChange={this.handleTaskName}>
                </input>
                <input className="timeLeft" placeholder="Time Left" name="timeLeft" onChange={this.handleTimeChange}>
                </input>
            </div>
        )
    }
}
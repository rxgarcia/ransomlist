import React, { useState } from 'react';
import './ToDoList.css';
import DateTimePicker from 'react-datetime-picker';
import Countdown from 'react-countdown';

export class InputTask extends React.Component {

    
    constructor(props) {
        super(props);
        this.state = { items: [] };
        this.addItem = this.addItem.bind(this);
        this.deleteItem = this.deleteItem.bind(this);
    }

    addItem(e) {
        if (this._inputElement.value !== "") {
            var newItem = {
                text: this._inputElement.value,
                key: Date.now(),
                countdown: <Countdown date={Date.now() + 200000} />
            };
            console.log("here: " + newItem.countdown);
            this.setState((prevState) => {
                return {
                    items: prevState.items.concat(newItem)
                };
            });
            this._inputElement.value = "";
        }
        console.log(this.state.items);
        e.preventDefault();
    }

    deleteItem(key) {
        var filteredItems = this.state.items.filter(function(item) {
            return (item.key !== key);
        });
        this.setState({
            items: filteredItems
        });
    }

    render() {
        return (
            <div className="inputMain">
                <div className="inputButton">
                    <button onClick={this.addItem} className="button" type="submit">
                        Enter a New Task! 📝
                    </button>
                    <input className="inputBar" placeholder="Here" ref={ (a) => this._inputElement = a}>
                    </input>
                    <DateTimePicker
                        className ="dateTime"
                        returnValue="end"/>
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
            {item.text} {item.countdown}
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
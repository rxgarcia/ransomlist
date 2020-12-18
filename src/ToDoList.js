import React from 'react';
import './ToDoList.css';
import DateTimePicker from 'react-datetime-picker';

export class InputTask extends React.Component {
    constructor(props) {
        super(props);
        this.state = { items: [] };
        this.addItem = this.addItem.bind(this);
    }

    addItem(e) {
        if (this._inputElement.value !== "") {
            var newItem = {
                text: this._inputElement.value,
                key: Date.now()
            };
            this.state.items.push(newItem);
            this._inputElement.value = "";
            e.preventDefault();
        }
        console.log(this.state.items);
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
                    <DateTimePicker className ="dateTime" />
                </div>
                <div className="todoList">
                    <ToDoList entries={this.state.items} />
                </div>
            </div>
        )
    }
}


export class ToDoList extends React.Component {
    render() {
        return (
            <div className="listMain">
                    <h1 className="today">
                        Today
                    </h1>
            </div>
        )
    }
}
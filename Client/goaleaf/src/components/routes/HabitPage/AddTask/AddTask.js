import React, { Component } from 'react'
import './AddTask.scss'
import axios from 'axios';
import Popup from "reactjs-popup";
import M from "materialize-css";

class AddTask extends Component {

  state = {
    msg: null,
    task: null,
    taskPoints: 5,
    frequency: "Once",
    days: 1,
    disableBtn: false
  }

    addTask = (e, id) => {
        this.handleDisableBtn();
        e.preventDefault();
        if (this.state.task !== null && (this.state.taskPoints > 0 && this.state.taskPoints < 11)){
            axios.post('https://glf-api.herokuapp.com/api/tasks/add', {
                "description": this.state.task,
                "frequency": this.state.frequency,
                "daysInterval": this.state.days,
                "habitID": id,
                "points": this.state.taskPoints,
                "token": localStorage.getItem("token")
            })
            .then(res => {
                window.location.reload();
            }
            ).catch(err => {
                this.setState({disableBtn: false});
            })
        }   
    }

    addTaskPoint = e => {
        e.preventDefault();
        if(parseInt(this.state.taskPoints) < 10) {
            this.setState({taskPoints: parseInt(this.state.taskPoints) + 1})
        }
    }
    subtractTaskPoint = e => {
        e.preventDefault();
        if(parseInt(this.state.taskPoints) > 1) {
            this.setState({taskPoints: parseInt(this.state.taskPoints) - 1})
        }
    }

    addTaskDays = e => {
        e.preventDefault();
        if(this.state.days < 30) {
            this.setState({days: this.state.days + 1})
        }
    }
    subtractTaskDays = e => {
        e.preventDefault();
        if(this.state.days > 1) {
            this.setState({days: this.state.days - 1})
        }
    }

    handleChange = e => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }
    
    clearMsg = () => {
        this.setState({
            msg: null
        })
    }

    handleDisableBtn = () => {
        this.setState({disableBtn: true});
    }

    componentDidMount() {
        M.AutoInit();
    }


    setOnceTrue = e => {
        this.setState({
            frequency: "Once"
        })
    }

    setOnceFalse = e => {
        this.setState({
            frequency: "Daily"
        })
    }

    setOnce4All = e => {
        this.setState({
            frequency: "Once4All"
        })
    }

    render() {
    
    let customRecurrence;
    if(this.state.frequency === 'Daily') {
        customRecurrence = <div>
                               <div>
                                   <button className="task-points-btn task-points-btn-subtract" onClick={ this.subtractTaskDays }>-</button>
                                   <span className="task-points">every { this.state.days } {this.state.days === 1 ? 'day' : 'days'}</span>
                                   <button className="task-points-btn task-points-btn-add" onClick={ this.addTaskDays }>+</button>
                               </div>
                           </div>
    }


    let addTaskBtn;
    if(this.props.isAdmin){
        addTaskBtn = (this.props.isFinished || this.props.pointsToWin === 0) ? <button className="btn waves-effect waves-light add-task-btn habit-page-navigation-btn" disabled><span role="img" aria-label="icon">🔥 New Task</span></button> : <button className="btn waves-effect waves-light add-task-btn habit-page-navigation-btn"><span role="img" aria-label="icon">🔥 New Task</span></button>
    }
    return (
        <Popup trigger={addTaskBtn} modal closeOnDocumentClick
            onOpen={ this.clearMsg }
            contentStyle={{
                maxWidth: '80%',
                width: '500px',
                backgroundColor: '#f2f2f2',
                borderRadius: '30px',
                border: "none"
            }}
            overlayStyle={{
                background: "rgb(0,0,0, 0.4)"
            }}
        >
        <div className="add-task-box">
        <div className="row">
            <form className="col s10 offset-s1  l8 offset-l2 center-align" autoComplete="off">
                <h4 className="">New Task</h4>
                <div className="input-field inline task-recurrence-con">
                    <input id="task" style={{marginBottom: '30px'}} maxLength="60" type="text" placeholder="task description" onChange={ this.handleChange } />
                    <span className="set-recurrence-title">Set points</span>
                    <div style={{display: 'flex', justifyContent: 'center'}}>
                        <button className="task-points-btn task-points-btn-subtract" onClick={ this.subtractTaskPoint }>-</button>
                        <input disabled title="Set task points between 1 and 10" id="taskPoints" maxLength="2" style={{width: '30px', textDecoration: 'none', textAlign: 'center' }} className="task-points" value={this.state.taskPoints} onChange={(e) => {this.handleChange(e)}}/>
                        <button className="task-points-btn task-points-btn-add" onClick={ this.addTaskPoint }>+</button>
                    </div>
                    <span className={this.state.msg === 'Task added' ? "helper-text green-text" : "helper-text red-text "}>{this.state.msg}</span>
                </div>
                <div className="input-field inline task-recurrence-con">
                    <span className="set-recurrence-title">Set recurrence</span>
                    <div>
                        <div>
                            <button type="button" className={this.state.frequency === 'Once' ? 'new-task-recurrence-active' : 'new-task-recurrence-inactive'} title={"Only one person can complete this task, so you gotta be quick"} onClick={this.setOnceTrue}>once for all users</button>
                            <button type="button" className={this.state.frequency === 'Once4All' ? 'new-task-recurrence-active' : 'new-task-recurrence-inactive'} title={"You can complete this task only once"} onClick={this.setOnce4All}>once for each user</button>
                            <button type="button" className={this.state.frequency === 'Daily' ? 'new-task-recurrence-active' : 'new-task-recurrence-inactive'} title={"You can specify the recurrence of this task"} onClick={this.setOnceFalse}>custom</button>
                        </div>
                        {customRecurrence}
                    </div>
                </div>
                <button className={this.state.disableBtn ? "btn disable-btn" : "btn"} onClick={(e) => this.addTask(e, this.props.habitID)} type="submit">submit
                </button>
            </form>
            </div>
        </div>
    </Popup>
    )
  } 
}

export default AddTask;
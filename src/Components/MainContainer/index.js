import {Component} from 'react'

import {v4 as uuidv4} from 'uuid'

import './index.css'

const tagsList = [
  {
    optionId: 'HEALTH',
    displayText: 'Health',
  },
  {
    optionId: 'EDUCATION',
    displayText: 'Education',
  },
  {
    optionId: 'ENTERTAINMENT',
    displayText: 'Entertainment',
  },
  {
    optionId: 'SPORTS',
    displayText: 'Sports',
  },
  {
    optionId: 'TRAVEL',
    displayText: 'Travel',
  },
  {
    optionId: 'OTHERS',
    displayText: 'Others',
  },
]

export default class MainContainer extends Component {
  state = {
    inputValue: '',
    activeOptionId: tagsList[0].optionId,
    tasksList: [],
    activeTag: '',
  }

  onChangeTextInput = event => {
    this.setState({
      inputValue: event.target.value,
    })
  }

  onChangeActiveOptionId = event => {
    this.setState({
      activeOptionId: event.target.value,
    })
  }

  tagButtonClicked = displayText => {
    this.setState(prevState => ({
      activeTag: prevState.activeTag === displayText ? '' : displayText,
    }))
  }

  addNewTask = event => {
    event.preventDefault()
    const {inputValue, activeOptionId, tasksList} = this.state

    const object = tagsList.find(item => item.optionId === activeOptionId)

    const newTask = {
      id: uuidv4(),
      value: inputValue,
      activeOption: object.displayText,
    }
    this.setState({
      tasksList: [...tasksList, newTask],
      inputValue: '',
      activeOptionId: tagsList[0].optionId,
    })
  }

  render() {
    const {inputValue, activeOptionId, tasksList, activeTag} = this.state

    const filterTaskList =
      activeTag === ''
        ? tasksList
        : tasksList.filter(each => each.activeOption === activeTag)

    return (
      <div className="bg-container">
        <div className="left-container">
          <h1 className="heading">Create a task!</h1>
          <form onSubmit={this.addNewTask} className="form-container">
            <div className="input-label-container">
              <label className="label-text" htmlFor="task">
                Task
              </label>
              <input
                onChange={this.onChangeTextInput}
                value={inputValue}
                className="input-element"
                id="task"
                type="text"
                placeholder="Enter the task here"
              />
            </div>
            <div className="input-label-container">
              <label className="label-text" htmlFor="tag">
                Tags
              </label>
              <select
                onChange={this.onChangeActiveOptionId}
                value={activeOptionId}
                className="input-element"
              >
                {tagsList.map(item => (
                  <option value={item.optionId} key={item.optionId}>
                    {item.displayText}
                  </option>
                ))}
              </select>
            </div>
            <button className="add-button" type="submit">
              Add Task
            </button>
          </form>
        </div>
        <div className="right-container">
          <h1>Tags</h1>
          <ul className="buttons-list">
            {tagsList.map(item => {
              const btnStyle =
                activeTag === item.displayText ? 'btn-style' : 'empty-style'
              return (
                <li className={`button-item ${btnStyle}`}>
                  <button
                    onClick={() => {
                      this.tagButtonClicked(item.displayText)
                    }}
                    className="tag-btn"
                    type="button"
                  >
                    {item.displayText}
                  </button>
                </li>
              )
            })}
          </ul>
          <h1>Tasks</h1>
          <ul className="tasks-list">
            {tasksList.length === 0 ? (
              <p>No Tasks Added Yet</p>
            ) : (
              filterTaskList.map(item => (
                <li className="task-item-container">
                  <p className="input-para">{item.value}</p>
                  <p className="btn-style-for-item">{item.activeOption}</p>
                </li>
              ))
            )}
          </ul>
        </div>
      </div>
    )
  }
}

import React, {Component} from "react"
import withStyles from "isomorphic-style-loader/lib/withStyles"
import c from "classnames"
import {connect} from "react-redux"

import Button from "./Button"

import s from "./ChatInterface/ChatInterface.scss"

import {ChatBubble, ChatContent, ChatCustom} from "./ChatInterface"

import {reload, onTextInputChange, onTextInputSubmit, handleChoiceSelection} from "../actions/chat"

const mapStateToProps = (state, props) => ({
  user: state.user,
  stage: props.stage,
  notify: state.chat.notify || "",
  backlog: state.chat.backlog || [],
  choices: state.chat.choices || [],
  showChoice: state.chat.showChoice || false,
  isTyping: state.chat.isTyping || {},
  fields: state.chat.fields || {}
})

const mergeProps = (state, {dispatch}, props) => ({
  ...props,
  ...state,
  path: state.user.hasOwnProperty("_id") ?
    Object.keys(props.stage)[0] : "init/unauthenticated",
  dispatch: action => dispatch(action),
  onTextInputChange: (event, field) => dispatch(onTextInputChange(event, field)),
  onTextInputKeyPress: (e, index, field) => {
    if (e.key === "Enter")
      dispatch(onTextInputSubmit(index, field))
  },
  onChoiceSelected: input => dispatch(handleChoiceSelection(input)),
  reload: (path = Object.keys(props.stage)[0], stage = props.stage) => {
    dispatch(reload(
      path,
      state.user.hasOwnProperty("_id"),
      stage
    ))
  }
})

@connect(mapStateToProps, null, mergeProps)
@withStyles(s)
export default class ChatStage extends Component {

  componentDidMount = () => {
    if (this.props.backlog.length === 0)
      this.props.reload()
  }

  render = () => (
    <div className={c(s.chat, s.chatAvatarEnabled)}>
      <ol className={s.chatList}>
        {this.props.notify && (
          <div
            className={s.notify}
            dangerouslySetInnerHTML={{__html: this.props.notify}}
          />
        )}
        <Button
          className={c(s.chatBubble, s.chatBubbleResponse, s.fixedTop)}
          onClick={() => this.props.reload()}
        >
          Start Over! 😖
        </Button>
        {
          this.props.backlog ? this.props.backlog.map((chat, index) => {
            const user = this.props.users[chat.user] || {client: 0}
            const iCF = (!user.client && chat.showAvatar)
            return (
              <li key={index} className={c(s.chatListItem, iCF && s.chatListItemNew)}>
                {iCF && (
                  <div>
                    <img className={s.chatAvatar} src={user.avatar} alt={user.name} />
                    <span className={s.chatListItemAuthor}>{user.name}</span>
                  </div>
                )}
                {chat.type === "custom" ? (
                  <ChatCustom data={chat.payload} dispatch={this.props.dispatch} />
                ) : (
                  <ChatBubble
                    self={user.client}
                    typing={this.props.isTyping[index]}
                    type={chat.type}
                  >
                    <ChatContent src={chat} />
                  </ChatBubble>
                )}
              </li>
            )
          }) : null
        }
      </ol>
      <div className={s.chatResponses}>
        {
          (this.props.choices && this.props.showChoice) ? this.props.choices.map((choice, i) => {
            if (choice.field) {
              return (
                <div key={i} className={c(s.chatBubble, s.chatBubbleResponse, s.chatResponse)}>
                  <input
                    type={choice.fieldType || "text"}
                    onChange={e => this.props.onTextInputChange(e, choice.field)}
                    onKeyPress={e => this.props.onTextInputKeyPress(e, i, choice.field)}
                    placeholder={choice.text}
                    value={this.props.fields[choice.field]}
                    className={s.chatTextInput}
                    autoFocus
                  />
                </div>
              )
            }
            return (
              <Button
                key={i}
                className={c(s.chatBubble, s.chatBubbleResponse)}
                dangerouslySetInnerHTML={{__html: choice.text}}
                onClick={() => this.props.onChoiceSelected(i)}
              />
            )
          }) : null
        }
      </div>
    </div>
  )

}

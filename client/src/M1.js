import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import {
  handleInput,
  connectToChatkit,
  connectToRoom,
  sendMessage,
  sendDM
} from "./methods";
import Dialog from "./message/Dialog";
import RoomList from "./message/RoomList";
import ChatSession from "./message/ChatSession";
import RoomUsers from "./message/RoomUsers";
import { getCurrentProfile } from "./actions/profile";

import "./App1.css";

class M1 extends Component {
  constructor() {
    super();
    this.state = {
      userId: "",
      showLogin: true,
      isLoading: false,
      currentUser: null,
      currentRoom: null,
      rooms: [],
      roomUsers: [],
      roomName: null,
      messages: [],
      newMessage: ""
    };

    this.handleInput = handleInput.bind(this);
    this.connectToChatkit = connectToChatkit.bind(this);
    this.connectToRoom = connectToRoom.bind(this);
    this.sendMessage = sendMessage.bind(this);
    this.sendDM = sendDM.bind(this);
  }

  render() {
    const {
      userId,
      showLogin,
      rooms,
      currentRoom,
      currentUser,
      messages,
      newMessage,
      roomUsers,
      roomName
    } = this.state;

    return (
      <div className='App'>
        <aside className='sidebar left-sidebar'>
          {currentUser ? (
            <div className='user-profile'>
              <span className='username'>{currentUser.name}</span>
              <span className='user-id'>{`@${currentUser.id}`}</span>
            </div>
          ) : null}
          {currentRoom ? (
            <RoomList
              rooms={rooms}
              currentRoom={currentRoom}
              connectToRoom={this.connectToRoom}
              currentUser={currentUser}
            />
          ) : null}
        </aside>
        <section className='chat-screen'>
          <header className='chat-header'>
            {currentRoom ? <h3>{roomName}</h3> : null}
          </header>
          <ul className='chat-messages'>
            <ChatSession messages={messages} />
          </ul>
          <footer className='chat-footer'>
            <form onSubmit={this.sendMessage} className='message-form'>
              <input
                type='text'
                value={newMessage}
                name='newMessage'
                className='message-input'
                placeholder='Type your message'
                onChange={this.handleInput}
                autoComplete='off'
              />
            </form>
          </footer>
        </section>
        <aside className='sidebar right-sidebar'>
          {currentRoom ? (
            <RoomUsers
              currentUser={currentUser}
              sendDM={this.sendDM}
              roomUsers={roomUsers}
            />
          ) : null}
        </aside>
        {showLogin ? (
          <Dialog
            userId={userId}
            handleInput={this.handleInput}
            connectToChatkit={this.connectToChatkit}
          />
        ) : null}
      </div>
    );
  }
}

M1.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  profile: state.profile
});

export default connect(mapStateToProps, { getCurrentProfile })(M1);

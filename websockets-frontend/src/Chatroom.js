import React from 'react'
import Cable from 'actioncable'

export default class Chatroom extends React.Component {
  state = {
    input: '',
    submitted: false,
    roomsMessages:  []
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]:event.target.value
    }, ()=>console.log(this.state))
  }

  handleSendEvent = (event) => {
    event.preventDefault()
    this.chats.create(this.state.input)
    this.setState({
            input: ''
    })
  }

  createSocket = () => {
    let cable = Cable.createConsumer('ws://localhost:3000/cable')
    this.chats = cable.subscriptions.create({
      channel: 'MessagesChannel',
    }, {
      connected: () => {},
      received: (data)  => {
        let roomsMessages = this.state.roomsMessages
        roomsMessages.push(data)
        this.setState({roomsMessages: roomsMessages})
        console.log(data)
      },

      create: function(chatContent){
        this.perform('create', {
          content: chatContent,
          user_id: localStorage.getItem('user_id'),
          chatroom_id: localStorage.getItem('chatroom_id')
        });
      }
    });
  }

  componentWillMount = () => {
    this.createSocket()
  }
  render(){
    return(
      <div>
        <form onSubmit={this.handleSendEvent}>
          <input
            name='message_body'
            onChange = {this.handleChange}
          />
          <button type='submit' />
        </form>

      </div>
    )
  }
}

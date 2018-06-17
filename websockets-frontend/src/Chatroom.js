import React from 'react'
import Cable from 'action-cable-react'

class Chatroom extends React.Component {
  state = {
    message_body = '',
    submitted = false,
    roomsMessages = []
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]:event.target.value
    }, ()=>console.log(this.state))
  }

  handleSubmit = (event) => {
    event.preventDefault()
    this.setState(
      submitted: true
    })
  }

  createSocket = () => {
    let cable = Cable.createConsumer('ws://localhost:3000/cable')
    this.chats = cable.subscriptions.create({
      channel: 'MessagesChannel',{}
    }, {
      connected: () => {},
      received: (data)  => {
        let roomsMessages = this.state.roomsMessages
        roomsMessages.push(data)
        this.setState({roomsMessages: roomsMessages})
      },

      create: function(chatContent){
        this.perform('create', {
          content: chatContent,
          user_id: localStorage.getItem('user_id'),
          chatroom_id: localStorage.getItem('chatroom_id')
        })
      }
    })
  }

  render(){
    return(
      <div>
        <form onSubmit={this.handleSubmit}> </form>
        <TextField
          name='message_body'
          onChange = {this.handleChange}
        />
      </div>
    )
  }
}

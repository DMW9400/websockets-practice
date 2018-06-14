import React from 'react'

class Chatroom extends React.Component {
  state = {
    message_body = '',
    submitted = false
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]:event.target.value
    }, ()=>console.log(this.state))
  }

  handleSubmit = (event) => {
    event.preventDefault()
    this.setState({
      submitted: true
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

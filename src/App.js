import './App.css';
import React from 'react'
import Login from './components/Login'

class App extends React.Component {
  constructor() {
    super()
    this.state ={
      currentUser: null,
      loginForm: {
        email: "",
        password: ""
      }
    }
  }

  handleLoginFormChange = event => {
    const { name, value } = event.target
    this.setState({
      loginForm: {
        ...this.state.loginForm,
        [name]: value
      }
    })
  }

  handleLoginFormSubmit = event =>{
    event.preventDefault()
    // now I need to submit info from the form to the backend
    // where I will authanticate user and if valid send the user back
    // with that response set my state
    const userInfo = this.state.loginForm
    const headers = {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        user: userInfo
      })
    }
    fetch("http://127.0.0.1:3001/login", headers)
    .then(r => r.json())
    .then(resp => {
      if(resp.error) {
        alert("Invalid credentials")
      } else {
        console.log(resp)
        this.setState({
          currentUser: resp
          
        })
      }
    })
    .catch(console.log)
  }

  render() {
    const { currentUser } = this.state
    return (
      <div className="App">
          <h3>{ currentUser ? `Logged in as ${currentUser.name}` : "Not logged in"}</h3>
          <Login
            handleLoginFormChange={this.handleLoginFormChange}
            handleLoginFormSubmit={this.handleLoginFormSubmit}
            email={this.state.loginForm.email}
            password={this.state.loginForm.password}
          />
      </div>
    );
  }
}

export default App;

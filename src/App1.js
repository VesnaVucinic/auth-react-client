import './App.css';
import React from 'react'
import Login from './components/Login'
import Secrets from './components/Secrets'
import Logout from './components/Logout'

class App extends React.Component {
  constructor() {
    super()
    this.state ={
      currentUser: null,
      loginForm: {
        email: "",
        password: ""
      },
      secrets: []
    }
  }

  // // lifecycle method within react component relates to refreshing a page
  // componentDidMount() {
  //   // first I need to get token from locale storage
  //   const token = localStorage.getItem("token")
  //   if (token) {
  //     fetch("http://localhost:3001/get_current_user", {
  //       headers: {
  //         // I need authorization key of token
  //         "Authorization": token
  //       }
  //     })
  //     .then(r => r.json())
  //     .then(resp => {
  //       if (resp.error) {
  //         alert(resp.error)
  //       } else {
  //         this.setState({
  //           currentUser: resp.user
  //         })
  //       }
  //     })
  //     .catch(console.log)
  //   }
  // }

  componentDidMount() {
    const token = localStorage.getItem("token")
    if (token) {
      fetch("http://localhost:3001/get_current_user", {
        headers: {
          "Authorization": token
        }
      })
      .then(r => r.json())
      .then(resp => {
        if (resp.error) {
          alert(resp.error)
        } else {
          this.setState({
            currentUser: resp.user
          })
        }
      })
      .catch(console.log)
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
          currentUser: resp,
          loginForm: {
            email: "",
            password: ""
          }
        })
        localStorage.setItem('token', resp.jwt)
      }
    })
    .catch(console.log)
  }

  getSecrets= () => {
    const token = localStorage.getItem("token")
    fetch("http://127.0.0.1:3001/secrets", {
      headers: {
        "Authorization": token
      }
    })
      .then(r => r.json())
      .then(secrets => {
        if (secrets.error) {
          alert("Not authorized for those secrets")
        } else {
          // when we fetch secrets we want to:
          // in React we want to couse a change of our state with setState,
          // in Redux we fire action that triggers reducers and trigger a change of state
          this.setState({
            // I replace existing arrey of secrets with tis response which is also called secrets
            secrets
            // secrets: secrets
          })
        }
      })
      .catch(console.log)
  }

  logout = event => {
    event.preventDefault()
    localStorage.removeItem("token")
    this.setState({
      currentUser: null,
      secrets: []
    })
  }

  render() {
    const { currentUser } = this.state
    return (
    <div className="App">
      <h2>{ currentUser ?
        `Logged in as ${currentUser.name}` :
        "Not logged in"
       }</h2>


      {
        this.state.currentUser ?
          <Logout logout={this.logout}/> :
          <Login
            handleLoginFormChange={this.handleLoginFormChange}
            handleLoginFormSubmit={this.handleLoginFormSubmit}
            email={this.state.loginForm.email}
            password={this.state.loginForm.password}
          />
      }
      <button onClick={this.getSecrets}>Show User's Secrets</button>
      <Secrets secrets={this.state.secrets}/>
    </div>
    )
  }
}

export default App;

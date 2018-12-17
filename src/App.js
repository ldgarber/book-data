import React, { Component } from 'react';
import { Jumbotron, Container } from 'reactstrap';
import QueryString from 'querystring'; 
import GoodReads from "./components/Goodreads"; 

const LoginWindow = (props) => {
  return (
    <Jumbotron>
      <Container>
        <h1 className="display-3">Goodreads browser</h1>
        <p className="lead">This is an example of how to do something amazing</p>
        <p><a className="btn btn-primary" href={process.env.REACT_APP_BASE_URL + "/auth"}>Connect</a></p>
      </Container>
    </Jumbotron>
  )
}

class App extends Component {
  state = { user_id: null } 

  componentDidMount() {
    const values = QueryString.parse(window.location.search.slice(1)) 

    if ( values.user_id !== undefined ) {
      this.setState({ user_id: values.user_id })
    } else {
      console.log("no token")
    } 
  } 
  render() {
    if( this.state.user_id ) {
      return <GoodReads user_id={this.state.user_id} />
    } else {
      return (
        <LoginWindow/>
      );
    } 
  }
}

export default App;


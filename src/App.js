import React, { Component } from 'react';
import { Jumbotron, Container } from 'reactstrap';


const LoginWindow = (props) => {
  return (
    <Jumbotron>
      <Container>
        <h1 className="display-3">Unsplash browser</h1>
        <p className="lead">This is an example of how to do something amazing</p>
        <p><a className="btn btn-primary" href={process.env.REACT_APP_BASE_URL + "/auth"}>Connect</a></p>
      </Container>
    </Jumbotron>
  )
}

class App extends Component {
  render() {
    return (
      <LoginWindow/>
    );
  }
}

export default App;


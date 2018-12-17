import React from 'react';
import { Container, Progress } from 'reactstrap'; 

const Loading = () => {
  return (
    <Container>
      <h1>Fetching from Goodreads</h1>
      <Progress animated color="primary" value={100}/>
    </Container>
  )
}

const Profile = ({user}) => {
  return (
    <Container>
      <h1>Hello {user.name}!</h1>
    </Container>
  )
}

export default class Goodreads extends React.Component {
  state = {loading: true}

  componentDidMount() {
    const {auth} = this.props;

    this.setState( {loading: false, user: {name: 'test'}})
  }
  render() {
    if( this.state.loading ) {
      return (<Loading/>)
    } else if ( this.state.user ) {
      return (<Profile user={this.state.user}/>)
    } else {
      return (<p>Horrible error</p>)
    }
  }
}


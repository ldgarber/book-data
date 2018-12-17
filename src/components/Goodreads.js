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
      <h1>Hello {user}!</h1>
    </Container>
  )
}

export default class Goodreads extends React.Component {
  state = {loading: true}

  componentDidMount() {
    const {user_id} = this.props;
    console.log(user_id)

    this.setState( {loading: false, user_id: user_id})
  }
  render() {
    if( this.state.loading ) {
      return (<Loading/>)
    } else if ( this.state.user_id ) {
      return (<Profile user={this.state.user_id}/>)
    } else {
      return (<p>Horrible error</p>)
    }
  }
}


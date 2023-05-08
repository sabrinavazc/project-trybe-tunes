import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import { getUser } from '../services/userAPI';

class Profile extends Component {
  state = {
    name: '',
    email: '',
    image: '',
    description: '',
  };

  componentDidMount() {
    this.handleUser();
  }

  handleUser = async () => {
    const { name, email, image, description } = await getUser();
    this.setState({ name, email, image, description });
  };

  render() {
    const { name, email, image, description } = this.state;
    return (
      <div data-testid="page-profile">
        <Header />
        {/* Profile */}
        <h4>{ name }</h4>
        <p>{ email }</p>
        <img data-testid="profile-image" src={ image } alt={ name } />
        <p>{ description }</p>
        <Link to="/profile/edit">Editar perfil</Link>
      </div>
    );
  }
}

export default Profile;

import React from 'react';
import { Link } from 'react-router-dom/cjs/react-router-dom';
import Loading from './Loading';
import { getUser } from '../services/userAPI';

export default class Header extends React.Component {
  state = {
    userHeader: <Loading />,
  };

  componentDidMount() {
    this.handleFetchUser();
  }

  handleFetchUser = async () => {
    const user = await getUser();
    const userHeader = <p data-testid="header-user-name">{user.name}</p>;
    this.setState({ userHeader });
  };

  render() {
    const { userHeader } = this.state;
    return (
      <header data-testid="header-component">
        {userHeader}
        <ul>
          <Link data-testid="link-to-search" to="/search"> Explorar </Link>
          <Link data-testid="link-to-favorites" to="/favorites"> Músicas Favoritas </Link>
          <Link data-testid="link-to-profile" to="/profile"> Seu Perfil </Link>
        </ul>
      </header>
    );
  }
}

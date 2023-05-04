import React from 'react';
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
      </header>
    );
  }
}

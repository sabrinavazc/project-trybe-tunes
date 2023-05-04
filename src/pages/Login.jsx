import React from 'react';
import PropTypes from 'prop-types';
import { createUser } from '../services/userAPI';

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: '',
    };
  }

  handleChange = (event) => {
    this.setState({ user: event.target.value });
  };

  render() {
    const { user } = this.state;
    const numberDisabled = 3;
    const isButtonDisabled = user.length < numberDisabled; // Verifica o comprimento do nome digitado
    const { history } = this.props;

    return (
      <div data-testid="page-login">
        <input
          data-testid="login-name-input"
          type="text"
          value={ user }
          onChange={ this.handleChange }
        />
        <button
          data-testid="login-submit-button"
          type="button"
          disabled={ isButtonDisabled }
          onClick={ async () => {
            history.push('/loading');
            await createUser({ name: user });
            history.push('/search');
          } }
        >
          Entrar
        </button>
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

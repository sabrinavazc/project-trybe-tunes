import PropTypes from 'prop-types';
import React from 'react';
import Header from '../components/Header';
import { getUser, updateUser } from '../services/userAPI';
import Loading from '../components/Loading';

export default class ProfileEdit extends React.Component {
  state = {
    name: '',
    email: '',
    image: '',
    description: '',
    loading: false,
    isDisabled: true,
  };

  componentDidMount() {
    this.handleUser();
  }

  handleUser = async () => {
    try {
      this.setState({ loading: true });
      const { name, email, image, description } = await getUser();

      this.setState({
        name,
        email,
        image,
        description,
        loading: false,
        isDisabled: !(name && image && email && description),
      });
    } catch (error) {
      console.error(error);
    }
  };

  handleOnChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value }, () => {
      const { name: usrName, image, email, description } = this.state;
      const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
      this.setState({
        isDisabled: !(
          usrName
          && image
          && email
          && description
          && isValidEmail
        ),
      });
    });
  };

  handleOnClick = async () => {
    const { history } = this.props;
    const { name, email, image, description } = this.state;
    const obj = { name, email, image, description };

    try {
      this.setState({ loading: true });
      await updateUser(obj);
      history.push('/profile');
    } catch (error) {
      console.error(error);
    } finally {
      this.setState({ loading: false });
    }
  };

  render() {
    const {
      name,
      email,
      image,
      description,
      loading,
      isDisabled,
    } = this.state;

    return (
      <div data-testid="page-profile-edit">
        <Header />
        {loading ? (
          <Loading />
        ) : (
          <form>
            <label htmlFor="name">
              Nome:
              <input
                data-testid="edit-input-name"
                id="name"
                name="name"
                type="text"
                value={ name }
                onChange={ this.handleOnChange }
              />
            </label>
            <label htmlFor="email">
              E-mail:
              <input
                data-testid="edit-input-email"
                id="email"
                name="email"
                type="email"
                value={ email }
                onChange={ this.handleOnChange }
              />
            </label>
            <label htmlFor="description">
              Descrição:
              <textarea
                data-testid="edit-input-description"
                id="description"
                name="description"
                type="text"
                value={ description }
                onChange={ this.handleOnChange }
              />
            </label>
            <label htmlFor="image">
              Foto:
              <input
                data-testid="edit-input-image"
                id="image"
                name="image"
                type="text"
                value={ image }
                onChange={ this.handleOnChange }
              />
            </label>
            <button
              type="button"
              data-testid="edit-button-save"
              onClick={ this.handleOnClick }
              disabled={ isDisabled }
            >
              Salvar
            </button>
          </form>
        )}
      </div>
    );
  }
}

ProfileEdit.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

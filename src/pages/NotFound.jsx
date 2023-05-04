import React from 'react';

export default class NotFound extends React.Component {
  render() {
    return (
      <div data-testid="page-not-found">
        <h1>404 - Página não encontrada</h1>
        <p>Desculpe, a página que você está procurando não existe.</p>
      </div>
    );
  }
}

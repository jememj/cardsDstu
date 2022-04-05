import React from 'react';
import { Switch, Route } from 'react-router-dom';
import styled, { createGlobalStyle } from 'styled-components';

import Header from './components/header/Header';
import Deck from './pages/Deck';
import Decks from './pages/Decks';
import Editor from './pages/Editor';
import Memo from './pages/Memo';
import Theme from './styles/Theme';

function App() {
  return (
    <Theme>
      <GlobalStyle />
      <Container>
        <Header />
        <Switch>
          <Route path="/" component={Decks} exact />
          <Route path="/Decks" component={Decks} exact />
          <Route path="/decks/:id" component={Deck} exact />
          <Route path="/editor/:id?" component={Editor} exact />
          <Route path="/memo/:mode/:id" component={Memo} exact />
        </Switch>
      </Container>
    </Theme>
  );
}

export default App;

const GlobalStyle = createGlobalStyle`
  body {
    color: ${(props) => props.theme.colors.text};
    font-family: ${(props) => props.theme.font};
    background: ${(props) => props.theme.colors.background};
    margin: 0;

  }
`;

const Container = styled.div`
  margin: 0 100px;
`;

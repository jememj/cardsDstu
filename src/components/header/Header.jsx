import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import ToggleTheme from 'react-toggle-theme';
import { useStoreon } from 'storeon/react';
import styled from 'styled-components';

const links = [
  { path: '/decks', name: 'Мои доски' },
  { path: '/editor', name: 'Редактор' },
];

export default function Header() {
  const [currentTheme, setCurrentTheme] = useState('light');
  const { dispatch, theme } = useStoreon('theme');

  const setTheme = (them) => {
    dispatch('theme/switch', { theme: them });
    setCurrentTheme(them);
  };

  useEffect(() => {
    setCurrentTheme(theme);
  }, [theme]);

  return (
    <HeaderWrapper>
      <NavWrapper>
        {links.map(({ path, name }) => (
          <Link key={name} to={path}>
            {name}
          </Link>
        ))}
      </NavWrapper>
      <Toggler>
        <ToggleTheme selectedTheme={currentTheme} onChange={setTheme} />
      </Toggler>
    </HeaderWrapper>
  );
}

const HeaderWrapper = styled.header`
  display: flex;
  justify-content: flex-start;
  padding: 25px 0;
`;
const NavWrapper = styled.nav`
  display: flex;
  max-width: 220px;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid grey;
`;

const Link = styled(NavLink)`
  font-family: ${(props) => props.theme.font};
  font-size: 20px;
  text-decoration: none;
  color: ${(props) => props.theme.colors.text};

  &.active {
    color: ${(props) => props.theme.colors.green};
  }
`;
const Toggler = styled.div`
  margin-left: 30px;
`;

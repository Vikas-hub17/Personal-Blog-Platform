import React, { ReactNode } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
`;

const Header = styled.header`
  text-align: center;
  margin-bottom: 20px;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  font-weight: bold;
  color: #333;
`;

const Main = styled.main`
  margin-top: 20px;
`;

const Layout: React.FC<{ children: ReactNode }> = ({ children }) => (
  <Container>
    <Header>
      <Title>Personal Blog Platform</Title>
    </Header>
    <Main>{children}</Main>
  </Container>
);

export default Layout;

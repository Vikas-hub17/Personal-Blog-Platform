import styled from 'styled-components';
import NavBar from './Navbar';

type LayoutProps = {
  children: React.ReactNode;
};

// Layout container
const LayoutWrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background: linear-gradient(to bottom, #f9f9f9, #eef2f7);
  animation: fadeIn 1s ease-in;

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

// Main content area with a soft card-like style
const Main = styled.main`
  flex: 1;
  padding: 30px;
  margin: 20px auto;
  max-width: 1200px;
  width: 90%;
  background: white;
  border-radius: 16px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.08);
  animation: slideUp 0.8s ease-out;

  @keyframes slideUp {
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

// Footer with a light background
const Footer = styled.footer`
  background: #f9f9f9;
  color: #666;
  padding: 15px 20px;
  text-align: center;
  font-size: 0.9rem;
  border-top: 1px solid #ddd;

  a {
    color: #00bcd4;
    text-decoration: none;
    font-weight: 500;
    transition: color 0.3s ease;

    &:hover {
      color: #4fc3f7;
    }
  }
`;

const Layout = ({ children }: LayoutProps) => {
  return (
    <LayoutWrapper>
        <NavBar />
      <Main>{children}</Main>
      <Footer>
        © {new Date().getFullYear()} Made with ❤️ by{' '}
        <a href="https://yourwebsite.com">Vikas</a>
      </Footer>
    </LayoutWrapper>
  );
};

export default Layout;

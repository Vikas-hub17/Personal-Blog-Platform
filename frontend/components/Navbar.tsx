import { useState } from 'react';
import Link from 'next/link';
import styled from 'styled-components';

// Wrapper for the NavBar with gradient background
const NavBarWrapper = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 30px;
  background: linear-gradient(90deg, #0d47a1, #42a5f5);
  color: white;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 10;
`;

// Logo styling with a professional font
const Logo = styled.div`
  font-size: 1.8rem;
  font-weight: 700;
  color: white;
  cursor: pointer;
  letter-spacing: 1px;
  transition: color 0.3s ease;

  &:hover {
    color: #80d8ff;
  }
`;

// Container for desktop navigation links
const LinksContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 30px;

  @media (max-width: 768px) {
    display: none;
  }
`;

// Styled NavLink with smooth hover animations
const NavLink = styled.a`
  color: white;
  font-size: 1.1rem;
  font-weight: 500;
  text-decoration: none;
  position: relative;
  padding: 8px 15px;
  transition: color 0.3s ease;

  &:hover {
    color: #80d8ff;
  }

  &:after {
    content: '';
    position: absolute;
    width: 100%;
    height: 2px;
    background: #80d8ff;
    bottom: -2px;
    left: 0;
    transform: scaleX(0);
    transition: transform 0.3s ease;
    transform-origin: bottom right;
  }

  &:hover::after {
    transform: scaleX(1);
    transform-origin: bottom left;
  }
`;

// Hamburger icon container for mobile devices
const Hamburger = styled.div`
  display: none;
  flex-direction: column;
  gap: 5px;
  cursor: pointer;

  @media (max-width: 768px) {
    display: flex;
  }
`;

// Style for hamburger lines with animation
const HamburgerLine = styled.div`
  width: 25px;
  height: 3px;
  background-color: white;
  border-radius: 3px;
  transition: transform 0.3s ease;

  &:nth-child(2) {
    width: 20px;
  }
`;

// Mobile menu with a sleek overlay
const MobileMenu = styled.div<{ isOpen: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.95);
  width: 100%;
  height: 100vh;
  justify-content: center;
  gap: 20px;
  transform: ${({ isOpen }) => (isOpen ? 'translateX(0)' : 'translateX(-100%)')};
  transition: transform 0.4s ease;
`;

// Close button for mobile menu
const CloseButton = styled.div`
  position: absolute;
  top: 15px;
  right: 15px;
  font-size: 1.5rem;
  color: white;
  cursor: pointer;

  &:hover {
    color: #80d8ff;
  }
`;

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <NavBarWrapper>
      <Logo>My Blog</Logo>

      {/* Desktop Navigation Links */}
      <LinksContainer>
        <Link href="/" passHref>
          <NavLink>Home</NavLink>
        </Link>
        <Link href="/login" passHref>
          <NavLink>Login</NavLink>
        </Link>
        <Link href="/signup" passHref>
          <NavLink>Sign Up</NavLink>
        </Link>
        <Link href="/dashboard" passHref>
          <NavLink>Dashboard</NavLink>
        </Link>
      </LinksContainer>

      {/* Hamburger Icon for Mobile */}
      <Hamburger onClick={toggleMenu}>
        <HamburgerLine />
        <HamburgerLine />
        <HamburgerLine />
      </Hamburger>

      {/* Mobile Navigation Menu */}
      <MobileMenu isOpen={isOpen}>
        <CloseButton onClick={toggleMenu}>&times;</CloseButton>
        <Link href="/" passHref>
          <NavLink>Home</NavLink>
        </Link>
        <Link href="/login" passHref>
          <NavLink>Login</NavLink>
        </Link>
        <Link href="/signup" passHref>
          <NavLink>Sign Up</NavLink>
        </Link>
        <Link href="/dashboard" passHref>
          <NavLink>Dashboard</NavLink>
        </Link>
      </MobileMenu>
    </NavBarWrapper>
  );
};

export default NavBar;

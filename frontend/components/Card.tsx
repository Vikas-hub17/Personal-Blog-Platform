import styled from 'styled-components';

type CardProps = {
  delay: string; // Delay prop type for animation
};

const Card = styled.div<CardProps>`
  background: #fff;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease, opacity 0.3s ease;
  opacity: 0;
  transform: translateY(20px);
  
  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
  }

  animation: fadeInUp 0.6s ease-out forwards;
  animation-delay: ${({ delay }) => delay};

  @keyframes fadeInUp {
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

export default Card;

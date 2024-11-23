import { useState } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background: #f8f9fa;
`;

const FormWrapper = styled.div`
  width: 100%;
  max-width: 400px;
  padding: 20px;
  border-radius: 8px;
  background: #fff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const Heading = styled.h2`
  font-size: 1.8rem;
  text-align: center;
  margin-bottom: 20px;
  color: #333;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 15px;
  border: 1px solid #ddd;
  border-radius: 5px;
`;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  border: none;
  border-radius: 5px;
  background: #007bff;
  color: #fff;
  font-size: 1rem;
  cursor: pointer;

  &:hover {
    background: #0056b3;
  }
`;

export default function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignup = async () => {
    // Signup logic
  };

  return (
    <Container>
      <FormWrapper>
        <Heading>Sign Up</Heading>
        <Input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button onClick={handleSignup}>Sign Up</Button>
      </FormWrapper>
    </Container>
  );
}

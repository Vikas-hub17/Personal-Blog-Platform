import { useState } from 'react';
import { useRouter } from 'next/router';
import styled from 'styled-components';

const Container = styled.div`
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
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

const Title = styled.h2`
  font-size: 1.5rem;
  color: #333;
  margin-bottom: 20px;
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

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const Input = styled.input`
  padding: 12px;
  font-size: 1rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  outline: none;
  box-sizing: border-box;

  &:focus {
    border-color: #0070f3;
  }
`;

const Button = styled.button`
  padding: 12px;
  font-size: 1rem;
  color: #fff;
  background-color: #0070f3;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #005bb5;
  }
`;

const ErrorMessage = styled.p`
  color: red;
  font-size: 0.9rem;
  text-align: center;
  margin-bottom: 10px;
`;

const Login = () => {
  const [email, setEmail] = useState('john.doe@example.com');
  const [password, setPassword] = useState('$2b$10$EIXzYcKCzSv8h30z4aPXeOZZz4wT6j1r7U0vbxqG/R9YY7jHjqX2W');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      if (response.ok) {
        localStorage.setItem('token', data.token); // Save token
        router.push('/dashboard'); // Redirect to dashboard
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError('An error occurred during login.');
    }
  };

  return (
    <Container>
      <Title>Login</Title>
      {error && <ErrorMessage>{error}</ErrorMessage>}
      <Form onSubmit={handleSubmit}>
        <Input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
        />
        <Input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
        />
        <Button type="submit">Login</Button>
      </Form>
    </Container>
  );
};

export default Login;

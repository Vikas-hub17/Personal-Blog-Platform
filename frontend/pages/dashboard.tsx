import { useState } from 'react';
import styled from 'styled-components';
import withAuth from '../utils/withAuth';
import api from '../utils/api';

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background: #f3f4f6;
`;

const Wrapper = styled.div`
  width: 100%;
  max-width: 600px;
  padding: 20px;
  border-radius: 8px;
  background: #fff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const Heading = styled.h2`
  font-size: 1.8rem;
  font-weight: bold;
  margin-bottom: 20px;
  color: #333;
  text-align: center;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 15px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 1rem;

  &:focus {
    border-color: #3b82f6;
    outline: none;
    box-shadow: 0 0 5px rgba(59, 130, 246, 0.3);
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 10px;
  margin-bottom: 15px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 1rem;
  resize: none;

  &:focus {
    border-color: #3b82f6;
    outline: none;
    box-shadow: 0 0 5px rgba(59, 130, 246, 0.3);
  }
`;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  border: none;
  border-radius: 5px;
  background: #3b82f6;
  color: #fff;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background: #2563eb;
  }

  &:disabled {
    background: #9ca3af;
    cursor: not-allowed;
  }
`;

function Dashboard() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);

  const handlePost = async () => {
    if (!title.trim() || !content.trim()) {
      alert('Title and content are required!');
      return;
    }

    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      await api.post(
        '/posts',
        { title, content },
        { headers: { Authorization: token } }
      );
      setTitle('');
      setContent('');
      alert('Post created successfully!');
    } catch (error) {
      console.error('Error creating post:', error);
      alert('Failed to create post. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <Wrapper>
        <Heading>Create a New Post</Heading>
        <Input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <TextArea
          placeholder="Content"
          rows={5}
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <Button onClick={handlePost} disabled={loading}>
          {loading ? 'Posting...' : 'Post'}
        </Button>
      </Wrapper>
    </Container>
  );
}

export default withAuth(Dashboard);

import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import styled from 'styled-components';

// Define the Post type
type Post = {
  id: string;
  title: string;
  content: string;
};

const DashboardContainer = styled.div`
  max-width: 900px;
  margin: 0 auto;
  padding: 30px;
  background-color: #ffffff;
  border-radius: 12px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  animation: fadeIn 1s ease-in-out;
`;

const Title = styled.h2`
  font-size: 2.5rem;
  color: #333;
  text-align: center;
  margin-bottom: 20px;
  font-weight: 600;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-bottom: 30px;
`;

const Input = styled.input`
  padding: 15px;
  font-size: 1.1rem;
  border: 2px solid #ddd;
  border-radius: 8px;
  transition: border-color 0.3s ease, box-shadow 0.3s ease;

  &:focus {
    border-color: #0070f3;
    box-shadow: 0 0 8px rgba(0, 112, 243, 0.5);
    outline: none;
  }
`;

const TextArea = styled.textarea`
  padding: 15px;
  font-size: 1.1rem;
  border: 2px solid #ddd;
  border-radius: 8px;
  transition: border-color 0.3s ease, box-shadow 0.3s ease;

  &:focus {
    border-color: #0070f3;
    box-shadow: 0 0 8px rgba(0, 112, 243, 0.5);
    outline: none;
  }
`;

const Button = styled.button`
  padding: 14px;
  font-size: 1.2rem;
  color: white;
  background-color: #0070f3;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #005bb5;
  }
`;

const LogOutButton = styled(Button)`
  background-color: #ff4d4d;
  margin-top: 20px;
  &:hover {
    background-color: #e60000;
  }
`;

const PostList = styled.div`
  margin-top: 30px;
`;

const PostCard = styled.div`
  margin-bottom: 20px;
  padding: 15px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: #f9f9f9;

  h3 {
    font-size: 1.2rem;
    color: #333;
    margin-bottom: 10px;
  }

  p {
    font-size: 0.9rem;
    color: #555;
  }
`;

const PostPreview = styled.div`
  background-color: #f9f9f9;
  padding: 15px;
  border-radius: 8px;
  border: 1px solid #ddd;
  margin-top: 30px;

  h3 {
    font-size: 1.5rem;
    color: #333;
    margin-bottom: 15px;
  }

  p {
    font-size: 1rem;
    color: #555;
  }
`;

const Dashboard = () => {
  const [user, setUser] = useState<{ username: string; email: string } | null>(null);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [posts, setPosts] = useState<Post[]>([]);
  const [error, setError] = useState('');
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      router.push('/login'); // Redirect to login if not logged in
      return;
    }

    setUser({ username: 'john_doe', email: 'john.doe@example.com' });

    // Fetch user's posts
    const fetchPosts = async () => {
      try {
        const response = await fetch('/api/posts/my-posts', {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.ok) {
          const data = await response.json();
          setPosts(data.posts); // Update posts with fetched data
        } else {
          setError('Failed to fetch posts.');
        }
      } catch (err) {
        setError('An error occurred while fetching posts.');
      }
    };

    fetchPosts();
  }, [router]);

  const handlePostSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const token = localStorage.getItem('token');
    try {
      const response = await fetch('/api/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ title, content }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to create post.');
      }

      const newPost = await response.json();
      setPosts((prevPosts) => [newPost, ...prevPosts]); // Add the new post locally
      setTitle('');
      setContent('');
      router.push('/'); // Redirect to index.tsx
    } catch (err) {
      console.error('Error:', err);
      setError('An error occurred while creating the post.');
    }
  };

  const handleLogOut = () => {
    localStorage.removeItem('token');
    router.push('/login');
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <DashboardContainer>
      <Title>Welcome, {user.username}</Title>
      <p>Email: {user.email}</p>

      <h3>Create a New Post</h3>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <Form onSubmit={handlePostSubmit}>
        <Input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)}
          required
        />
        <TextArea
          placeholder="Content"
          value={content}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setContent(e.target.value)}
          rows={5}
          required
        />
        <Button type="submit">Create Post</Button>
      </Form>

      <PostPreview>
        <h3>Post Preview</h3>
        <h4>{title || 'Enter a title'}</h4>
        <p>{content || 'Enter content for your post'}</p>
      </PostPreview>

      <PostList>
        <h3>Your Posts</h3>
        {posts.length > 0 ? (
          posts.map((post) => (
            <PostCard key={post.id}>
              <h3>{post.title}</h3>
              <p>{post.content}</p>
            </PostCard>
          ))
        ) : (
          <p>No posts available. Start writing your first post!</p>
        )}
      </PostList>

      <LogOutButton onClick={handleLogOut}>Log Out</LogOutButton>
    </DashboardContainer>
  );
};

export default Dashboard;

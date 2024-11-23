import styled from 'styled-components';
import Layout from '../components/Layout';
import { useState, useEffect } from 'react';

type Post = {
  id: string;
  title: string;
  content: string;
  authorId: string;
  createdAt: string;
  formattedDate?: string; 
};

const Heading = styled.h2`
  font-size: 2rem;
  text-align: center;
  margin-bottom: 20px;
  color: #444;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 20px;

  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: 1024px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const Card = styled.div`
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 15px;
  background: #fff;
  transition: box-shadow 0.2s;

  &:hover {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
`;

const SearchBar = styled.input`
  width: 100%;
  max-width: 400px;
  padding: 10px;
  margin: 20px auto;
  display: block;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 1rem;

  &:focus {
    outline: none;
    border-color: #666;
  }
`;

const Title = styled.h3`
  font-size: 1.2rem;
  font-weight: bold;
  color: #222;
  margin-bottom: 10px;
`;

const Content = styled.p`
  font-size: 0.9rem;
  color: #555;
  margin-bottom: 10px;
`;

const Meta = styled.small`
  font-size: 0.8rem;
  color: #999;
`;

export default function Home({ posts }: { posts: Post[] }) {
  // State to store formatted date
  const [formattedPosts, setFormattedPosts] = useState<Post[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');

  useEffect(() => {
    // Format the dates only on the client-side
    const formatted = posts.map((post) => ({
      ...post,
      formattedDate: new Date(post.createdAt).toLocaleDateString(),
    }));
    setFormattedPosts(formatted);
  }, [posts]);

  const filteredPosts = formattedPosts.filter((post) =>
    post.authorId?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Provide a fallback if `posts` is undefined
  if (!formattedPosts || formattedPosts.length === 0) {
    return (
      <Layout>
        <Heading>No Blog Posts Available</Heading>
      </Layout>
    );
  }

  return (
    <Layout>
      <Heading>Posts</Heading>
      <SearchBar
        type="text"
        placeholder="Search by author name..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />

      <Grid>
        {filteredPosts.map((post) => (
          <Card key={post.id}>
            <Title>{post.title}</Title>
            <Content>{post.content}</Content>
            <Meta>
              By: {post.authorId} | {post.formattedDate}
            </Meta>
          </Card>
        ))}
      </Grid>
    </Layout>
  );
}

export async function getServerSideProps() {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/posts`);
    if (!response.ok) {
      console.error('Failed to fetch posts:', response.statusText);
      return { props: { posts: [] } };
    }

    const posts = await response.json();
    return { props: { posts } };
  } catch (error) {
    // Type casting the error
    const err = error as Error;
    console.error('Error fetching posts:', err.message);
    return { props: { posts: [] } };
  }
}

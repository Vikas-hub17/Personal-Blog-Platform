import styled from 'styled-components';
import Layout from '../components/Layout';
import { useState, useEffect } from 'react';

type Post = {
  id: string;
  title: string;
  content: string;
  authorId: string;
  authorName: string;
  createdAt: string;
  formattedDate?: string;
};

const Heading = styled.h2`
  font-size: 2.5rem;
  text-align: center;
  margin-bottom: 20px;
  color: #333;
  font-weight: 600;
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
  background: #fff;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  cursor: pointer;

  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 16px 32px rgba(0, 0, 0, 0.15);
  }
`;

const Title = styled.h3`
  font-size: 1.6rem;
  font-weight: 700;
  color: #222;
  margin-bottom: 12px;
`;

const Content = styled.p`
  font-size: 1rem;
  color: #555;
  line-height: 1.6;
  margin-bottom: 16px;
`;

const Meta = styled.small`
  font-size: 0.9rem;
  color: #777;
  font-style: italic;
`;

const SearchBarWrapper = styled.div`
  position: relative;
  max-width: 500px;
  margin: 30px auto;
`;

const SearchIcon = styled.div`
  position: absolute;
  left: 15px;
  top: 50%;
  transform: translateY(-50%);
  color: #007bff;
  font-size: 1.2rem;
  transition: all 0.3s ease;
`;

const SearchBar = styled.input`
  width: 100%;
  padding: 12px 16px 12px 40px;
  margin: 0 auto;
  display: block;
  border: 1px solid #ddd;
  border-radius: 50px;
  font-size: 1rem;
  background-color: #f4f4f4;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: #007bff;
    background-color: #fff;
  }

  &:focus + ${SearchIcon} {
    color: #0056b3;
  }
`;

export default function Home({ posts }: { posts: Post[] }) {
  const [formattedPosts, setFormattedPosts] = useState<Post[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');

  const fallbackPosts: Post[] = [
    { id: '1', title: 'Understanding React Hooks', content: 'React Hooks revolutionize...', authorId: 'ReactGuru', authorName: 'John Doe', createdAt: new Date().toISOString() },
    { id: '2', title: 'Mastering JavaScript ES6', content: 'ES6 is a major update to JavaScript...', authorId: 'JSExpert', authorName: 'Jane Smith', createdAt: new Date().toISOString() },
    { id: '3', title: 'CSS Grid vs Flexbox', content: 'CSS Grid and Flexbox are powerful layout systems...', authorId: 'DesignPro', authorName: 'Alice Brown', createdAt: new Date().toISOString() },
    { id: '4', title: 'TypeScript Basics', content: 'TypeScript adds static types to JavaScript...', authorId: 'TSMaster', authorName: 'Bob White', createdAt: new Date().toISOString() },
    { id: '5', title: 'Building Web APIs with Node.js', content: 'Node.js is an asynchronous event-driven JavaScript runtime...', authorId: 'NodeHero', authorName: 'Charlie Green', createdAt: new Date().toISOString() },
    { id: '6', title: 'Introduction to MongoDB', content: 'MongoDB is a NoSQL database...', authorId: 'DatabaseGuru', authorName: 'David Lee', createdAt: new Date().toISOString() },
    { id: '7', title: 'GraphQL for Beginners', content: 'GraphQL is a query language for APIs...', authorId: 'GraphQLWizard', authorName: 'Eve Miller', createdAt: new Date().toISOString() },
    { id: '8', title: 'Responsive Web Design', content: 'Responsive Web Design ensures websites look good on all devices...', authorId: 'WebDev', authorName: 'Frank Harris', createdAt: new Date().toISOString() }
  ];

  useEffect(() => {
    const formatted = [...posts, ...fallbackPosts].map((post) => ({
      ...post,
      formattedDate: new Date(post.createdAt).toLocaleDateString(),
    }));
    setFormattedPosts(formatted);
  }, [posts]);

  const filteredPosts = formattedPosts.filter((post) =>
    post.authorName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Layout>
      <Heading>Posts</Heading>
      <SearchBarWrapper>
        <SearchBar
          type="text"
          placeholder="Search by author name..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </SearchBarWrapper>

      <Grid>
        {filteredPosts.length === 0 ? (
          <p>No posts found matching the author name.</p>
        ) : (
          filteredPosts.map((post) => (
            <Card key={post.id}>
              <Title>{post.title}</Title>
              <Content>{post.content}</Content>
              <Meta>
                By: {post.authorName} | {post.formattedDate}
              </Meta>
            </Card>
          ))
        )}
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
    console.error('Error fetching posts:', (error as Error).message);
    return { props: { posts: [] } };
  }
}

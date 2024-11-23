import styled from 'styled-components';
import Layout from '../components/Layout';

type Post = {
  id: string;
  title: string;
  content: string;
  authorId: string;
  createdAt: string;
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
  // Provide a fallback if `posts` is undefined
  if (!posts || posts.length === 0) {
    return (
      <Layout>
        <Heading>No Blog Posts Available</Heading>
      </Layout>
    );
  }

  return (
    <Layout>
      <Heading>All Blog Posts</Heading>
      <Grid>
        {posts.map((post) => (
          <Card key={post.id}>
            <Title>{post.title}</Title>
            <Content>{post.content}</Content>
            <Meta>
              By: {post.authorId} | {new Date(post.createdAt).toLocaleDateString()}
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

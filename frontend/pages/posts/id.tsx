import { GetStaticPaths, GetStaticProps } from 'next';
import api from '../../utils/api';
import Layout from '../../components/Layout';

type Post = {
  id: string;
  title: string;
  content: string;
  authorId: string;
  createdAt: string;
};

export default function Post({ post }: { post: Post }) {
  return (
    <Layout>
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold mb-4 text-gray-800">{post.title}</h1>
        <p className="text-gray-700 mb-4">{post.content}</p>
        <small className="text-sm text-gray-500">
          By: {post.authorId} | Published: {new Date(post.createdAt).toLocaleDateString()}
        </small>
      </div>
    </Layout>
  );
}

// Generate static paths for posts
export const getStaticPaths: GetStaticPaths = async () => {
  const response = await api.get('/posts');
  const paths = response.data.map((post: Post) => ({
    params: { id: post.id },
  }));
  return { paths, fallback: false };
};

// Fetch data for individual post
export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { id } = params!;
  const response = await api.get(`/posts/${id}`);
  return { props: { post: response.data } };
};

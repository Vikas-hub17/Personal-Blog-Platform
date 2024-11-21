import Layout from '../components/Layout';
import api from '../utils/api';

type Post = {
  id: string;
  title: string;
  content: string;
  authorId: string;
  createdAt: string;
};

export default function Home({ posts }: { posts: Post[] }) {
  return (
    <Layout>
      <h2 className="text-2xl font-semibold mb-6 text-center">All Blog Posts</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post) => (
          <div
            key={post.id}
            className="border p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow"
          >
            <h3 className="text-lg font-bold mb-2 text-gray-800">{post.title}</h3>
            <p className="text-sm text-gray-600 mb-4 line-clamp-3">{post.content}</p>
            <small className="text-xs text-gray-500">
              By: {post.authorId} | {new Date(post.createdAt).toLocaleDateString()}
            </small>
          </div>
        ))}
      </div>
    </Layout>
  );
}

// Server-side rendering for the homepage
export async function getServerSideProps() {
  const response = await api.get('/posts');
  return {
    props: {
      posts: response.data,
    },
  };
}

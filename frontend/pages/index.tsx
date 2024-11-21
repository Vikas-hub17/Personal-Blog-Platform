import { useEffect, useState } from 'react';
import api from '../utils/api';
import Layout from '../components/Layout';

type Post = {
  id: string;
  title: string;
  content: string;
  authorId: string;
  createdAt: string;
};

export default function Home() {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await api.get('/posts');
      setPosts(response.data);
    };
    fetchPosts();
  }, []);

  return (
    <Layout>
      <h2 className="text-2xl font-semibold mb-6">All Posts</h2>
      <div className="grid gap-4">
        {posts.map((post) => (
          <div key={post.id} className="border p-4 rounded-md shadow-md">
            <h3 className="text-xl font-bold mb-2">{post.title}</h3>
            <p className="text-gray-700 mb-2">{post.content}</p>
            <small className="text-gray-500">Author: {post.authorId}</small>
          </div>
        ))}
      </div>
    </Layout>
  );
}

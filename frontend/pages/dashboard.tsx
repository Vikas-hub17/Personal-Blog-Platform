import { useState } from 'react';
import withAuth from '../utils/withAuth';
import api from '../utils/api';

function Dashboard() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handlePost = async () => {
    try {
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
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="w-full max-w-2xl bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Create a New Post</h2>
        <input
          type="text"
          placeholder="Title"
          className="w-full mb-4 p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          placeholder="Content"
          className="w-full mb-4 p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <button
          onClick={handlePost}
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition-colors"
        >
          Post
        </button>
      </div>
    </div>
  );
}

export default withAuth(Dashboard);

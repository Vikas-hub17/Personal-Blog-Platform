import { useState } from 'react';
import api from '../utils/api';

export default function Dashboard() {
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
    <div className="min-h-screen flex flex-col items-center bg-gray-100">
      <div className="w-full max-w-2xl bg-white p-6 rounded-md shadow-md mt-10">
        <h2 className="text-2xl font-bold mb-4">Create a New Post</h2>
        <input
          type="text"
          placeholder="Title"
          className="w-full mb-4 p-2 border rounded"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          placeholder="Content"
          className="w-full mb-4 p-2 border rounded"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <button
          onClick={handlePost}
          className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600"
        >
          Post
        </button>
      </div>
    </div>
  );
}

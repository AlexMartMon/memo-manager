import React, { useEffect, useState } from 'react';
import { createMemo, updateMemo } from '../services/Service';

const MainContent = ({ categoryId, memo, updateMemo: updateMemoInParent,deleteMemo: deleteMemoInParent, hideMainContent }) => {
  const [title, setTitle] = useState(memo.title || '');
  const [content, setContent] = useState(memo.content || '');
  const [error, setError] = useState('');

  useEffect(() => {
    setTitle(memo.title);
    setContent(memo.content);
  }, [memo]);

  const handleSave = async () => {
    if (!title || !content) {
      setError('Both title and content are required.');
      return;
    }

    try {
      let newMemo;
      if (memo.id === 'new') {
        newMemo = await createMemo(categoryId, title, content);
        newMemo.createState = true;
      } else {
        newMemo = await updateMemo(memo.id, categoryId, title, content);
        newMemo.createState = false;
      }
      console.log('Memo saved successfully:', newMemo);
      setError('');
      updateMemoInParent(categoryId, newMemo);
      hideMainContent();
    } catch (error) {
      setError(error.message);
    }
  };

  const handleDelete = async () => {
    if (memo.id === 'new') {
      deleteMemoInParent(categoryId, memo.id);
      hideMainContent();
    } else {
      try {
        await deleteMemoInParent(categoryId, memo.id);
        console.log('Delete memo from the backend:', memo.id);
        hideMainContent();
      } catch (error) {
        setError(error.message);
      }
    }
  };

  return (
    <main className="flex-1 bg-white p-4">
      <h1 className="text-3xl font-bold mb-4">Main Content</h1>
      <form className="space-y-4">
        <div>
          <label htmlFor="title" className="block text-gray-700 text-sm font-bold mb-2">
            Title
          </label>
          <input
            type="text"
            id="memo-title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label htmlFor="content" className="block text-gray-700 text-sm font-bold mb-2">
            Content
          </label>
          <textarea
            id="memo-content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows="6"
          />
        </div>
        <div className="flex space-x-4">
          <button
            type="button"
            id="save-memo"
            onClick={handleSave}
            className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            Save
          </button>
          <button
            type="button"
            id="delete-memo"
            onClick={handleDelete}
            className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            Delete
          </button>
        </div>
      </form>
    </main>
  );
};

export default MainContent;

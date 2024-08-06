import { useEffect, useState } from 'react';
import Login from './components/Login';
import './index.css';
import MemoTaskManager from './components/MemoTaskManager';
import { getCategories, getMemos } from './services/Service';

function App() {

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleLoginSuccess = async () => {
    setLoading(true);
    setError('');
    try {
      const categoriesData = await getCategories();
      
      const memosPromises = categoriesData.map(async (category) => {
        try {
          const memos = await getMemos(category.id);
          return { ...category, memos };
        } catch (error) {
          console.error(`Error fetching memos for category ${category.id}:`, error);
          return { ...category, memos: [] }; // Manejar el error devolviendo una categoría sin memos
        }
      });

      // Esperar a que todas las promesas se resuelvan
      const categoriesWithMemos = await Promise.all(memosPromises);
      setCategories(categoriesWithMemos);

    } catch (err) {
      console.error('Error fetching categories or memos:', err);
      setError('Error fetching categories or memos');
    } finally {
      setLoading(false);
      setIsAuthenticated(true);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const categoriesData = await getCategories();
        const memosPromises = categoriesData.map(async (category) => {
          const memos = await getMemos(category.id);
          return { ...category, memos };
        });
        const categoriesWithMemos = await Promise.all(memosPromises);
        setCategories(categoriesWithMemos);
      } catch (err) {
        console.error('Error fetching categories or memos:', err);
        setError('Error fetching categories or memos');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);


  return (
    <>
      {!isAuthenticated ? (
        <Login onLoginSuccess={handleLoginSuccess} />
      ) : (
        <MemoTaskManager setCategories={setCategories} categories={categories} loading={loading} error={error} />
      )}
    </>
  )
}

export default App

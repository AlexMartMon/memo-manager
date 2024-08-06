import axios from 'axios';
import { mockCategories, mockMemos } from '../mockdata';

const API_URL = 'https://challenge-server.tracks.run/memoapp';
const USE_MOCK_DATA = true;

export const getCategories = async () => {
  if (USE_MOCK_DATA) {
    return new Promise((resolve) => {
      setTimeout(() => resolve(mockCategories), 500);
    });
  }
  try {
    const response = await axios.get(`${API_URL}/category`);
    return response.data;
  } catch (error) {
    console.error('Error fetching categories:', error);
    throw error;
  }
};

export const getMemos = async (categoryId) => {
  if (USE_MOCK_DATA) {
    return new Promise((resolve) => {
      setTimeout(() => resolve(mockMemos[categoryId] || []), 500);
    });
  }
  try {
    const response = await axios.get(`/memo`, { params: { category_id: categoryId } });
    return response.data;
  } catch (error) {
    throw new Error(`Error fetching memos: ${error.message}`);
  }
};

export const createMemo = async (categoryId, title, content) => {
  if (USE_MOCK_DATA) {
    return new Promise((resolve) => {
      const newMemo = { id: `${categoryId}-${Date.now()}`, category_id: categoryId, title, content };
      setTimeout(() => resolve(newMemo), 500);
    });
  }
  try {
    const response = await api.post('/memo', { category_id: categoryId, title, content });
    return response.data;
  } catch (error) {
    throw new Error(`Error creating memo: ${error.message}`);
  }
};

export const getMemoById = async (id) => {
  if (USE_MOCK_DATA) {
    return new Promise((resolve) => {
      const categoryMemos = Object.values(mockMemos).flat();
      const memo = categoryMemos.find(m => m.id === id);
      setTimeout(() => resolve(memo), 500);
    });
  }
  try {
    const response = await api.get(`/memo/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(`Error fetching memo by ID: ${error.message}`);
  }
};

export const updateMemo = async (id, categoryId, title, content) => {
  if (USE_MOCK_DATA) {
    return new Promise((resolve) => {
      const updatedMemo = { id, category_id: categoryId, title, content };
      setTimeout(() => resolve(updatedMemo), 500);
    });
  }
  try {
    const response = await api.put(`/memo/${id}`, { category_id: categoryId, title, content });
    return response.data;
  } catch (error) {
    throw new Error(`Error updating memo: ${error.message}`);
  }
};

export const deleteMemo = async (id) => {
  if (USE_MOCK_DATA) {
    return new Promise((resolve) => {
      setTimeout(() => resolve(), 500);
    });
  }
  try {
    await api.delete(`/memo/${id}`);
  } catch (error) {
    throw new Error(`Error deleting memo: ${error.message}`);
  }
};
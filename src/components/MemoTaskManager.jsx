import React, { useState } from "react";
import Category from "./Category";
import MainContent from "./MainContent";
import { getMemoById, deleteMemo as deleteMemoFromApi } from "../services/Service";

export default function MemoTaskManager({
  categories,
  setCategories,
  loading,
  error,
}) {
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [selectedMemo, setSelectedMemo] = useState(null);

  const handleCategoryClick = (categoryId) => {
    setSelectedCategoryId((prev) => (prev === categoryId ? null : categoryId));
    setSelectedMemo(null);
  };

  const handleNewClick = () => {
    if (selectedCategoryId) {
        const newMemo = { id: 'new', title: 'new memo', content: '' };
        setCategories((prevCategories) =>
          prevCategories.map((category) =>
            category.id === selectedCategoryId
              ? { ...category, memos: [...category.memos, newMemo] }
              : category
          )
        );
        setSelectedMemo({ ...newMemo, categoryId: selectedCategoryId });
      }
  };

  const handleMemoClick = async (memoId) => {
    try {
      const memo = await getMemoById(memoId);
      setSelectedMemo({ ...memo, categoryId: selectedCategoryId });
    } catch (error) {
      console.error("Error fetching memo:", error);
    }
  };

  const updateMemo = (categoryId, updatedMemo) => {
    setCategories((prevCategories) =>
      prevCategories.map((category) => {
        if (category.id === categoryId) {
          if (updatedMemo.createState) {
            const existingMemoIndex = category.memos.findIndex(memo => memo.id === 'new');
            const updatedMemos = category.memos.map((memo, index) =>
              index === existingMemoIndex ? updatedMemo : memo
            );
            return { ...category, memos: updatedMemos };
          } else {
            const updatedMemos = category.memos.map((memo) =>
              memo.id === updatedMemo.id ? updatedMemo : memo
            );
            return { ...category, memos: updatedMemos };
          }
        }
        return category;
      })
    );
  };

  const deleteMemo = async (categoryId, memoId) => {
    if (memoId === 'new') {
        setCategories((prevCategories) =>
          prevCategories.map((category) => {
            if (category.id === categoryId) {
              const updatedMemos = category.memos.filter((memo) => memo.id !== memoId);
              return { ...category, memos: updatedMemos };
            }
            return category;
          })
        );
      } else {
        try {
          await deleteMemoFromApi(memoId);
          setCategories((prevCategories) =>
            prevCategories.map((category) => {
              if (category.id === categoryId) {
                const updatedMemos = category.memos.filter((memo) => memo.id !== memoId);
                return { ...category, memos: updatedMemos };
              }
              return category;
            })
          );
        } catch (error) {
          console.error('Error deleting memo:', error);
        }
      }
  };

  const hideMainContent = () => {
    setSelectedMemo(null);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  return (
    <div className="flex h-screen">
      <aside className="w-1/4 bg-gray-200 p-4">
        <ul className="space-y-2">
          {categories.map((category) => (
            <Category
              key={category.id}
              category={category}
              isSelected={category.id === selectedCategoryId}
              onClick={() => handleCategoryClick(category.id)}
              onMemoClick={handleMemoClick}
            />
          ))}
        </ul>
        <div className="mt-4 flex justify-end">
          <button
            onClick={handleNewClick}
            className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            New
          </button>
        </div>
        <div className="mt-4 bg-gray-300 h-1 rounded-full">
          <span className="sr-only">No more items</span>
        </div>
      </aside>

      {selectedMemo && (
        <MainContent
          categoryId={selectedMemo.categoryId}
          memo={selectedMemo}
          updateMemo={updateMemo}
          deleteMemo={deleteMemo}
          hideMainContent={hideMainContent}
        />
      )}
    </div>
  );
}

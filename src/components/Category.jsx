import React, { useState } from 'react';
import { FolderIcon, FolderOpenIcon, ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/solid';
import MemoItem from './MemoItem';

export default function Category({ category, isSelected, onClick, onMemoClick }) {
    const [isOpen, setIsOpen] = useState(false);

    const handleCategoryClick = () => {
        setIsOpen(prev => !prev);
        onClick(category.id);
    };
    return (
        <div>
            <li
                id={`category-${category.id}`}
                className={`flex items-center ${isSelected ? 'text-blue-600' : 'text-gray-600'}`}
                onClick={handleCategoryClick}
            >
                {isSelected ? (
                    <FolderOpenIcon className="w-5 h-5 mr-2 text-blue-600" />
                ) : (
                    <FolderIcon className="w-5 h-5 mr-2 text-gray-600" />
                )}

                <a
                    href={`#${category.id}`}
                    className={`flex-1 text-center ${isSelected ? 'text-blue-600' : 'text-gray-600'} hover:underline`}
                >
                    {category.name}
                </a>

                {isSelected ? (
                    <ChevronUpIcon className="w-5 h-5 ml-2 text-blue-600" />
                ) : (
                    <ChevronDownIcon className="w-5 h-5 ml-2 text-gray-600" />
                )}
            </li>

            {isSelected && isOpen && (
                <ul className="ml-6 mt-2 space-y-2">
                    {category.memos.map((memo) => (
                        <MemoItem key={memo.id} memo={memo} onClick={() => onMemoClick(memo.id)} />
                    ))}
                </ul>
            )}
        </div>
    );
}



import React from 'react';
import { DocumentIcon } from '@heroicons/react/24/solid';

export default function MemoItem({ memo, onClick }) {
  return (
    <li className="flex items-center text-gray-600"  onClick={onClick}>
      <DocumentIcon className="w-4 h-4 mr-2" />
      <span>{memo.title}</span>
    </li>
  );
}

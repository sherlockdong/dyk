'use client';
import { useState } from 'react';
import { sculptureList } from './blog.js';

export default function Gallery() {
  const [index, setIndex] = useState(0);
  const [showMore, setShowMore] = useState(false);
  const hasNext = index < sculptureList.length - 1;

  function handleNextClick() {
    if (hasNext) {
      setIndex(index + 1);
    } else {
      setIndex(0);
    }
  }

  function handleMoreClick() {
    setShowMore(!showMore);
  }

  let sculpture = sculptureList[index];
  return (
    <>
      <h2> {sculpture.title}</h2>
      <p> {sculpture.content}</p>
      <button id='scul' onClick={handleNextClick}><span>
        Next</span>
      </button>
    </>
  );
}

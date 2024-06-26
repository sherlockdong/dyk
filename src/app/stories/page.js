'use client';
import { useState } from 'react';
import { sculptureList } from './blog.js';

export default function Gallery() {
  const [index, setIndex] = useState(0);
  const [showMore, setShowMore] = useState(false);
  const hasNext = index < sculptureList.length - 1;
  const hasBack = index >= 1;
  function handleNextClick() {
    if (hasNext) {
      setIndex(index + 1);
    } else {
      setIndex(0);
    }
  }
  function handleBackClick() {
    if (hasBack) {
      setIndex(index - 1);
    } else {
      setIndex(sculptureList.length-1);
    }
  }

  function handleMoreClick() {
    setShowMore(!showMore);
  }

  let sculpture = sculptureList[index];
  return (
    <><div id='st'>
      <h2> {sculpture.title}</h2>
      <h3 id = 'leng'>
        ({index + 1} of {sculptureList.length})
      </h3>
      <p id="stories" > {sculpture.content}</p>
      <p id='ftn'> {sculpture.footn}</p>
      <button id='sculeft' onClick={handleBackClick}><span>
      Back</span></button>
      <button id='scul' onClick={handleNextClick}><span>
        Next</span>
      </button>
      </div>
    </>
  );
}

// src/components/LikeButton.js
import React, { useState, useEffect } from "react";
import { logActivity } from "../app/profile/logactivity";
import { db } from "../firebase";
import { doc, getDoc, setDoc, deleteDoc, serverTimestamp } from "firebase/firestore";

const LikeButton = ({ userId, imageId }) => {
  const [liked, setLiked] = useState(false);

  // Check persistent like state when the component mounts
  useEffect(() => {
    if (!userId || !imageId) return;
    const likeDocRef = doc(db, "likes", `${userId}_${imageId}`);
    getDoc(likeDocRef)
      .then((docSnap) => {
        if (docSnap.exists()) {
          setLiked(true);
        } else {
          setLiked(false);
        }
      })
      .catch((error) => {
        console.error("Error fetching like document: ", error);
      });
  }, [userId, imageId]);

  const handleToggleLike = async () => {
    if (!userId) {
      console.error("User must be logged in to like content.");
      return;
    }
    const likeDocRef = doc(db, "likes", `${userId}_${imageId}`);
    if (liked) {
      // If already liked, remove the document (unlike)
      await deleteDoc(likeDocRef);
      await logActivity({ userId, activityType: "unlike", contentId: imageId });
      setLiked(false);
    } else {
      // If not liked, create a document (like)
      await setDoc(likeDocRef, {
        userId,
        contentId: imageId,
        timestamp: serverTimestamp(),
      });
      await logActivity({ userId, activityType: "like", contentId: imageId });
      setLiked(true);
    }
  };

  return (
    <button id="likebut" onClick={handleToggleLike} style={{ backgroundColor: liked ? "red" : "initial" }}>
      {liked ? "Unlike" : "Like"}
    </button>
  );
};

export default LikeButton;

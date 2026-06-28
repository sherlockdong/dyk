import { db } from '../../firebase';
import { addDoc, collection, serverTimestamp } from "firebase/firestore";

export const logActivity = async ({ userId, activityType, contentId }) => {
  try {
    const activityData = {
      userId,
      activityType,
      contentId,
      timestamp: serverTimestamp()
    };
    await addDoc(collection(db, "userActivities"), activityData);
  } catch (error) {
    console.error("Error logging activity:", error);
  }
};
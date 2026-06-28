"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { auth, db } from "../../firebase"; // Adjusted path
import { onAuthStateChanged, signOut } from "firebase/auth";
import { 
  collection, 
  query, 
  where, 
  orderBy, 
  onSnapshot, 
  getDocs, 
  deleteDoc, 
  doc 
} from "firebase/firestore";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (currentUser) => {
      if (!currentUser) {
        // Redirect if there is no authenticated user
        router.push("/");
      } else {
        setUser(currentUser);
        const activitiesRef = collection(db, "userActivities");
        const q = query(
          activitiesRef,
          where("userId", "==", currentUser.uid),
          orderBy("timestamp", "desc")
        );
        const unsubscribeActivities = onSnapshot(
          q,
          (snapshot) => {
            const userActivities = snapshot.docs.map((doc) => ({
              id: doc.id,
              ...doc.data(),
            }));
            setActivities(userActivities);
            setLoading(false);
          },
          (error) => {
            console.error("Error fetching activities: ", error);
            setLoading(false);
          }
        );
        // Clean up the activities listener when component unmounts
        return () => unsubscribeActivities();
      }
    });
    return () => unsubscribeAuth();
  }, [router]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.push("/");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  // Function to clear all recent activities for the current user
  const handleClearActivities = async () => {
    if (!user) return;
    try {
      const activitiesRef = collection(db, "userActivities");
      const q = query(activitiesRef, where("userId", "==", user.uid));
      const snapshot = await getDocs(q);
      const deletePromises = [];
      snapshot.forEach((docSnapshot) => {
        deletePromises.push(deleteDoc(doc(db, "userActivities", docSnapshot.id)));
      });
      await Promise.all(deletePromises);
      setActivities([]); // Clear the local state
    } catch (error) {
      console.error("Error clearing activities:", error);
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="user">
      <h1>{user.email}'s Profile</h1>
      <button onClick={handleLogout}>Logout</button>
      <h2>Your Activities:</h2>
      {activities.length > 0 ? (
        <ul>
          {activities.map((activity) => (
            <li key={activity.id}>
              <strong>{activity.activityType.toUpperCase()}</strong> on content ID: {activity.contentId} at{" "}
              {activity.timestamp?.seconds
                ? new Date(activity.timestamp.seconds * 1000).toLocaleString()
                : "Pending..."}
            </li>
          ))}
        </ul>
      ) : (
        <p>You have no activities recorded.</p>
      )}
      {/* Clear Activities Button */}
      <button onClick={handleClearActivities}>Clear Activities</button>
    </div>
  );
};

export default Profile;

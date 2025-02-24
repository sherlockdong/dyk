"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { auth, db } from "../../firebase"; // Adjusted path
import { onAuthStateChanged, signOut } from "firebase/auth";
import { collection, query, where, getDocs } from "firebase/firestore";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (!currentUser) {
        // Redirect to home page if there is no authenticated user
        router.push("/");
      } else {
        setUser(currentUser);
        const activitiesQuery = query(
          collection(db, "activities"),
          where("uid", "==", currentUser.uid)
        );
        const querySnapshot = await getDocs(activitiesQuery);
        const userActivities = [];
        querySnapshot.forEach((doc) => {
          userActivities.push({ id: doc.id, ...doc.data() });
        });
        setActivities(userActivities);
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, [router]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      // After sign out, redirect to the home page
      router.push("/");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1>{user.email}'s Profile</h1>
      <button onClick={handleLogout}>Logout</button>
      <h2>Your Activities:</h2>
      {activities.length > 0 ? (
        <ul>
          {activities.map((activity) => (
            <li key={activity.id}>
              {activity.description || "No Description Provided"}
            </li>
          ))}
        </ul>
      ) : (
        <p>You have no activities recorded.</p>
      )}
    </div>
  );
};

export default Profile;

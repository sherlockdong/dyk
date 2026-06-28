import React, { useEffect, useState } from 'react';
import { db } from '../../firebase';
import { collection, query, where, orderBy, limit, onSnapshot } from "firebase/firestore";

const RecentActivities = ({ userId }) => {
  const [activities, setActivities] = useState([]);
// In RecentActivities.js
useEffect(() => {
  if (!userId) return;
  
  const activitiesRef = collection(db, "userActivities");
  const q = query(
    activitiesRef,
    where("userId", "==", userId),
    orderBy("timestamp", "desc")
  );
  
  const unsubscribe = onSnapshot(q, (snapshot) => {
    const fetchedActivities = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    // Deduplicate by contentId (keeping the most recent like)
    const uniqueActivities = Array.from(
      new Map(fetchedActivities.map(item => [item.contentId, item])).values()
    );
    setActivities(uniqueActivities);
  }, (error) => {
    console.error("Error fetching activities:", error);
  });
  
  return () => unsubscribe();
}, [userId]);

 // In RecentActivities.js
return (
  <div>
    <h3>Recent Activities</h3>
    {activities.length > 0 ? (
      <ul>
        {activities.map((activity) => (
          <li key={activity.id}>
            <strong>{activity.activityType.toUpperCase()}</strong> on content: {activity.imageTitle || activity.contentId} at{" "}
            {activity.timestamp?.seconds ? new Date(activity.timestamp.seconds * 1000).toLocaleString() : "Pending..."}
            {activity.imageUrl && (
              <img 
                src={activity.imageUrl} 
                alt="Liked" 
                style={{ width: '100px', marginLeft: '10px' }}
              />
            )}
          </li>
        ))}
      </ul>
    ) : (
      <p>No recent activity.</p>
    )}
  </div>
);

};

export default RecentActivities;

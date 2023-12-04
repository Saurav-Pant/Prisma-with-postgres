"use client";

import { useState, useEffect } from "react";

export default function Home() {
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:5000/users");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        setUserData(data);
        console.log(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h2>User Data:</h2>
      <ul>
        {userData.map((user: any) => (
          <li key={user.id}>
            {user.name} - {user.email} - {user.posts[0].authorId}
          </li>
        ))}
      </ul>
    </div>
  );
}

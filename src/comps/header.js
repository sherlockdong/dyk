"use client"; 
import Link from 'next/link';
// This component uses client-side Firebase functions

import React, { useState, useEffect } from "react";
import { auth } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
const Header =()=>{

    const [user, setUser] = useState(null);

    useEffect(() => {
      // Listen for auth state changes
      const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
        setUser(currentUser);
      });
  
      // Cleanup subscription on unmount
      return () => unsubscribe();
    }, []);
  
    return(
       <div id = "header">
        <Link href="/">Sherlock Dong</Link>
            <nav id="right">
                <Link href="/projects" > <h2>Projects <span>-&gt;</span></h2></Link>    
                <Link href="/images" > <h2>Images <span>-&gt;</span></h2></Link>    
                <Link href="/stories" > <h2>Stories <span>-&gt;</span></h2></Link> 
                <Link href="/books" > <h2>Books <span>-&gt;</span></h2></Link> 
                <div>
        {user ? (
             <Link href="/profile">Welcome, {user.email}</Link>
        ) : (
          <a href="/component">Login</a>
        )}
      </div>
            </nav>
       </div>
    )
}
export default Header;

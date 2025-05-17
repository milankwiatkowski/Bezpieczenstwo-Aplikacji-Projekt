'use client'
import logo from './logo.svg';
import { useKeycloak } from "@react-keycloak/web";
import { useLayoutEffect } from 'react';
import './App.css';
import { useState, useEffect } from 'react';
function Posts() {
  const {keycloak, initialized} = useKeycloak();
    const [isAdmin, setIsAdmin] = useState(false);
    const [isMod, setIsAMod] = useState(false);
    const [role,setRole] = useState()
    const [posts, setPosts] = useState([]);
    useEffect(() => {
        async function fetchdata(){
            const response = await fetch('http://localhost:3001/admin', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${keycloak.token}`}
            });
            const responseData = await response.json();
            setPosts(responseData.posts);
        }
        fetchdata();
    },[]);
    useEffect(() => {
        document.title = "Posts"
        if (initialized && keycloak?.authenticated) {
          setRole(keycloak.tokenParsed?.realm_access?.roles[1])
          const isUserAdmin = keycloak.hasRealmRole("admin");
          const isModerator = keycloak.hasRealmRole("moderator");
          setIsAMod(isModerator);
          setIsAdmin(isUserAdmin);
        }
      }, [initialized, keycloak]);
  if(!initialized) {
    return <div>Loading...</div>;
  }
  return (
    <div className="App">
      <header className="App-header">
        {initialized ? (
          <>
          <p>Welcome {role}, {keycloak.tokenParsed?.preferred_username}!</p>
            {posts.map((post, index) => (
                <div key={index}>
                    <h3>{post.tytul}</h3>
                    <p>{post.tresc}</p>
                </div>
            ))}
          </>
        ):(
          <>
          <p>You are not logged in.</p>
          </>
        )}
      </header>
    </div>
  );
}

export default Posts
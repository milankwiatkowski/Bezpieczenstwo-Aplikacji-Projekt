'use client'
import logo from './logo.svg';
import { useKeycloak } from "@react-keycloak/web";

import './App.css';
import { useState, useEffect } from 'react';
function ModeratorPanel() {
  const {keycloak, initialized} = useKeycloak();
    const [isAdmin, setIsAdmin] = useState(false);
    const [isMod, setIsAMod] = useState(false);
    const [role,setRole] = useState()
    useEffect(() => {
        document.title = "Moderator Panel"
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
        {isAdmin || isMod ? (
          <>
          <p>Welcome {role}, {keycloak.tokenParsed?.preferred_username}!</p>
          </>
        ):(
          <>
          <p>You are not an admin or a moderator.</p>
          </>
        )}
      </header>
    </div>
  );
}

export default ModeratorPanel
'use client'

import { useKeycloak } from "@react-keycloak/web";
import './App.css';
import { useState, useEffect } from 'react';
function AdminPanel() {
  const {keycloak, initialized} = useKeycloak();
    const [isAdmin, setIsAdmin] = useState(false);
    useEffect(() => {
      document.title = "Admin Panel"
        if (initialized && keycloak?.authenticated) {
          const isUserAdmin = keycloak.hasRealmRole("admin");
          setIsAdmin(isUserAdmin);
        }
      }, [initialized, keycloak]);
  if(!initialized) {
    return <div>Loading...</div>;
  }
  return (
    <div className="App">
      <header className="App-header">
        {isAdmin? (
          <>
          <p>Welcome Admin, {keycloak.tokenParsed?.preferred_username}!</p>
          </>
        ):(
          <>
          <p>You are not an admin.</p>
          </>
        )}
      </header>
    </div>
  );
}

export default AdminPanel;
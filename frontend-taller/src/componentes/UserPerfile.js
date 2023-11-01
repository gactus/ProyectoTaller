import React from 'react';
import '../styleesheets/UserPerfile.css';


function UserProfile({ user }) {
  return (
    <div className="user-profile">
      <img src={user.photoURL || '/path/to/default/icon.png'} alt="User Avatar" className="user-avatar"/>
      <div className="user-details">
        <p><strong>Nombre:</strong> {user.name}</p>
        <p><strong>Tipo de Usuario:</strong> {user.userType}</p>
      </div>
    </div>
  );
}

export default UserProfile;

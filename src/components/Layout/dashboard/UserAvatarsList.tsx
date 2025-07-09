import React from "react";

type User = {
  id: number;
  name: string;
  avatar: string;
};

const users: User[] = [
  { id: 1, name: "Ruodong", avatar: "https://randomuser.me/api/portraits/men/1.jpg" },
  { id: 2, name: "Alice", avatar: "https://randomuser.me/api/portraits/women/2.jpg" },
  { id: 3, name: "Bob", avatar: "https://randomuser.me/api/portraits/men/2.jpg" },
];

const UserAvatarsList: React.FC = () => {
  return (
    <div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
      {users.map(user => (
        <div key={user.id} style={{ textAlign: "center" }}>
          <img
            src={user.avatar}
            alt={user.name}
            style={{ width: 40, height: 40, borderRadius: "50%" }}
          />
          <div style={{ fontSize: 12 }}>{user.name}</div>
        </div>
      ))}
    </div>
  );
};

export default UserAvatarsList;

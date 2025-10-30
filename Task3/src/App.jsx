import { useRef, useState } from 'react';
import './App.css';
import girl from './girl.jpg';
import { useList } from './context/ListContext';

function App() {
  const fileInputRef = useRef(null);
  const [user, setUser] = useState({
    name: 'Harshita Suri',
    avatar: girl,
    bio: 'Aspiring cloud/data engineer passionate about multi-cloud workflows and secure pipelines.',
  });

  const [editing, setEditing] = useState(false);
  const [newItem, setNewItem] = useState('');
  const { items, addItem, removeItem } = useList();

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setUser((prev) => ({ ...prev, avatar: imageUrl }));
    }
  };

  return (
    <div className="container">
      <img
        src={user.avatar}
        alt="Avatar"
        className="avatar"
        onClick={() => fileInputRef.current.click()}
        title="Click to change profile picture"
        style={{ cursor: 'pointer' }}
      />
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        onChange={handleImageChange}
        style={{ display: 'none' }}
      />

      {editing ? (
        <>
          <input name="name" value={user.name} onChange={handleChange} />
          <textarea name="bio" value={user.bio} onChange={handleChange} />
          <button onClick={() => setEditing(false)}>Save</button>
        </>
      ) : (
        <>
          <h2>{user.name}</h2>
          <p>{user.bio}</p>
          <button onClick={() => setEditing(true)}>Edit</button>
        </>
      )}

      <hr />
      <h3>Shared List</h3>
      <input
        value={newItem}
        onChange={(e) => setNewItem(e.target.value)}
        placeholder="Add item..."
      />
      <button
        onClick={() => {
          if (newItem.trim()) {
            addItem(newItem);
            setNewItem('');
          }
        }}
      >
        Add
      </button>

      <div className="card-list">
        {items.map((item) => (
          <div key={item.id} className="list-card">
            <p>{item.text}</p>
            <button onClick={() => removeItem(item.id)}>❌</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;


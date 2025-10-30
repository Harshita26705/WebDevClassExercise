import { createContext, useContext, useState } from 'react';

const ListContext = createContext();
export const useList = () => useContext(ListContext);

export const ListProvider = ({ children }) => {
  const [items, setItems] = useState([]);

  const addItem = (text) => {
    setItems((prev) => [...prev, { id: Date.now(), text }]);
  };

  const removeItem = (id) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <ListContext.Provider value={{ items, addItem, removeItem }}>
      {children}
    </ListContext.Provider>
  );
};

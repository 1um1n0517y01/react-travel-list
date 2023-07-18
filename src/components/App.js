import { useState } from 'react';
import Logo from './Logo';
import Form from './Form';
import PackingList from './PackingList';
import Stats from './Stats';

export const initialItems = [
  { id: 1, description: 'Passports', quantity: 2, packed: false },
];

export default function App() {
  const [items, setItems] = useState(initialItems);

  function handleAddItems(item) {
    // Adding items without mutating the initial array by spreading the items
    setItems((items) => [...items, item]);
  }

  function handleDeleteItem(id) {
    // Deleting items without mutating the initial array by filtering
    setItems((items) => items.filter((item) => item.id !== id));
  }

  function handleToggleItem(id) {
    // Updating items without mutating the initial array by using map
    setItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, packed: !item.packed } : item
      )
    );
  }

  function handleClearingList() {
    const confirmation = window.confirm(
      'Are you sure you want to delete all items from the list?'
    );
    if (confirmation) setItems([]);
  }

  return (
    <div className='app'>
      <Logo />
      <Form onAddItems={handleAddItems} />
      <PackingList
        items={items}
        onDeleteItem={handleDeleteItem}
        onToggleItem={handleToggleItem}
        onClearList={handleClearingList}
      />
      <Stats items={items} />
    </div>
  );
}

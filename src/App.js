import { useState } from 'react';

const initialItems = [
  { id: 1, description: 'Passports', quantity: 2, packed: false },
  { id: 2, description: 'Socks', quantity: 12, packed: true },
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

  return (
    <div className='app'>
      <Logo />
      <Form onAddItems={handleAddItems} />
      <PackingList
        items={items}
        onDeleteItem={handleDeleteItem}
        onToggleItem={handleToggleItem}
      />
      <Stats />
    </div>
  );
}

function Logo() {
  return <h1>🌴Far Away🎒</h1>;
}

function Form({ onAddItems }) {
  const [description, setDescription] = useState('');
  const [quantity, setQuantity] = useState(1);

  function handleSubmit(e) {
    e.preventDefault(0);

    if (!description) return;

    const newItem = {
      id: Date.now(),
      description,
      quantity,
      packed: false,
    };
    console.log(newItem);

    onAddItems(newItem);

    setDescription('');
    setQuantity(1);
  }

  return (
    <form className='add-form' onSubmit={handleSubmit}>
      <h3>What do you need for your 😍 trip?</h3>
      <select
        value={quantity}
        onChange={(e) => setQuantity(Number(e.target.value))}
      >
        {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
          <option value={num} key={num}>
            {num}
          </option>
        ))}
      </select>
      <input
        type='text'
        placeholder='Item...'
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button>Add</button>
    </form>
  );
}

function PackingList({ items, onDeleteItem, onToggleItem }) {
  return (
    <div className='list'>
      <ul>
        {items.map((item) => (
          <Item
            item={item}
            key={item.id}
            onDeleteItem={onDeleteItem}
            onToggleItem={onToggleItem}
          />
        ))}
      </ul>
    </div>
  );
}

function Stats() {
  return (
    <footer className='stats'>
      <em> 🎒 You have X items on your list, and you already packef X (X%)</em>
    </footer>
  );
}

function Item({ item, onDeleteItem, onToggleItem }) {
  return (
    <li>
      <input
        type='checkbox'
        value={item.packed}
        checked={item.packed}
        onChange={() => onToggleItem(item.id)}
      />
      <span style={item.packed ? { textDecoration: 'line-through' } : {}}>
        {item.description} {item.quantity}
      </span>
      <button onClick={() => onDeleteItem(item.id)}>❌</button>
    </li>
  );
}

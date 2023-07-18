import { initialItems } from './App';

export default function Stats({ items }) {
  if (items.length <= initialItems.length) {
    return (
      <footer className='stats'>
        <em>Start adding some items to your packing list 🌴</em>
      </footer>
    );
  }

  const numItems = items.length;
  // Filter returns an array so we can use length
  const numPacked = items.filter((item) => item.packed).length;
  const percentage = Math.round((numPacked / numItems) * 100);

  return (
    <footer className='stats'>
      <em>
        {percentage !== 100
          ? `🎒 You have ${numItems} items on your list, and you already packed
          ${numPacked} (${percentage}%)`
          : `You got everything! Ready to go ✈️`}
      </em>
    </footer>
  );
}

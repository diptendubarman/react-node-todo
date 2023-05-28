export default function TodoItem({ title, id, onDelete }) {
  return (
    <div className="flex mb-4 items-center">
      <p className="w-full text-grey-darkest">{title}</p>

      <button
        onClick={() => onDelete(id)}
        className="flex-no-shrink p-2 ml-2 border-2 rounded text-red border-red hover:bg-red-500"
      >
        Remove
      </button>
    </div>
  );
}

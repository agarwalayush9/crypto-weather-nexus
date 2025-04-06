export default function Error({ message }) {
  return (
    <div className="text-center text-red-500 p-4">
      <p className="text-lg font-semibold">Error</p>
      <p className="text-sm">{message}</p>
    </div>
  );
}
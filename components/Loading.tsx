export default function Loading() {
  return (
    <div className="flex items-center justify-center space-x-2">
      <div className="w-2.5 h-2.5 bg-gray-500 dark:bg-gray-100 rounded-full animate-bounce"></div>
      <div className="w-2.5 h-2.5 bg-gray-500 dark:bg-gray-100 rounded-full animate-bounce delay-200"></div>
      <div className="w-2.5 h-2.5 bg-gray-500 dark:bg-gray-100 rounded-full animate-bounce delay-400"></div>
    </div>
  );
}

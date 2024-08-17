function TailwindTest() {
    return (
      <div className="p-6 max-w-sm mx-auto bg-white rounded-xl shadow-md flex items-center space-x-4">
        <div className="text-xl font-medium text-black">Tailwind Test</div>
        <p className="text-gray-500">This should be styled if Tailwind is working.</p>
        <button className="px-4 py-2 text-sm text-white bg-blue-500 rounded-full hover:bg-blue-600">
          Click me
        </button>
      </div>
    );
  }
  
  export default TailwindTest;
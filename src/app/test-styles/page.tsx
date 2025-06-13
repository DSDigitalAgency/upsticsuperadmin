export default function TestStyles() {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-blue-600 mb-8">Tailwind CSS Test</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md border">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Card 1</h2>
            <p className="text-gray-600 mb-4">This card should have white background, padding, and shadow.</p>
            <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
              Blue Button
            </button>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md border">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Card 2</h2>
            <p className="text-gray-600 mb-4">This should test responsive grid layout.</p>
            <button className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
              Green Button
            </button>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md border">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Card 3</h2>
            <p className="text-gray-600 mb-4">If you can see colors and layout, Tailwind is working!</p>
            <button className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700">
              Red Button
            </button>
          </div>
        </div>
        
        <div className="mt-8 p-4 bg-yellow-100 border border-yellow-400 rounded">
          <p className="text-yellow-800">
            <strong>Test Status:</strong> If this box is yellow and you see colored buttons above, 
            Tailwind CSS is working correctly!
          </p>
        </div>
      </div>
    </div>
  )
} 
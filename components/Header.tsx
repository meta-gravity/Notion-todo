export default function Header() {
    return (
        <div>     
            <div className="w-full bg-gray-800 text-white flex justify-between items-center p-4">
                <h1 className="text-2xl">Notion Todo</h1>
                <div className="space-x-4">
                    <button className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded">
                        Sign Up
                    </button>
                    <button className="bg-gray-500 hover:bg-gray-600 px-4 py-2 rounded">
                        Login
                    </button>
                 </div>
            </div>
        </div>
    )
}
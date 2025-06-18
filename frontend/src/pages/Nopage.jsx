import React from "react";
import { Link } from "react-router-dom";

const Nopage = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-gray-800 px-4">
            <h1 className="text-6xl font-bold mb-4 text-red-500">404</h1>
            <p className="text-2xl mb-2">Page Not Found</p>
            <p className="text-center max-w-md mb-6">
                The page you're looking for doesn't exist or has been moved.
            </p>
            <Link
                to="/"
                className="bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition duration-300 shadow-md"
            >
                Go Home
            </Link>
        </div>
    );
};

export default Nopage;

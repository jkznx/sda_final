"use client"; // Add this directive at the top of the file

import React from 'react';
import { useState, useEffect } from 'react';

const BuysPage: React.FC = () => {
    const [Lotto, setLotto] = useState([]);

    useEffect(() => {
        fetch('') // Add your API endpoint here
            .then(res => res.json())
            .then(data => setLotto(data));
    }, []);

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col items-center p-4">
            {/* Main Content */}
            <main className="w-full max-w-4xl mt-6 space-y-6">
                {/* Number Selection */}
                <div className="bg-gray-200 p-4 rounded-lg shadow">
                    <div className="flex justify-between items-center mb-4">
                        <div className="flex space-x-2">
                            {[1, 2, 3, 4, 5].map((num) => (
                                <button
                                    key={num}
                                    className="w-12 h-12 bg-white rounded-full shadow-md hover:bg-gray-100"
                                >
                                    {num}
                                </button>
                            ))}
                        </div>
                        <button className="bg-red-500 text-white px-6 py-2 rounded-full hover:bg-red-600">
                            Find the Lotto
                        </button>
                    </div>

                    {/* 6 Digits Section */}
                    <div className="mt-4">
                        <button className="bg-red-500 text-white px-4 py-2 rounded-full mb-4">
                            6 Digits
                            <ul>
                                {Lotto.map(lotto => (
                                    <li key={lotto.id}>
                                        {/* Render your lotto data here */}
                                    </li>
                                ))}
                            </ul>
                        </button>
                        <div className="grid grid-cols-2 gap-4">
                            {[1, 2, 3, 4].map((_, index) => (
                                <div
                                    key={index}
                                    className="bg-gray-300 h-32 rounded-lg shadow-inner"
                                ></div>
                            ))}
                        </div>
                    </div>

                    {/* 3 Digits Section */}
                    <div className="mt-6">
                        <button className="bg-red-500 text-white px-4 py-2 rounded-full mb-4">
                            3 Digits
                        </button>
                        <div className="grid grid-cols-2 gap-4">
                            {[1, 2, 3, 4].map((_, index) => (
                                <div
                                    key={index}
                                    className="bg-gray-300 h-32 rounded-lg shadow-inner"
                                ></div>
                            ))}
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default BuysPage;
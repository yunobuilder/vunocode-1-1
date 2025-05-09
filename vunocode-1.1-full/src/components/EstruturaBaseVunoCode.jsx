import React from 'react';

const EstruturaBaseVunoCode = () => {
    const estrutura = [
        '/src/components',
        '/src/core',
        '/scripts',
        '/templates',
        '/src/App.jsx',
        '/scripts/startVunoCode.js',
        '/templates/README.txt',
        '/README.md',
        '/package.json',
    ];

    return (
        <div className="p-4">
            <h2 className="text-xl font-bold mb-4">🚀 Estrutura Criada:</h2>
            <ul className="list-disc pl-5">
                {estrutura.map((item, index) => (
                    <li key={index} className="mb-1 text-green-600">{item}</li>
                ))}
            </ul>
        </div>
    );
};

export default EstruturaBaseVunoCode;

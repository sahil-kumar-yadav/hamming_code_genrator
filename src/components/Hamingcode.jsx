// Import required libraries
import React from 'react';

// Node class for the binary tree
class Node {
    constructor(data) {
        this.data = data;
        this.left = null;
        this.right = null;
    }
}

// Function to convert symbols with probabilities to Hamming code
function convertToHamming(symbolsWithProbabilities) {
    // Sort symbols by decreasing probability
    symbolsWithProbabilities.sort((a, b) => b.probability - a.probability);

    let binaryCodewords = {};

    // Function to traverse the tree and assign binary codewords
    function traverseAndAssignCodewords(root, currentCode) {
        if (root.data !== null) {
            binaryCodewords[root.data] = currentCode;
        }

        if (root.left) {
            traverseAndAssignCodewords(root.left, currentCode + '0');
        }

        if (root.right) {
            traverseAndAssignCodewords(root.right, currentCode + '1');
        }
    }

    // Construct the binary tree
    const root = new Node(null);
    let currentNode = root;

    // Insert symbols into the tree
    symbolsWithProbabilities.forEach(symbol => {
        let currentSymbolNode = currentNode;
        for (let bit of symbol.codeword) {
            if (bit === '0') {
                if (!currentSymbolNode.left) {
                    currentSymbolNode.left = new Node(null);
                }
                currentSymbolNode = currentSymbolNode.left;
            } else {
                if (!currentSymbolNode.right) {
                    currentSymbolNode.right = new Node(null);
                }
                currentSymbolNode = currentSymbolNode.right;
            }
        }
        currentSymbolNode.data = symbol.symbol;
    });

    // Assign binary codewords by traversing the tree
    traverseAndAssignCodewords(root, '');

    return binaryCodewords;
}

// Example usage
const symbolsWithProbabilities = [
    { symbol: 'A', probability: 0.5, codeword: '' }, // Codeword will be assigned during traversal
    { symbol: 'B', probability: 0.3, codeword: '' },
    { symbol: 'C', probability: 0.2, codeword: '' }
];

// Assign codewords to symbols
const hammingCode = convertToHamming(symbolsWithProbabilities);

// Component to display the result
const HammingCodeDisplay = () => {
    return (
        <div>
            <h2>Hamming Code</h2>
            <pre>{JSON.stringify(hammingCode, null, 2)}</pre>
        </div>
    );
};

// Export the component
export default function HammingCode() {
    return (
        <div>
            <h1>Convert Symbols to Hamming Code</h1>
            <HammingCodeDisplay />
        </div>
    );
}

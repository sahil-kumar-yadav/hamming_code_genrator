// Function to convert symbols into Hamming codes
export const convertToHammingCodes = (symbols, probabilities) => {
    // Combine symbols and probabilities into an array of objects
    const symbolProbPairs = symbols.map((symbol, index) => ({
        symbol,
        probability: parseFloat(probabilities[index])
    }));

    // console.log("Symbol-probability pairs:", symbolProbPairs);

    // Sort symbols by probabilities in descending order
    // symbolProbPairs.sort((a, b) => b.probability - a.probability);
    symbolProbPairs.sort((a, b) => a.probability - b.probability);

    // console.log("Sorted symbol-probability pairs:", symbolProbPairs);

    // Construct binary tree and assign Hamming codes
    const tree = buildBinaryTree(symbolProbPairs);
    assignHammingCodes(tree.root, '');

    // Extract Hamming codes from tree
    const hammingCodes = [];
    extractHammingCodes(tree.root, '', hammingCodes);

    // console.log("Generated Hamming codes:", hammingCodes);

    return hammingCodes;
};

// Function to build a binary tree from symbol-probability pairs
const buildBinaryTree = (pairs) => {
    // Create nodes from sorted pairs
    const nodes = pairs.map(pair => ({
        symbol: pair.symbol,
        probability: pair.probability,
        left: null,
        right: null
    }));

    while (nodes.length > 1) {
        // Merge two nodes with the lowest probabilities
        const smallest1 = nodes.shift(); // Remove the first node
        const smallest2 = nodes.shift(); // Remove the new first node after removal
        const newNode = {
            symbol: '',
            probability: smallest1.probability + smallest2.probability,
            left: smallest1,
            right: smallest2
        };

        // Find the correct insertion index for the new node
        const insertIndex = nodes.findIndex(node => node.probability >= newNode.probability);

        // Insert the new node into the correct position in the sorted list
        if (insertIndex === -1) {
            nodes.push(newNode);
        } else {
            nodes.splice(insertIndex, 0, newNode);
        }
    }

    return {
        root: nodes[0]
    };
};

// Function to assign Hamming codes to symbols in the binary tree
const assignHammingCodes = (node, code) => {
    if (!node) {
        return; // If node is undefined, return early
    }
    
    if (node.symbol !== undefined && node.symbol !== '') {
        node.hammingCode = code;
    } else {
        // Recursively call assignHammingCodes for left and right children if they exist
        if (node.left) {
            // console.log("Going left from node:", node);
            assignHammingCodes(node.left, code + '0');
        }
        if (node.right) {
            // console.log("Going right from node:", node);
            assignHammingCodes(node.right, code + '1');
        }
    }
};

// Function to extract Hamming codes from the binary tree
const extractHammingCodes = (node, prefix, codes) => {
    console.log("Current node:", node);
    if (node.symbol !== undefined && node.symbol !== '') {
        console.log("Adding Hamming code:", { symbol: node.symbol, hammingCode: prefix });
        codes.push({ symbol: node.symbol, hammingCode: prefix });
    } else {
        // Recursively call extractHammingCodes for left and right children if they exist
        if (node.left) {
            console.log("Going left from node:", node);
            extractHammingCodes(node.left, prefix + '0', codes);
        }
        if (node.right) {
            console.log("Going right from node:", node);
            extractHammingCodes(node.right, prefix + '1', codes);
        }
    }
};

export default convertToHammingCodes;

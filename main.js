window.onload = function () {
    const inputElement = document.getElementById("input");
    const outputElement = document.getElementById("output");
    const mappingElement = document.getElementById("mapping");

    function getMapping() {
        const mappingText = mappingElement.value;
        const mapping = JSON.parse(mappingText);
        return mapping;
    }

    function encodeText(text) {
        const mapping = getMapping();
        const lines = text.split('\n');
        let encodedLines = [];

        const keys = Object.keys(mapping).sort((a, b) => b.length - a.length);

        lines.forEach(line => {
            let encodedLine = line;

            keys.forEach(key => {
                const value = mapping[key];
                const regex = new RegExp(key, 'g');
                encodedLine = encodedLine.replace(regex, value);
            });

            encodedLines.push(encodedLine)
        });

        return encodedLines.join('\n');
    }

    function updateOutput() {
        const inputText = inputElement.value;
        const encodedText = encodeText(inputText.toLowerCase());
        outputElement.textContent = encodedText;
    }

    inputElement.addEventListener('input', updateOutput);
}


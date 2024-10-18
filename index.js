(function () {
    // Helper function to debounce the CSS updates
    function debounce(func, delay) {
        let timeout;
        return function (...args) {
            clearTimeout(timeout);
            timeout = setTimeout(() => func.apply(this, args), delay);
        };
    }

    // Create the toggle button
    const toggleButton = document.createElement('button');
    toggleButton.id = 'toggle-button';
    toggleButton.textContent = '+';
    toggleButton.style.position = 'fixed';
    toggleButton.style.bottom = '10px';
    toggleButton.style.left = '20px';
    toggleButton.style.backgroundColor = '#007bff';
    toggleButton.style.color = 'white';
    toggleButton.style.border = 'none';
    toggleButton.style.borderRadius = '50%';
    toggleButton.style.width = '50px';
    toggleButton.style.height = '50px';
    toggleButton.style.fontSize = '24px';
    toggleButton.style.cursor = 'pointer';
    toggleButton.style.zIndex = '1001';
    document.body.appendChild(toggleButton);

    // Create the widget container
    const widget = document.createElement('div');
    widget.id = 'custom-widget';
    widget.style.position = 'fixed';
    widget.style.bottom = '60px';
    widget.style.left = '20px';
    widget.style.width = '350px';
    widget.style.backgroundColor = '#f9f9f9';
    widget.style.border = '1px solid #ccc';
    widget.style.padding = '10px';
    widget.style.boxShadow = '0px 4px 6px rgba(0, 0, 0, 0.1)';
    widget.style.display = 'none';
    widget.style.zIndex = '1000';
    document.body.appendChild(widget);

    // Create tabs for CSS and JS
    const tabContainer = document.createElement('div');
    tabContainer.style.display = 'flex';
    tabContainer.style.marginBottom = '10px';
    widget.appendChild(tabContainer);

    const cssTab = document.createElement('button');
    cssTab.textContent = 'CSS';
    cssTab.style.flex = '1';
    cssTab.style.padding = '10px';
    cssTab.style.cursor = 'pointer';
    cssTab.style.borderBottom = '2px solid blue';
    tabContainer.appendChild(cssTab);

    const jsTab = document.createElement('button');
    jsTab.textContent = 'JS';
    jsTab.style.flex = '1';
    jsTab.style.padding = '10px';
    jsTab.style.cursor = 'pointer';
    tabContainer.appendChild(jsTab);

    // Create the CSS textarea
    const cssTextarea = document.createElement('textarea');
    cssTextarea.placeholder = 'Type your CSS here...';
    cssTextarea.style.width = '100%';
    cssTextarea.style.height = '150px';
    widget.appendChild(cssTextarea);

    // Create the JS console area
    const jsTextarea = document.createElement('textarea');
    jsTextarea.placeholder = 'Type your JS here and press Enter...';
    jsTextarea.style.width = '100%';
    jsTextarea.style.height = '100px';
    jsTextarea.style.display = 'none';
    widget.appendChild(jsTextarea);

    // Create a div to display JS console output
    const jsOutput = document.createElement('div');
    jsOutput.style.height = '100px';
    jsOutput.style.overflowY = 'auto';
    jsOutput.style.borderTop = '1px solid #ccc';
    jsOutput.style.padding = '5px';
    jsOutput.style.display = 'none';
    widget.appendChild(jsOutput);

    // Style element for live CSS injection
    const styleElement = document.createElement('style');
    document.head.appendChild(styleElement);

    // Toggle widget visibility on button click
    toggleButton.addEventListener('click', () => {
        widget.style.display = widget.style.display === 'none' ? 'block' : 'none';
    });

    // Switch between CSS and JS tabs
    cssTab.addEventListener('click', () => {
        cssTab.style.borderBottom = '2px solid blue';
        jsTab.style.borderBottom = 'none';
        cssTextarea.style.display = 'block';
        jsTextarea.style.display = 'none';
        jsOutput.style.display = 'none';
    });

    jsTab.addEventListener('click', () => {
        jsTab.style.borderBottom = '2px solid blue';
        cssTab.style.borderBottom = 'none';
        cssTextarea.style.display = 'none';
        jsTextarea.style.display = 'block';
        jsOutput.style.display = 'block';
    });

    // Debounced function to inject CSS into the style element
    const updateCSS = debounce(() => {
        styleElement.textContent = cssTextarea.value;
    }, 3000);

    cssTextarea.addEventListener('input', updateCSS);

    // JS console logic
    jsTextarea.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            const command = jsTextarea.value.trim();
            if (command) {
                try {
                    const result = eval(command);
                    const resultNode = document.createElement('div');
                    resultNode.textContent = `> ${command}\n${result}`;
                    jsOutput.appendChild(resultNode);
                } catch (error) {
                    const errorNode = document.createElement('div');
                    errorNode.style.color = 'red';
                    errorNode.textContent = `> ${command}\nError: ${error.message}`;
                    jsOutput.appendChild(errorNode);
                }
                jsTextarea.value = '';
                jsOutput.scrollTop = jsOutput.scrollHeight;  // Scroll to the latest output
            }
        }
    });
})();

// Access

let eyedropperBox = document.querySelector('#eyedropper-box .eyedropper');
let colorCode = document.querySelector('#eyedropper-box .color-code .code span');
let changeColor = document.querySelector('#eyedropper-box .code-convert .change-color');
let copyButton = document.querySelector('#eyedropper-box .code-convert .copy');
let copied = document.querySelector('#eyedropper-box .color-code .copied');
let addColorPalette = document.querySelector('#eyedropper-box .palette-color-box .color-palettes .add-color');
let hexColor;
let ColorPalette = [];

function setAndApplyCSSVariable(value) {
    document.documentElement.style.setProperty('--var-color', value);
    window.getComputedStyle(document.documentElement).getPropertyValue('--var-color');
}

eyedropperBox.addEventListener("click", function () {
    const eyedropper = new EyeDropper();

    eyedropper.open().then((result) => {
        hexColor = result.sRGBHex;
        colorCode.innerHTML = hexColor;
        setAndApplyCSSVariable(hexColor);
    });
});

addColorPalette.addEventListener("click", function () {
    const eyedropper = new EyeDropper();

    eyedropper.open().then((result) => {

        const newHexColor = result.sRGBHex;
        if (!ColorPalette.includes(newHexColor)) {
            ColorPalette.push(newHexColor);

            const newColorDiv = document.createElement('div');
            newColorDiv.classList.add('color');
            newColorDiv.style.backgroundColor = newHexColor;

            const colorPalettesDiv = document.querySelector('.color-palettes');
            colorPalettesDiv.insertBefore(newColorDiv, colorPalettesDiv.firstChild);

            newColorDiv.addEventListener("click", function () {
                colorCode.innerHTML = newHexColor;
                setAndApplyCSSVariable(newHexColor); 
            })
        }
    });
});

document.addEventListener('DOMContentLoaded', function () {
    copyButton.addEventListener('click', function () {

        const range = document.createRange();
        range.selectNode(colorCode);

        const selection = window.getSelection();
        selection.removeAllRanges();
        selection.addRange(range);

        document.execCommand('copy');

        selection.removeAllRanges();

        copied.style.display = 'block';
        setTimeout(function () {
            copied.style.display = 'none';
        }, 2000);
    });
});
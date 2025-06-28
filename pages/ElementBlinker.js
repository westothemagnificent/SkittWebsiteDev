export class ElementBlinker {
    
    // get element and list for colors
    constructor(element, colorListBgColor, colorListOutlineColor, interval) {

        console.assert(colorListBgColor.length == colorListOutlineColor.length, "colorListBgColor colorListOutlineColor must be the same length");

        this.element = element

        this.colorListBgColor = colorListBgColor
        this.colorListOutlineColor = colorListOutlineColor

        this.currentColorIndex = 0

        this.updateColor()

        setInterval(this.update.bind(this), interval);
    }

    // update the color
    update() {
        this.currentColorIndex = (this.currentColorIndex + 1) % this.colorListBgColor.length;

        this.updateColor()
    }

    updateColor() {
        this.element.style.backgroundColor = this.colorListBgColor[this.currentColorIndex]
        this.element.style.outlineColor = this.colorListOutlineColor[this.currentColorIndex]
    }
}

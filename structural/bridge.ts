// Bridge Design Pattern
// =====================

// Bridge is a structural design pattern that lets you split
// a large class or a set of closely related classes into two
// separate hierarchies—abstraction and implementation—which
// can be developed independently of each other.

// Problem: 
// Imagine that you are developing a UI library, in this library
// you have a lot of components, like the button, the input, the checkbox ..etc
// and you have 2 main themes, the light theme and the dark theme.
// without the bridge pattern, you would have to create a new class
// for each theme variant:

// class LightButton {
//     render() {
//         console.log("Light Button");
//     }
// }
// class DarkButton {
//     render() {
//         console.log("Dark Button");
//     }
// }
// class LightInput {
//     render() {
//         console.log("Light Input");
//     }
// }
// class DarkInput {
//     render() {
//         console.log("Dark Input");
//     }
// }

// You can quickly see that this approach is not scalable, because
// you would have to create a new class for each theme variant, and
// for each component, so you would end up with a lot of classes.

// Fortunately, you can use the Bridge Pattern to solve this problem.

// Implementor
interface Theme {
    getBackgroundColor(): string;
    getTextColor(): string;
}

// Concrete Implementors
class LightTheme implements Theme {
    getBackgroundColor() {
        return "#fff";
    }

    getTextColor() {
        return "#000";
    }
}

class DarkTheme implements Theme {
    getBackgroundColor() {
        return "#000";
    }

    getTextColor() {
        return "#fff";
    }
}

// Abstraction
interface UIElement {
    setTheme(theme: Theme): void;
    render(): void;
}

// Refined Abstraction
class Button implements UIElement {
    private theme!: Theme;

    setTheme(theme: Theme) {
        this.theme = theme;
    }

    render() {
        console.log(
            `Button: background-color: ${this.theme.getBackgroundColor()}, color: ${this.theme.getTextColor()}`
        );
    }
}

class Input implements UIElement {
    private theme!: Theme;

    setTheme(theme: Theme) {
        this.theme = theme;
    }

    render() {
        console.log(
            `Input: background-color: ${this.theme.getBackgroundColor()}, color: ${this.theme.getTextColor()}`
        );
    }
}

class Checkbox implements UIElement {
    private theme!: Theme;

    setTheme(theme: Theme) {
        this.theme = theme;
    }

    render() {
        console.log(
            `Checkbox: background-color: ${this.theme.getBackgroundColor()}, color: ${this.theme.getTextColor()}`
        );
    }
}

const lightTheme = new LightTheme();
const darkTheme = new DarkTheme();

const button = new Button();
const input = new Input();
const checkbox = new Checkbox();

button.setTheme(lightTheme);
input.setTheme(darkTheme);
checkbox.setTheme(lightTheme);

button.render();
input.render();
checkbox.render();

// Use the Bridge pattern when you want to divide and
// organize a monolithic class that has several variants
// of some functionality.
// Use the Bridge if you need to be able to switch
// implementations at runtime.

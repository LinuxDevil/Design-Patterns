// Abstract Factory Pattern
// https://medium.com/dev-genius/creational-pattern-series-abstract-factory-90e0fbe62a1f
// ------------------------

// The Abstract Factory Pattern provides an interface for creating
// families of related or dependent objects without specifying their
// concrete classes.

// Problem
// -------
// Imagine that you are creating a UI library, in this library you have 
// a lot of components, like the button, the input, the checkbox, etc.
// and your components have 3 main theme variants, the light theme, the
// dark theme and the high contrast theme, but unfortunately the library
// already has a lot of code that depends on the light theme, so you
// can't just change the theme class, you need to create a new class
// for each theme variant, but you don't want to create a new class
// for each theme variant, because it would be a lot of code to
// maintain, and you don't want to change the code that already exists,
// because it would be a lot of work.

// Fortunately, you can use the Abstract Factory Pattern to solve this
// problem.
// here we have family related objects 
// 1. Button, 2. Input, 3. Checkbox
// and we have 3 theme variants
// 1. LightTheme, 2. DarkTheme, 3. HighContrastTheme

/**
 * The first thing the Abstract Factory pattern suggests is to
 *  explicitly declare interfaces for each distinct product of
 *  the product family (e.g., button, checkbox or input).
 *  Then you can make all variants of products follow those
 *  interfaces. For example, all button variants can implement
 *  the IButton interface; all input table variants can implement
 *  the IInput interface, and so on.
 */

interface IButton {
    onClick(): void;
}

interface IInput {
    onChange(): void;
}

interface ICheckbox {
    onCheck(): void;
}

interface IUIFactory {
    createButton(): IButton;
    createInput(): IInput;
    createCheckbox(): ICheckbox;
}

class LightThemeUIFactory {
    createButton(): IButton {
        return new LightThemeButton();
    }
    
    createInput(): IInput {
        return new LightThemeInput();
    }
    
    createCheckbox(): ICheckbox {
        return new LightThemeCheckbox();
    }
}

class DarkThemeUIFactory {
    createButton(): IButton {
        return new DarkThemeButton();
    }
    
    createInput(): IInput {
        return new DarkThemeInput();
    }
    
    createCheckbox(): ICheckbox {
        return new DarkThemeCheckbox();
    }
}

class HighContrastThemeUIFactory {
    createButton(): IButton {
        return new HighContrastThemeButton();
    }
    
    createInput(): IInput {
        return new HighContrastThemeInput();
    }
    
    createCheckbox(): ICheckbox {
        return new HighContrastThemeCheckbox();
    }
}

class LightThemeButton implements IButton {
    onClick() {
        console.log('LightThemeButton clicked!');
    }
}

class LightThemeInput implements IInput {
    onChange() {
        console.log('LightThemeInput changed!');
    }
}

class LightThemeCheckbox implements ICheckbox {
    onCheck() {
        console.log('LightThemeCheckbox checked!');
    }
}

class DarkThemeButton implements IButton {
    onClick() {
        console.log('DarkThemeButton clicked!');
    }
}

class DarkThemeInput implements IInput {
    onChange() {
        console.log('DarkThemeInput changed!');
    }
}

class DarkThemeCheckbox implements ICheckbox {
    onCheck() {
        console.log('DarkThemeCheckbox checked!');
    }
}

class HighContrastThemeButton implements IButton {
    onClick() {
        console.log('HighContrastThemeButton clicked!');
    }
}

class HighContrastThemeInput implements IInput {
    onChange() {
        console.log('HighContrastThemeInput changed!');
    }
}

class HighContrastThemeCheckbox implements ICheckbox {
    onCheck() {
        console.log('HighContrastThemeCheckbox checked!');
    }
}

// Now you can create a UI library that can be used in different
// themes, without having to change the code that already exists.

class Application {
    // this get injected by the DI framework
    constructor(private factory: IUIFactory) {}

    createUI() {
        const button = this.factory.createButton();
        const input = this.factory.createInput();
        const checkbox = this.factory.createCheckbox();

        button.onClick();
        input.onChange();
        checkbox.onCheck();
    }
}

// Use the Abstract Factory when your code needs to work
// with various families of related products, but you
// don’t want it to depend on the concrete classes of those
// products—they might be unknown beforehand or you simply
// want to allow for future extensibility.
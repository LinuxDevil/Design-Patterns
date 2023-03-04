/**
 * Cohesion refers to the degree to which the elements 
 * within a module or class belong together and have a single, 
 * well-defined responsibility. In other words, it refers to 
 * how closely related the functionalities of a module or 
 * class are. High cohesion means that the functions and 
 * properties of a module or class are strongly related 
 * and have a clear and well-defined purpose, whereas low 
 * cohesion means that the functions and properties are 
 * loosely related and may have multiple responsibilities.
 */

// Low cohesion:
/**
 * The Vehicle class has three properties 
 * (engine, seats, and color) and three methods 
 * (drive(), paint(), and addSeats()), but they are not 
 * strongly related. The drive() method is responsible 
 * for driving the vehicle, the paint() method is responsible 
 * for painting the vehicle, and the addSeats() method is 
 * responsible for adding seats to the vehicle. These 
 * responsibilities could be split into separate classes or 
 * modules with better cohesion.
 */
class Vehicle {
    engine: string;
    seats: number;
    color: string;

    constructor(engine: string, seats: number, color: string) {
        this.engine = engine;
        this.seats = seats;
        this.color = color;
    }

    drive() {
        console.log(`Driving the ${this.color} vehicle with ${this.engine} engine`);
    }

    paint(newColor: string) {
        this.color = newColor;
        console.log(`Vehicle painted to ${this.color}`);
    }

    addSeats(newSeats: number) {
        this.seats += newSeats;
        console.log(`Vehicle now has ${this.seats} seats`);
    }
}

// Medium cohesion:
/**
 * In this example, the ShoppingCart class has four methods 
 * (addItem(), removeItem(), calculateTax(), and checkout()) 
 * that are related to shopping cart functionality. However, the calculateTax() 
 * method could be split into a separate tax calculation module or class with
 * higher cohesion.
 */
class ShoppingCart {
    items: string[];
    total: number;

    constructor() {
        this.items = [];
        this.total = 0;
    }

    addItem(item: string, price: number) {
        this.items.push(item);
        this.total += price;
    }

    removeItem(index: number, price: number) {
        this.items.splice(index, 1);
        this.total -= price;
    }

    calculateTax() {
        return this.total * 0.1;
    }

    checkout() {
        console.log(`Items: ${this.items.join(', ')}`);
        console.log(`Total: $${this.total.toFixed(2)}`);
        console.log(`Tax: $${this.calculateTax().toFixed(2)}`);
    }
}


// High cohesion:
/**
 * In this example, the Rectangle class has two methods 
 * (getArea() and getPerimeter()) that are closely related to 
 * the rectangle geometry. These methods have a clear and 
 * well-defined purpose and belong together in the same class.
 */
class Rectangle {
    width: number;
    height: number;

    constructor(width: number, height: number) {
        this.width = width;
        this.height = height;
    }

    getArea() {
        return this.width * this.height;
    }

    getPerimeter() {
        return 2 * (this.width + this.height);
    }
}


// Factory Method Pattern
// https://medium.com/dev-genius/creational-pattern-series-factory-method-e5137a1b0934
// ======================
/**
 * Factory Method is a creational design pattern that provides
 *  an interface for creating objects in a superclass,
 *  but allows subclasses to alter the type of objects
 *  that will be created.
 */

// Problem
// -------
// Imagine that you are creating a RPG game, in this game you only had
// one type of character, the warrior, but now you want to add more
// characters, like the mage, the archer, etc. but unfortunately the 
// game already has a lot of code that depends on the warrior, so you
// can't just change the character class, you need to create a new
// class for each character type, but you don't want to create a new
// class for each character type, because it would be a lot of code
// to maintain, and you don't want to change the code that already
// exists, because it would be a lot of work.
// Fortunately, you can use the Factory Method Pattern to solve this
// problem.

/**
 * The Factory Method pattern suggests that you replace direct object
 *  construction calls (using the new operator) with calls to a
 *  special factory method. Don’t worry: the objects are still 
 *  created via the new operator, but it’s being called from
 *  within the factory method. Objects returned by a factory
 *  method are often referred to as products.
 */

interface Character {
    name: string;
    health: number;
    
    attack(): void;
    defend(): void;
    // ...
}

class Warrior implements Character {
    name: string;
    health: number;
    
    constructor(name: string, health: number) {
        this.name = name;
        this.health = health;
    }
    
    attack() {
        console.log(`${this.name} attacks!`);
    }
    
    defend() {
        console.log(`${this.name} defends!`);
    }
}

class Mage implements Character {
    name: string;
    health: number;
    
    constructor(name: string, health: number) {
        this.name = name;
        this.health = health;
    }
    
    attack() {
        console.log(`${this.name} attacks!`);
    }
    
    defend() {
        console.log(`${this.name} defends!`);
    }
}

abstract class Factory {
    abstract createCharacter(
        name: string,
        health: number): Character;
}

class MaleeFactory extends Factory {
    createCharacter(name: string, health: number): Character {
        return new Warrior(name, health);
    }
}

class RangedFactory extends Factory {
    createCharacter(name: string, health: number): Character {
        return new Mage(name, health);
    }
}

class GameManager {
    // This get injected by the DI framework
    constructor(private factory: Factory) {}

    initalizeGame() {
        this.factory.createCharacter('NPC1', 100);
    }
}

// Use the Factory Method when you don’t know beforehand
// the exact types and dependencies of the objects your
// code should work with.

// Use the Factory Method when you want to save system
// resources by reusing existing objects instead of rebuilding
// them each time.
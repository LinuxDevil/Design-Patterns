// FlyWeight Design Pattern
// ------------------------

// Flyweight is a structural design pattern that
// lets you fit more objects into the available amount
// of RAM by sharing common parts of state between multiple
// objects instead of keeping all of the data in each object.

// Problem:
// Imagine that you are developing a game that has a lot of
// enemies, and each enemy has a lot of properties, like
// the position, the health, the damage ..etc, and you have
// a lot of enemies, so you would have to create a new class
// for each enemy type, and each enemy would have a lot of
// properties, so you would end up with a lot of classes.

// Fortunately, you can use the Flyweight Pattern to solve
// this problem.

interface Enemy {
    move(x: number, y: number): void;
}

class BasicEnemy implements Enemy {
    private health: number;
    private speed: number;
    private image: HTMLImageElement;

    constructor() {
        this.health = 100;
        this.speed = 1;
        this.image = new Image();
        this.image.src = 'basic_enemy.png';
    }

    public move(x: number, y: number) {
        // Move the enemy
    }
}

class EnemyFlyweightFactory {
    private cache: { [state: string]: Enemy } = {};

    public getEnemy(state: string): Enemy {
        if (!this.cache[state]) {
            this.cache[state] = new BasicEnemy();
        }
        return this.cache[state];
    }
}

class EnemyContext {
    private x: number;
    private y: number;
    private enemy: Enemy;

    constructor(x: number, y: number, enemyState: string, factory: EnemyFlyweightFactory) {
        this.x = x;
        this.y = y;
        this.enemy = factory.getEnemy(enemyState);
    }

    public move(x: number, y: number) {
        this.enemy.move(x, y);
        this.x = x;
        this.y = y;
    }

    public render() {
        // Render the enemy at the current position
    }
}

class Game {
    private enemies: EnemyContext[];
    private enemyFactory: EnemyFlyweightFactory;

    constructor() {
        this.enemies = [];
        this.enemyFactory = new EnemyFlyweightFactory();
    }

    public addEnemy(x: number, y: number, enemyState: string) {
        const enemy = new EnemyContext(x, y, enemyState, this.enemyFactory);
        this.enemies.push(enemy);
    }

    public moveEnemies() {
        for (const enemy of this.enemies) {
            const x = enemy.getX() + 1; // Example movement
            const y = enemy.getY() + 1; // Example movement
            enemy.move(x, y);
        }
    }

    public render() {
        for (const enemy of this.enemies) {
            enemy.render();
        }
    }
}

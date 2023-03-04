// Singleton Design Pattern
// https://medium.com/dev-genius/creational-pattern-series-singleton-53906d4a98d6
// ------------------------

// The Singleton Pattern ensures a class has only one instance,
// and provides a global point of access to it.

// There's three types of singletons:
// 1. Eager Singleton: It's created when the class is loaded.
// 2. Lazy Singleton: It's created when it's needed.
// 3. (Double Checked Locking) Thread Safe Singleton: It's created when it's needed and it's thread safe.

// Problem
// -------
// Imagine that you are creating a Database class, and you want to
// make sure that there's only one instance of the Database class
// in your application, so you can use the Singleton Pattern to
// solve this problem.

// Eager
class DatabaseEager {
    private static instance: DatabaseEager = new DatabaseEager();

    private constructor() { }

    public static getInstance(): DatabaseEager {
        return this.instance;
    }

    public query(sql: String): void {
        // ...
    }
}


// This is a lazy singleton
class DatabaseLazy {
    private static instance: DatabaseLazy;

    private constructor() { }

    static getInstance(): DatabaseLazy {
        if (!DatabaseLazy.instance) {
            DatabaseLazy.instance = new DatabaseLazy();
        }

        return DatabaseLazy.instance;
    }


    public query(sql: String): void {
        // ...
    }
}

// This is a Double Checked Locking singleton
class DatabaseThreadSafe {
    private static instance: DatabaseThreadSafe | null = null;

    private constructor() { }

    public static getInstance(): DatabaseThreadSafe {
        if (!this.instance) {
            synchronized(DatabaseThreadSafe) {
                if (!this.instance) {
                    this.instance = new DatabaseThreadSafe();
                }
            }
        }
        return this.instance;
    }


    public query(sql: String): void {
        // ...
    }
}

// Use the singleton pattern when you want to make sure that
// there's only one instance of a class in your application.

// Use the eager singleton when you want to create the instance
// when the class is loaded.

// Use the lazy singleton when you want to create the instance
// when it's needed.

// Use the thread safe singleton when you want to create the
// instance when it's needed and it's thread safe.

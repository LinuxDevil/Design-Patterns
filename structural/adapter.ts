// Adapter Design Pattern
// ----------------------

// It's a structural design pattern that allows objects with
// incompatible interfaces to collaborate.
// It means that you can use the Adapter Pattern to make two
// classes work together, even if their interfaces are not
// compatible.

// The Adapter Design Pattern works by creating an adapter
// class that acts as a bridge between two incompatible interfaces.
// The adapter class implements the interface required by
// the client and delegates the calls to the interface of
// the existing class. This allows the client to use the
// existing class without modifying its interface.

// TL;DR
// This is a special object that converts the interface
// of one object so that another object can understand it.

// Problem:
// Suppose you have a new client application that needs
// to interact with an existing third-party library
// for processing images. However, 
// the library's interface is not compatible with your
// application's code, and you don't have the source
// code to modify the library.
// In this case, you can use the Adapter 
// Pattern to create an adapter that converts the
// library's interface into a format that your
// application can understand without modifying
// the existing library code.

// Third-party image processing library
class ImageProcessor {
    public openImage(imageData: Buffer): void {
        // implementation for opening image
    }

    public applyFilter(filter: string): void {
        // implementation for applying filter
    }

    public saveImage(imageData: Buffer): void {
        // implementation for saving image
    }
}

// Adapter to convert third-party library interface to client interface
interface ImageEditor {
    open(filePath: string): void;
    applyEffect(effect: string): void;
    save(filePath: string): void;
}

class ImageProcessorAdapter implements ImageEditor {
    private imageProcessor: ImageProcessor;

    constructor(imageProcessor: ImageProcessor) {
        this.imageProcessor = imageProcessor;
    }

    public open(filePath: string): void {
        const imageData = this.readFile(filePath);
        this.imageProcessor.openImage(imageData);
    }

    public applyEffect(effect: string): void {
        this.imageProcessor.applyFilter(effect);
    }

    public save(filePath: string): void {
        const imageData = this.imageProcessor.getImageData();
        this.writeFile(filePath, imageData);
        this.imageProcessor.saveImage(imageData);
    }

    // Helper methods to read and write image files
    private readFile(filePath: string): Buffer {
        // implementation for reading file data
    }

    private writeFile(filePath: string, imageData: Buffer): void {
        // implementation for writing file data
    }
}

// Client code
const imageProcessor = new ImageProcessor();
const imageEditor: ImageEditor = new ImageProcessorAdapter(imageProcessor);

imageEditor.open('path/to/image.jpg');
imageEditor.applyEffect('jarar');
imageEditor.save('path/to/new_image.jpg');

// In this example, the ImageProcessorAdapter class acts as an adapter
// between the ImageProcessor library and the client code that requires
// a different interface.The adapter implements the ImageEditor interface,
// which the client code can use to open, apply effects, and save images.
// The adapter then maps these method calls to the corresponding methods
// in the ImageProcessor library, which has a different interface.The
// existing library code is not modified, and the client code can use the
// new interface to interact with the library.

// =====================
// == Another Example ==
// =====================

// Problem
// -------
// Suppose you have a legacy database API that uses a different
// interface from the new API that you want to use.
// The adapter pattern can help you to adapt the legacy API 
// to the new one without changing the existing code.
// the adapter pattern here is used to adapt the legacy API
// to the new one without changing the existing code.

interface LegacyDatabase {
    readData(id: number): any;
    writeData(id: number, data: any): void;
    removeData(id: number): void;
}

interface NewDatabase {
    get(id: number): any;
    set(id: number, data: any): void;
    delete(id: number): void;
}

class LegacyDatabaseAdapter implements NewDatabase {
    private legacyDatabase: LegacyDatabase;

    constructor(legacyDatabase: LegacyDatabase) {
        this.legacyDatabase = legacyDatabase;
    }

    get(id: number): any {
        return this.legacyDatabase.readData(id);
    }

    set(id: number, data: any): void {
        this.legacyDatabase.writeData(id, data);
    }

    delete(id: number): void {
        this.legacyDatabase.removeData(id);
    }
}

const legacyDatabase: LegacyDatabase = /* create instance of legacy database */;

const newDatabase: NewDatabase = new LegacyDatabaseAdapter(legacyDatabase);

newDatabase.set(1, { name: 'Ibrahim' });

const data = newDatabase.get(1);

console.log(data);

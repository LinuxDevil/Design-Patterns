//  Composite Design Pattern
//  ========================
//  The Composite pattern lets clients treat individual objects and compositions
//  of objects uniformly.

//  Structure
//  ---------
//  The Composite pattern consists of three types of objects: the component,
//  the leaf, and the composite. A component declares the interface for objects
//  in the composition, and implements default behavior for the interface common
//  to all classes, as appropriate. The base Component class can declare an
//  interface for accessing and managing its child components. (optional)
//  A leaf represents the end objects of a composition. A leaf has no children.
//  It defines behavior for primitive objects in the composition. A composite
//  defines behavior for components having children. It stores child components
//  and implements child-related operations in the Component interface.


// Using the Composite pattern makes sense only when the core
// model of your app can be represented as a tree.

// Problem:
// --------
// Imagine that you are creating an online store. The store sells products
// and services. Each product or service can be sold individually or as part
// of a bundle. For example, a customer can buy a book, a music CD, and a
// video DVD as a bundle. The customer can also buy each of these items
// individually.

// The Composite pattern lets you treat individual objects and compositions
// uniformly. The client code can work with simple or complex elements without
// depending on their concrete classes.

import java.util.ArrayList;
import java.util.List;

// Component
public abstract class Product {
    public abstract double getPrice();
}

// Leaf
public class Book extends Product {
    private String title;
    private double price;

    public Book(String title, double price) {
        this.title = title;
        this.price = price;
    }

    public double getPrice() {
        return price;
    }
}

// Leaf
public class MusicCD extends Product {
    private String title;
    private double price;

    public MusicCD(String title, double price) {
        this.title = title;
        this.price = price;
    }

    public double getPrice() {
        return price;
    }
}

// Leaf
public class VideoDVD extends Product {
    private String title;
    private double price;

    public VideoDVD(String title, double price) {
        this.title = title;
        this.price = price;
    }

    public double getPrice() {
        return price;
    }
}

// Composite
public class Bundle extends Product {
    private String name;
    private List<Product> products = new ArrayList<>();

    public Bundle(String name, Product... products) {
        this.name = name;
        for (Product product : products) {
            this.products.add(product);
        }
    }

    public void addProduct(Product product) {
        products.add(product);
    }

    public void removeProduct(Product product) {
        products.remove(product);
    }

    public double getPrice() {
        double totalPrice = 0;
        for (Product product : products) {
            totalPrice += product.getPrice();
        }
        return totalPrice;
    }
}

// Client code
public class OnlineStore {
    public static void main(String[] args) {
        Book book = new Book("The Lord of the Rings", 20.0);
        MusicCD musicCD = new MusicCD("Abbey Road", 15.0);
        VideoDVD videoDVD = new VideoDVD("The Godfather", 25.0);

        Bundle bundle = new Bundle("Entertainment Bundle", book, musicCD, videoDVD);

        System.out.println("Total price: " + bundle.getPrice());
    }
}

// Use the Composite pattern only when your core model can be
// represented as a tree.
// Use the Composite pattern when you want clients to be able to
// ignore the difference between compositions of objects and individual
// objects. Clients will treat all objects in the composite structure
// uniformly.

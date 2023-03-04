// Builder Design Pattern
// https://medium.com/dev-genius/creational-pattern-series-builder-355aaa46f21c
// ----------------------------------------------------------------------

// The Builder pattern is a creational design pattern
// that allows you to separate the construction of a
// complex object from its representation.
// It is used to construct a complex object
// step by step and the final step will return the object.
// The process of constructing an object should
// be generic so that it can be used to create different 
// representations of the same object.

// Problem: 
// Imagine that you are creating a city and that city requires a lot 
// of laborius steps to be completed. You need to create a house,
// then you need to create a road, then you need to create a park,
// and so on. You can create a class for each of these steps and
// then create a class that will use all of these classes to
// create a city. This is a very complex process and it is not
// easy to maintain.
// A simple solution is to create a class that extend on the base class 
// of the City, but you will have to create a new class for each
// new city that you want to create. This is not a good solution
// because you will have to create a lot of classes and it will
// be hard to maintain.
// The Builder pattern solves this problem.
// Here, the builder suggests that you create a class that will
// create a city and that class will have a method for each step
// that you need to create a city. This class will have a method
// that will return the city that you have created. This class
// will be called the Director class.

record House(String style) {}

record Road(String style) {}

record Park(String style) {}

record City(String style, House house, Road road, Park park) {}

public interface CityBuilder {
    CityBuilder setStyle(String style);
    CityBuilder buildHouse();
    CityBuilder buildRoad();
    CityBuilder buildPark();
    City getCity();
}

public class ModernCityBuilder implements CityBuilder {
    private City city;

    public ModernCityBuilder() {
        this.city = new City("Modern", null, null, null);
    }

    @Override
    public CityBuilder setStyle(String style) {
        this.city.setStyle(style);
        return this;
    }

    @Override
    public CityBuilder buildHouse() {
        this.city.setHouse(new ModernHouse());
        return this;
    }

    @Override
    public CityBuilder buildRoad() {
        this.city.setRoad(new ModernRoad());
        return this;
    }

    @Override
    public CityBuilder buildPark() {
        this.city.setPark(new ModernPark());
        return this;
    }

    @Override
    public City getCity() {
        return this.city;
    }
}

public class MedievalCityBuilder implements CityBuilder {
    private City city;

    public MedievalCityBuilder() {
        this.city = new City("Medieval", null, null, null);
    }

    @Override
    public CityBuilder setStyle(String style) {
        this.city.setStyle(style);
        return this;
    }

    @Override
    public CityBuilder buildHouse() {
        this.city.setHouse(new MedievalHouse());
        return this;
    }

    @Override
    public CityBuilder buildRoad() {
        this.city.setRoad(new MedievalRoad());
        return this;
    }

    @Override
    public CityBuilder buildPark() {
        this.city.setPark(new MedievalPark());
        return this;
    }

    @Override
    public City getCity() {
        return this.city;
    }
}

public class FuturisticCityBuilder implements CityBuilder {
    private City city;

    public FuturisticCityBuilder() {
        this.city = new City("Futuristic", null, null, null);
    }

    @Override
    public CityBuilder setStyle(String style) {
        this.city.setStyle(style);
        return this;
    }

    @Override
    public CityBuilder buildHouse() {
        this.city.setHouse(new FuturisticHouse());
        return this;
    }

    @Override
    public CityBuilder buildRoad() {
        this.city.setRoad(new FuturisticRoad());
        return this;
    }

    @Override
    public CityBuilder buildPark() {
        this.city.setPark(new FuturisticPark());
        return this;
    }

    @Override
    public City getCity() {
        return this.city;
    }
}

public class CityDirector {
    private CityBuilder cityBuilder;
    
    public void setCityBuilder(CityBuilder builder) {
        this.cityBuilder = builder;
    }
    
    public City getCity() {
        return this.cityBuilder.getCity();
    }
    
    public void constructCity() {
        this.cityBuilder.buildHouse();
        this.cityBuilder.buildRoad();
        this.cityBuilder.buildPark();
        // You can add more steps as needed
        
        // Finally, get the city
        this.cityBuilder.getCity();
    }
}

public class Application {

    @Inject
    private CityDirector director;

    @Inject
    private CityBuilder cityBuilder;

    public static void main(String[] args) {
        
        Application app = new Application();

        app.director.setCityBuilder(app.cityBuilder);
        app.director.constructCity();
        
        City city = app.director.getCity();
        System.out.println(city);
    }
}

// Use the Builder pattern to get rid of a the complex constructor
// Use the Builder pattern when you want your code to be able to
// create different representations of some product
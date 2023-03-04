// Chain of responsibility pattern
// -------------------------------

// The Chain of responsibility pattern is used to process
// varied requests, each of which may be dealt with
// by a different handler.

// Problem:
// Imagine that you are creating a Online food ordering system.
// in order to place an order, the user needs to be authenticated 
// and authorized.
// After planning, the checks must be performed in the following order:
// 1. Check if the user is logged in.
// 2. Check if the user has the required permissions.
// 3. Check if the user has the required privileges.
// 4. Check if the user has the required roles.
// 5. ... and so on.

// Request --> Authentication, Authorization, Validation, Caching --> Ordering food

// Fortunately, you can use the Chain of Responsibility pattern to
// simplify the code of the authentication and authorization checks.
// Like many other behavioral design patterns, the Chain of 
// Responsibility relies on transforming particular behaviors
// into stand-alone objects called handlers. In our case, each
// check should be extracted to its own class with a single method
// that performs the check. The request, along with its data,
// is passed to this method as an argument.
// The pattern suggests that you link these handlers
// into a chain. Each linked handler has a field for storing
// a reference to the next handler in the chain. In addition
// to processing a request, handlers pass the request further
// along the chain. The request travels along the chain until
// all handlers have had a chance to process it.

// Request -> Authentication -> Authorization -> Validation -> Caching -> Ordering food

public abstract class OrderHandler
{
    protected OrderHandler _nextHandler;

    public OrderHandler SetNext(OrderHandler handler)
    {
        _nextHandler = handler;
        return handler;
    }

    public abstract bool Handle(Order order);
}

public class AuthenticationHandler : OrderHandler
{
    public override bool Handle(Order order)
    {
        if (!order.IsAuthenticated)
        {
            Console.WriteLine("User is not authenticated!");
            return false;
        }

        return _nextHandler != null && _nextHandler.Handle(order);
    }
}

public class AuthorizationHandler : OrderHandler
{
    public override bool Handle(Order order)
    {
        if (!order.IsAuthorized)
        {
            Console.WriteLine("User is not authorized!");
            return false;
        }

        return _nextHandler != null && _nextHandler.Handle(order);
    }
}

public class ValidationHandler : OrderHandler
{
    public override bool Handle(Order order)
    {
        if (!order.IsValid)
        {
            Console.WriteLine("Order is invalid!");
            return false;
        }

        return _nextHandler != null && _nextHandler.Handle(order);
    }
}

public class CachingHandler : OrderHandler
{
    public override bool Handle(Order order)
    {
        if (!order.IsCached)
        {
            Console.WriteLine("Caching order...");
            order.IsCached = true;
        }

        return _nextHandler != null && _nextHandler.Handle(order);
    }
}

public class OrderingHandler : OrderHandler
{
    public override bool Handle(Order order)
    {
        Console.WriteLine("Ordering food...");
        return true;
    }
}

public class Order
{
    public bool IsAuthenticated { get; set; }
    public bool IsAuthorized { get; set; }
    public bool IsValid { get; set; }
    public bool IsCached { get; set; }
}

public class Client
{
    public void ProcessOrder(Order order)
    {
        OrderHandler authenticationHandler = new AuthenticationHandler();
        OrderHandler authorizationHandler = new AuthorizationHandler();
        OrderHandler validationHandler = new ValidationHandler();
        OrderHandler cachingHandler = new CachingHandler();
        OrderHandler orderingHandler = new OrderingHandler();

        authenticationHandler.SetNext(authorizationHandler)
            .SetNext(validationHandler)
            .SetNext(cachingHandler)
            .SetNext(orderingHandler);

        authenticationHandler.Handle(order);
    }
}

// Decorator Design Pattern
// ========================

// Decorator is a structural design pattern that lets you
// attach new behaviors to objects by placing these objects
// inside special wrapper objects that contain the behaviors.
// The wrapper contains a reference to the wrapped object.
// It forwards requests to the wrapped object. It can
// perform additional actions before and after forwarding
// the request.

// The Decorator pattern is often useful for adhering to the
// Single Responsibility Principle. You can divide a monolithic
// class that implements many possible variants of behavior
// into several smaller classes.

// The Decorator pattern is also useful when you need to be
// able to assign extra behaviors at runtime without breaking
// the code that uses these objects.

// Problem:
// ========

// Imagine that you are writing a notification library that lets the 
// clients send notifications to their users. The library supports
// different types of notifications, such as SMS, email, discord and slack.
// The users love the library, but they want to be able to send
// notifications to multiple channels at once. For example, they want
// to send a notification to their users via email and SMS at the same time.

// Extending a class is the first thing that comes to mind when you 
// need to alter an object’s behavior. However, inheritance has several
// serious caveats that you need to be aware of.
// Inheritance is static. You can’t alter the behavior of an existing
// object at runtime. You can only replace the whole object with another
// one that’s created from a different subclass.
// Subclasses can have just one parent class. In most languages,
// inheritance doesn’t let a class inherit behaviors of multiple
// classes at the same time.
// Fortunately, there’s a way to work around these limitations. You can
// create a decorator class.

// Interface defining the basic notification functionality
interface Notification {
    fun send(message: String)
}

// Concrete SMS notification class
class SMSNotification : Notification {
    override fun send(message: String) {
        println("Sending SMS notification: $message")
    }
}

// Concrete Slack notification class
class SlackNotification : Notification {
    override fun send(message: String) {
        println("Sending Slack notification: $message")
    }
}

// Concrete Email notification class
class EmailNotification : Notification {
    override fun send(message: String) {
        println("Sending Email notification: $message")
    }
}

// Concrete Discord notification class
class DiscordNotification : Notification {
    override fun send(message: String) {
        println("Sending Discord notification: $message")
    }
}

// Abstract base decorator class for notifications
abstract class NotificationDecorator(private val decoratedNotification: Notification) : Notification {
    override fun send(message: String) {
        decoratedNotification.send(message)
    }
}

// SMS notification decorator
class SMSNotificationDecorator(decoratedNotification: Notification) : NotificationDecorator(decoratedNotification) {
    override fun send(message: String) {
        super.send("$message [via SMS]")
    }
}

// Slack notification decorator
class SlackNotificationDecorator(decoratedNotification: Notification) : NotificationDecorator(decoratedNotification) {
    override fun send(message: String) {
        super.send("$message [via Slack]")
    }
}

// Email notification decorator
class EmailNotificationDecorator(decoratedNotification: Notification) : NotificationDecorator(decoratedNotification) {
    override fun send(message: String) {
        super.send("$message [via Email]")
    }
}

// Discord notification decorator
class DiscordNotificationDecorator(decoratedNotification: Notification) : NotificationDecorator(decoratedNotification) {
    override fun send(message: String) {
        super.send("$message [via Discord]")
    }
}

// Function to send notifications to multiple channels
fun sendNotifications(message: String, vararg channels: Notification) {
    for (channel in channels) {
        channel.send(message)
    }
}

// Example usage
fun main() {
    val smsNotification: Notification = SMSNotification()
    val slackNotification: Notification = SlackNotificationDecorator(SMSNotification())
    val emailNotification: Notification = EmailNotificationDecorator(SMSNotification())
    val discordNotification: Notification = DiscordNotificationDecorator(SlackNotificationDecorator(SMSNotification()))
    
    sendNotifications("Hello, world!", smsNotification, slackNotification, emailNotification, discordNotification)
}

// Use the Decorator pattern when you need to be able
// to assign extra behaviors to objects at runtime without 
// breaking the code that uses these objects.
// Use the pattern when it’s awkward or not possible to extend an
// object’s behavior using inheritance.
# State design pattern
# -------------------

# The State pattern is a behavioral design pattern that allows an object to
# alter its behavior when its internal state changes. It appears as if the
# object changed its class.

# The State pattern is used to create an object which represents a particular
# state and whose behavior changes based on that state. This can be a cleaner
# way for an object to change its behavior at runtime without resorting to
# large monolithic conditional statements and thus improve maintainability.

# Problem:
# --------
# Imagine a social media platform that allows users to post content and
# comment on other users' posts. The platform has two types of users: regular
# users and premium users. Regular users can only post and comment in lowercase
# letters, while premium users can post and comment in uppercase letters. The
# platform also allows users to subscribe to other users' posts and comments.
# When a user subscribes to another user, they will be notified whenever the
# other user posts or comments.

from abc import ABC, abstractmethod

class Subscriber(ABC):
    @abstractmethod
    def notify_post(self, content):
        pass

    @abstractmethod
    def notify_comment(self, content):
        pass

class RegularUserState:
    def __init__(self):
        self.subscribers = []

    def post(self, content):
        print(f"Regular user posted: {content}")
        for subscriber in self.subscribers:
            subscriber.notify_post(content)

    def comment(self, content):
        print(f"Regular user commented: {content}")
        for subscriber in self.subscribers:
            subscriber.notify_comment(content)

    def subscribe(self, target):
        self.subscribers.append(target)

    def unsubscribe(self, target):
        self.subscribers.remove(target)

class PremiumUserState:
    def __init__(self):
        self.subscribers = []

    def post(self, content):
        print(f"Premium user posted: {content.upper()}")
        for subscriber in self.subscribers:
            subscriber.notify_post(content.upper())

    def comment(self, content):
        print(f"Premium user commented: {content.upper()}")
        for subscriber in self.subscribers:
            subscriber.notify_comment(content.upper())

    def subscribe(self, target):
        self.subscribers.append(target)

    def unsubscribe(self, target):
        self.subscribers.remove(target)

class User:
    def __init__(self, name, state):
        self.name = name
        self.state = state

    def set_state(self, state):
        self.state = state

    def post(self, content):
        self.state.post(content)

    def comment(self, content):
        self.state.comment(content)

    def subscribe(self, target):
        self.state.subscribe(target)

    def unsubscribe(self, target):
        self.state.unsubscribe(target)

# Usage
class ConsoleSubscriber(Subscriber):
    def __init__(self, name):
        self.name = name

    def notify_post(self, content):
        print(f"{self.name} notified of post: {content}")

    def notify_comment(self, content):
        print(f"{self.name} notified of comment: {content}")

alice = User("Alice", RegularUserState())
bob = ConsoleSubscriber("Bob")
alice.subscribe(bob)

alice.post("Hello World") 
 # Output: Regular user posted: Hello World, Bob notified of post: Hello World
alice.comment("Nice post!") 
 # Output: Regular user commented: Nice post!, Bob notified of comment: Nice post!

alice.set_state(PremiumUserState())

alice.post("Hello World") 
 # Output: PREMIUM USER POSTED: HELLO WORLD, Bob notified of post: HELLO WORLD
alice.comment("Nice post!")
  # Output: PREMIUM USER COMMENTED: NICE POST!, Bob notified of comment: NICE POST!

alice.unsubscribe(bob)
alice.post("Another post")
  # Output: Premium user posted: ANOTHER POST

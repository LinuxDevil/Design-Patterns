// Observer Design Pattern
// -----------------------

// Observer is a behavioral design pattern that lets you define a
// subscription mechanism to notify multiple objects about any
// events that happen to the object they’re observing.

// Problem:
// Imagine that you have a blog engine that allows users to
// subscribe to your blog and receive notifications when you
// publish a new post. The blog engine is a subject, and the
// users are observers. When a new post is published, the blog
// engine notifies all subscribed users about it.

// The Observer Pattern provides a subscription mechanism
// that lets multiple objects subscribe to an event and get
// notified when the event occurs.

// The Observer Pattern is also known as the Publish-Subscribe

/**
 * Observable class that can be used to subscribe to events.
 * @description The observer pattern is a design pattern in which an object, called the subject,
 *              maintains a list of its dependents, called observers,
 *              and notifies them automatically of any state changes,
 *              typically by calling one of their methods.
 */
export class Observable<T> {
    private observers: Set<Observer<T>> = new Set();

    /**
     * I hope that you see now the value of angular
     * @description Subscribe to the observable
     * @usage candidateList.subscribe({
     *       update: (data: ICandidate[]) => {
     *          setCandidateList(data);
     *       }
     * });
     * @param observer, the observer that will be notified
     */
    subscribe(observer: Observer<T>) {
        this.observers.add(observer);
    }

    /**
     * @description Unsubscribe from the observable
     * @usage VacancyService.reloadCandidateList.unsubscribe(this);
     * @param observer
     */
    unsubscribe(observer: Observer<T>) {
        this.observers.delete(observer);
    }

    /**
     * @description Notify all observers
     * @usage VacancyService.reloadCandidateList.notify(data);
     * @param data the data that will be passed to the observers
     */
    notify(data: T) {
        this.observers.forEach((observer) => observer.update(data));
    }
}

/**
 * Observer interface
 * Used to define which methods an observer should have
 */
export interface Observer<T> {
    /**
     * One basic method to just update the data coming from the notifiable
     * @param data the data that will be passed to the observer
     */
    update(data: T): void;
}


// Usage
jobStatusUpdated: new Observable<{ status: string }>();

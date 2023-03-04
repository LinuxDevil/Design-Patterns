// Template Method Pattern
// -----------------------

// The Template Method Pattern defines the skeleton of an algorithm in a
// method, deferring some steps to subclasses. Template Method lets
// subclasses redefine certain steps of an algorithm without changing
// the algorithm's structure.

// The Template Method Pattern is also known as the "Template Method
// Design Pattern" or the "Template Method Design Pattern".

// Problem:
// Imagine that you are creating a form generator. The form generator
// should be able to generate different types of params, such as text
// fields, checkboxes, and radio buttons. The form generator should
// also be able to generate different types of forms, such as login
// forms, registration forms, and contact forms.

// Define the interface for form fields
interface FormField {
    label: string;
    render(): void;
}

// Implement the text field
class TextField implements FormField {
    constructor(public label: string) { }

    render(): void {
        console.log(`Adding ${this.label} text field...`);
    }
}

// Implement the checkbox field
class CheckboxField implements FormField {
    constructor(public label: string) { }

    render(): void {
        console.log(`Adding ${this.label} checkbox...`);
    }
}

// Implement the radio button field
class RadioButtonField implements FormField {
    constructor(public label: string) { }

    render(): void {
        console.log(`Adding ${this.label} radio button...`);
    }
}

// Define the abstract form class
abstract class Form {
    protected fields: FormField[];

    constructor(fields: FormField[]) {
        this.fields = fields;
    }

    public generateForm(): void {
        this.addHeader();
        this.addFields();
        this.addFooter();
    }

    protected abstract addHeader(): void;

    protected addFields(): void {
        this.fields.forEach((field) => {
            field.render();
        });
    }

    protected abstract addFooter(): void;
}

// Implement the login form
class LoginForm extends Form {
    constructor(fields: FormField[]) {
        super(fields);
    }

    protected addHeader(): void {
        console.log("Adding login form header...");
    }

    protected addFooter(): void {
        console.log("Adding login button...");
        console.log("Adding forgot password link...");
    }
}

// Implement the registration form
class RegistrationForm extends Form {
    constructor(fields: FormField[]) {
        super(fields);
    }

    protected addHeader(): void {
        console.log("Adding registration form header...");
    }

    protected addFooter(): void {
        console.log("Adding register button...");
    }
}

// Implement the contact form
class ContactForm extends Form {
    constructor(fields: FormField[]) {
        super(fields);
    }

    protected addHeader(): void {
        console.log("Adding contact form header...");
    }

    protected addFooter(): void {
        console.log("Adding send button...");
    }
}

// Define the form types
type FormType = "login" | "registration" | "contact";

// Define the form generator
class FormGenerator {
    static generateForm(type: FormType): void {
        let fields: FormField[] = [];
        switch (type) {
            case "login":
                fields = [new TextField("username"), new TextField("password"), new CheckboxField("remember me")];
                break;
            case "registration":
                fields = [
                    new TextField("username"),
                    new TextField("email"),
                    new TextField("password"),
                    new TextField("confirm password"),
                ];
                break;
            case "contact":
                fields = [new TextField("name"), new TextField("email"), new TextField("message")];
                break;
            default:
                throw new Error(`Invalid form type: ${type}`);
        }
        const form = FormGenerator.createForm(type, fields);
        form.generateForm();
    }

    private static createForm(type: FormType, fields: FormField[]): Form {
        switch (type) {
            case "login":
                return new LoginForm(fields);
            case "registration":
                return new RegistrationForm(fields);
            case "contact":
                return new ContactForm(fields);
            default:
                throw new Error(`Invalid form type: ${type}`);
        }
    }
}

// Usage
FormGenerator.generateForm("login");
FormGenerator.generateForm("registration");
FormGenerator.generateForm("contact");

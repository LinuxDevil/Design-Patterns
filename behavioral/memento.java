// Memento Design Pattern
// ======================

// The Memento pattern is a behavioral design pattern that lets you save and
// restore the previous state of an object without revealing the details of
// its implementation.

// Problem:
// Imagine that you are creating an online text editor. The editor allows
// users to write and edit text. The editor also allows users to undo and
// redo changes. The editor can undo and redo changes by saving the state of
// the text at a given point in time. The editor can then restore the text to
// the saved state.

// The Memento pattern solves this problem. The Memento pattern suggests that
// you create a memento object that will store the state of the text at a
// given point in time. The memento object will be created by the editor and
// it will be stored in a history list. The editor will use the history list
// to undo and redo changes.

  
interface TextMemento {
    String getState();
}

class EditorMemento implements TextMemento {
    private final String state;

    public EditorMemento(String state) {
        this.state = state;
    }

    public String getState() {
        return state;
    }
}

interface MementoManager {
    void save(TextMemento memento);
    TextMemento undo();
    TextMemento redo();
}

class TextEditor {
    private String text = "";
    private MementoManager mementoManager;

    public TextEditor(MementoManager mementoManager) {
        this.mementoManager = mementoManager;
    }

    public void write(String text) {
        saveState();
        this.text += text;
    }

    public void erase(int characters) {
        if (characters > text.length()) {
            characters = text.length();
        }
        saveState();
        this.text = this.text.substring(0, text.length() - characters);
    }

    public void undo() {
        TextMemento memento = mementoManager.undo();
        if (memento != null) {
            text = memento.getState();
        }
    }

    public void redo() {
        TextMemento memento = mementoManager.redo();
        if (memento != null) {
            text = memento.getState();
        }
    }

    private void saveState() {
        TextMemento memento = new EditorMemento(text);
        mementoManager.save(memento);
    }

    public String getText() {
        return text;
    }
}

class InMemoryMementoManager implements MementoManager {
    private List<TextMemento> history = new ArrayList<>();
    private int current = -1;

    public void save(TextMemento memento) {
        history = history.subList(0, current + 1);
        history.add(memento);
        current++;
    }

    public TextMemento undo() {
        if (current > 0) {
            current--;
            return history.get(current);
        }
        return null;
    }

    public TextMemento redo() {
        if (current < history.size() - 1) {
            current++;
            return history.get(current);
        }
        return null;
    }
}

public class Main {
    public static void main(String[] args) {
        MementoManager mementoManager = new InMemoryMementoManager();
        TextEditor editor = new TextEditor(mementoManager);
        editor.write("Hello");
        editor.write(" World");
        System.out.println(editor.getText());
         // Output: Hello World
        editor.undo();
        System.out.println(editor.getText());
         // Output: Hello
        editor.redo();
        System.out.println(editor.getText());
         // Output: Hello World
        editor.erase(6);
        System.out.println(editor.getText());
         // Output: Hello
        editor.undo();
        System.out.println(editor.getText());
         // Output: Hello World
    }
}

// Use the Memento pattern when you want to produce
// snapshots of the object’s state to be able to restore
// a previous state of the object.

// Use the pattern when direct access to the
// object’s fields/getters/setters violates its encapsulation.
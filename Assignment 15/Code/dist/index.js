"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class User {
    id;
    name;
    email;
    password;
    phone;
    age;
    constructor(id, name, email, password, phone, age) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.password = password;
        this.phone = phone;
        this.age = age;
        if (age < 18 || age > 60) {
            throw new Error("Age must be between 18 and 60.");
        }
        this.id = id;
        this.name = name;
        this.email = email;
        this.password = password;
        this.phone = phone;
        this.age = age;
    }
    displayInfo() {
        console.log(`--- User Info ---\n` +
            `ID: ${this.id}\n` +
            `Name: ${this.name}\n` +
            `Email: ${this.email}\n` +
            `Phone: ${this.phone}\n` +
            `Age: ${this.age}`);
    }
}
class Admin extends User {
    constructor(id, name, email, password, phone, age) {
        super(id, name, email, password, phone, age);
    }
    manageNotes(notebook, action, note) {
        if (action === "add" && note) {
            notebook.addNote(note);
            console.log(`Admin ${this.name} added note "${note.tittle}" to notebook.`);
        }
        else if (action === "remove" && note) {
            notebook.removeNote(note.id);
            console.log(`Admin ${this.name} removed note "${note.tittle}" from notebook.`);
        }
    }
    displayInfo() {
        super.displayInfo();
        console.log("Role: Admin");
    }
}
class Note {
    id;
    tittle;
    content;
    userId;
    constructor(id, tittle, content, author) {
        this.id = id;
        this.tittle = tittle;
        this.content = content;
        this.userId = author;
    }
    preview() {
        const maxLength = 20;
        const shortText = this.content.length > maxLength
            ? this.content.substring(0, maxLength) + "..."
            : this.content;
        return `"${this.tittle}": ${shortText}`;
    }
}
class NoteBook {
    id;
    title;
    notes = [];
    constructor(id, title) {
        this.id = id;
        this.title = title;
    }
    addNote(note) {
        this.notes.push(note);
    }
    removeNote(noteId) {
        this.notes = this.notes.filter((n) => n.id !== noteId);
    }
    getNotes() {
        return this.notes;
    }
}
class UserWithNotebooks extends User {
    notebooks = [];
    addNotebook(notebook) {
        this.notebooks.push(notebook);
    }
    getNotebooks() {
        return this.notebooks;
    }
}
class DataStorage {
    items = [];
    addItem(item) {
        this.items.push(item);
    }
    removeItem(item) {
        this.items = this.items.filter((i) => i !== item);
    }
    getAllItems() {
        return this.items;
    }
}

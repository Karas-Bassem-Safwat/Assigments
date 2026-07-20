class User {
  constructor(
    private id: string,
    public name: string,
    public email: string,
    private password: string,
    public phone: string,
    public age: number,
  ) {
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
    console.log(
      `--- User Info ---\n` +
        `ID: ${this.id}\n` +
        `Name: ${this.name}\n` +
        `Email: ${this.email}\n` +
        `Phone: ${this.phone}\n` +
        `Age: ${this.age}`,
    );
  }
}



class Admin extends User {
  constructor(
    id: string,
    name: string,
    email: string,
    password: string,
    phone: string,
    age: number,
  ) {
    super(id, name, email, password, phone, age);
  }

  public manageNotes(
    notebook: NoteBook,
    action: "add" | "remove",
    note?: Note,
  ): void {
    if (action === "add" && note) {
      notebook.addNote(note);
      console.log(
        `Admin ${this.name} added note "${note.tittle}" to notebook.`,
      );
    } else if (action === "remove" && note) {
      notebook.removeNote(note.id);
      console.log(
        `Admin ${this.name} removed note "${note.tittle}" from notebook.`,
      );
    }
  }

  public override displayInfo(): void {
    super.displayInfo();
    console.log("Role: Admin");
  }
}



class Note {
  public id: number;
  public tittle: string;
  public content: string;
  public userId: User;

  constructor(id: number, tittle: string, content: string, author: User) {
    this.id = id;
    this.tittle = tittle;
    this.content = content;
    this.userId = author;
  }

  public preview(): string {
    const maxLength = 20;
    const shortText =
      this.content.length > maxLength
        ? this.content.substring(0, maxLength) + "..."
        : this.content;
    return `"${this.tittle}": ${shortText}`;
  }
}


class NoteBook {
  public id: number;
  public title: string;
  private notes: Note[] = [];

  constructor(id: number, title: string) {
    this.id = id;
    this.title = title;
  }

  public addNote(note: Note): void {
    this.notes.push(note);
  }

  public removeNote(noteId: number): void {
    this.notes = this.notes.filter((n) => n.id !== noteId);
  }

  public getNotes(): Note[] {
    return this.notes;
  }
}



class UserWithNotebooks extends User {
  private notebooks: NoteBook[] = [];

  public addNotebook(notebook: NoteBook): void {
    this.notebooks.push(notebook);
  }

  public getNotebooks(): NoteBook[] {
    return this.notebooks;
  }
}



class DataStorage<data> {
  private items: data[] = [];

  public addItem(item: data): void {
    this.items.push(item);
  }

  public removeItem(item: data): void {
    this.items = this.items.filter((i) => i !== item);
  }

  public getAllItems(): data[] {
    return this.items;
  }
}

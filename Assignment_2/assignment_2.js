import fs from 'fs/promises'
import fsync, { Utf8Stream } from 'fs'
import ph from 'path'
// 1. Write a function that logs the current file path and directory. (0.5 Grade)
// • Output Example: {File: "/home/user/project/index.js", Dir: "/home/user/project")
console.log("1)");

console.log("================");


// 2. Write a function that takes a file path and returns its file name. (0.5 Grade)
// • Input Example: /user/files/report.pdf
// • Output Example: "report.pdf "
console.log("2)");
let fun_2 =async()=>{
try {
await fs.mkdir('./user/files',{
    recursive:true
})
await fs.writeFile("./user/files/report.pdf",'')
fs.readdir('./user/files')
} catch (error) {
    console.log(error)
}
}
fun_2()
console.log("================");


// 3. Write a function that builds a path from an object (0.5 Grade)
// • Input Example: { dir: "/folder", name: "app", ext: ".js"}
// • Output Example: "/folder/app.js"
console.log("3)");
let fun_3=async ()=>{
try {
    await fs.mkdir('folder')
    await fs.writeFile('./folder/app.js','')
    console.log(await ph.dirname("app.js"));
} catch (error) {
    console.log(error)
}
}

fun_3()
console.log("================");

// 4. Write a function that returns the file extension from a given file path. (0.5 Grade)
// • Input Example: /docs/readme.md"
// • Output Example: ".md"
console.log("4)");
let fun_4=()=>{

}
fun_4()
console.log("================");

// 5. Write a function that parses a given path and returns its name and ext. (0.5 Grade)
// • Input Example: /home/app/main.js
// • Output Example: { Name: "main", Ext: ".js" }
console.log("5)");
let fun_5=()=>{

}
fun_5()
console.log("================");

// 6. Write a function that checks whether a given path is absolute. (0.5 Grade)
// • Input Example: /home/user/file.txt
// • Output Example: true
console.log("6)");
let fun_6=()=>{

}
fun_6()
console.log("================");

// 7.Write a function that joins multiple segments (0.5 Grade)
// • Input: "src", "components", "App.js"
// • Output Example: src/components/App.js
console.log("7)");
let fun_7=()=>{

}
fun_7()
console.log("================");

// 8. Write a function that resolves a relative path to an absolute one. (0.5 Grade)
// • Input Example: ./index.js
// • Output Example: /home/user/project/src/index.js
console.log("8)");
let fun_8=()=>{

}
fun_8()
console.log("================");


// 9. Write a function that joins two paths. (0.5 Grade)
// • Input Example: /folderl, folder2/file.txt
// • Output Example: /folder1/folder2/file.txt
console.log("9)");
let fun_9=async ()=>{
console.log(ph.join('./folderl','./folder2/file.txt'));

}
fun_9()
console.log("================");


// 10. Write a function that deletes a file asynchronously. (0.5 Grade)
// • Input Example: /path/to/file.txt
// • Output Example: The file.txt is deleted.
console.log("10)");
let fun_10 = async()=>{
try {
await fs.mkdir('./path/to',{recursive: true})
await fs.writeFile("./path/to/file.txt",'')
await fs.unlink('./path/to/file.txt')
} catch (error) {
console.log(error);
}
}
fun_10()
console.log("================");

// 11. Write a function that creates a folder synchronously. (1 Grade)
// • Output Example: "Success"
console.log("11)");
let fun_11=()=>{
try {
    fsync.mkdirSync("./fun 11",{recursive:true})
    console.log("Success");
} catch (error) {
   console.log(error); 
}
}
fun_11()
console.log("================");

// 12. Create an event emitter that listens for a "start" event and logs a welcome message. (0.5 Grade)
// • Output Example: Welcome event triggered!
console.log("12)");
let fun_12=()=>{

}
fun_12()
console.log("================");

// 13. Emit a custom "login" event with a username parameter. (0.5 Grade)
// • Input Example: "Ahmed"
// • Output Example: "User logged in: Ahmed"
console.log("13)");
let fun_13=()=>{

}
fun_13()
console.log("================");

// 14. Read a file synchronously and log its contents. (1 Grade)
// • Input Example: "./notes.txt"
// Output Example: the file content => "This is a note."
console.log("14)");
let fun_14=()=>{
try {
   fsync.writeFileSync("./notes.txt",'"This is a note"') 
   console.log(fsync.readFileSync("notes.txt",'utf8') );
   
} catch (error) {
    console.log(error);   
}
}
fun_14()
console.log("================");

// 15. Write asynchronously to a file. (1 Grade)
// • Input: path: "./async.txt", content: "Async save"
console.log("15)");
let fun_15=async ()=>{
try {
    await fs.writeFile('./async.txt','Async save')
} catch (error) {
    console.log(error);
}
}
fun_15()
console.log("================");

// 16. Check if a directory exists. (0.5 Grade)
// • Input Example: "./notes.txt"
// Output Example: true
console.log("16)");
let fun_16=()=>{
try {
fsync.writeFileSync('./note.txt','')
console.log(fsync.existsSync('./note.txt')
);

} catch (error) {
console.log(error);
}
}
fun_16()
console.log("================");

// 17. Write a function that returns the OS platform and CPU architecture. (0.5 Grade)
// • Output Example: {Platform: "win32", Arch: "x64"}
console.log("17)");
let fun_17=()=>{

}
fun_17()
console.log("================");


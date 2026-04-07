import { EventEmitter } from "events";
import fs from "fs/promises";
import {createReadStream,createWriteStream, Utf8Stream} from "fs";
import http from "http";
import { json } from "stream/consumers";
import zlip from 'zlib'
import { log } from "console";
// Part1: Core Modules ( 1.5 Grades)
let readableStream = createReadStream('./big.txt', { encoding: "utf8" });
let writableStream = createWriteStream('dest.txt');
// 1. Use a readable stream to read a file in chunks and log each chunk. (0.5 Grade)
// • Input Example: "./big.txt"
// • Output Example: log each chunk

const fun_1 =  () => {

    readableStream.on("data",(data)=>{
        console.log("1)");
        console.log(data);
        console.log("===================================");
    })
return 0;

};
fun_1();

// 2. Use readable and writable streams to copy content from one file to another. (0.5 Grade)
// • Input Example: "./source.txt", "./dest.txt"
// • Output Example: File copied using streamsconsole.log("2)");

const fun_2 = () => {
    readableStream = createReadStream('source.txt',{encoding:'utf8'})
    readableStream.on("data",(data)=>{
    writableStream.write(data);
})
    readableStream.on("end",(data)=>{
    writableStream.end();
})

writableStream.on('finish',()=>{
    console.log("2)");
    console.log("Copy Success");
    console.log("===================================");
})
return 0;
};
fun_2();

// 3. Create a pipeline that reads a file, compresses it, and writes it to another file. (0.5 Grade)
// • Input Example: "./data.txt", "./data.txt.gz"

const fun_3 = (source,compressed) => {
readableStream.on("data", (chunk) => {
writableStream.write(chunk);
});
};

/*
 * =======================================================================================================
 * ..................................... gap between part 1 and part 2 .........................................
 * =======================================================================================================
*/

// Part2: Simple CRUD Operations Using HTTP 5.5 Grades):
const getusers = async () => {
    try {
        return JSON.parse(await fs.readFile("./users.json", 'utf-8'));
    } catch (error) {
        return [];
    }
}

const writeusers = async (data) => {
    await fs.writeFile("./users.json", JSON.stringify(data, null, 2));
}

http.createServer(async (req, res) => {
    const url = req.url;
    const method = req.method;
    
    if (url === "/user" && method === 'GET') {
        res.write(JSON.stringify(await getusers()));
        res.end();
    }
    else if (url.startsWith("/user/") && method === 'GET') {
        const id = parseInt(url.split('/')[2]);
        const users = await getusers();
        const user = users.find(u => u.id === id);
        if (!user) {
            res.write(JSON.stringify({ error: "User not found" }));
            return res.end();
        }
        res.write(JSON.stringify(user));
        res.end();
    }
    else if (url === "/user" && method === 'POST') {
        let data = '';
        req.on("data", (chunk) => {
            data += chunk;
        });
        req.on("end", async () => {
            await add_user(data, res);
        });
    }
    else if (url.startsWith("/updateuser/") && method === 'PATCH') {
        const id = parseInt(url.split('/')[2]);        
        let data = '';
        req.on("data", (chunk) => {
            data += chunk;
        });
        req.on("end", async () => {
            await update_user(data, id, res);
        });
    }
    else if (url.startsWith("/deleteuser/") && method === 'DELETE') {
        const id = parseInt(url.split('/')[2]);
        await delete_user(id, res);
    }
    else {
        res.write(JSON.stringify({ error: "URL or method is invalid" }));
        res.end();
    }
}).listen(3000, () => {
    console.log("server is running");
});

let add_user = async (data, res) => {
    data = JSON.parse(data);
    const users = await getusers();
    const { name, age, email } = data;
    const index = users.findIndex((element) => {
        return element.email == email;
    });
    if (index != -1) {
        res.write("email already exist");
        return res.end();
    }
    const last_id = users.length > 0 ? users[users.length - 1].id : 0;
    const new_user = {
        id: last_id + 1,
        name,
        age,
        email
    };
    users.push(new_user);
    await writeusers(users);
    res.write("user inserted successfully");
    return res.end();
}

let update_user = async (data, id, res) => {
    const users = await getusers();
    data = JSON.parse(data);
    const { name, age, email } = data;
    const index = users.findIndex((element) => {
        return element.id == id;
    });
    if (index == -1) {
        res.write("User ID not found");
        return res.end();
    }
    if (email) {
        const email_exist = users.findIndex((element) => {
            return element.email == email;
        });
        if (email_exist != -1 && email_exist != index) {
            res.write("Email already exist");
            return res.end();
        }
        users[index].email = email;
    }
    if (name) {
        users[index].name = name;
        res.write("user name updated successfully");
    }
    if (age) {
        users[index].age = age;
        res.write("user age updated successfully");
    }
    await writeusers(users);
    return res.end();
}

let delete_user = async (id, res) => {
    const users = await getusers();
    const index = users.findIndex((element) => {
        return element.id == id;
    });
    if (index == -1) {
        res.write("User ID not found");
        return res.end();
    }
    users.splice(index, 1);
    await writeusers(users);
    res.write("user deleted successfully");
    return res.end();
}

/*
 * =======================================================================================================
 * ..................................... gap between part 2 and part 3 .........................................
 * =======================================================================================================
*/

/* 
1. What is the Node.js Event Loop? (0.5 Grade)
Answer:
The event loop is a mechanism that continuously checks the call stack and event queue, allowing
Node.js to perform non-blocking asynchronous operations by moving callbacks from the queue to
the stack when the stack is empty.


2. What is Libuv and What Role Does It Play in Node.js? (0.5 Grade)
Answer:
Libuv is a cross-platform C library that implements the event loop and provides a thread pool. It
handles asynchronous 1/0 operations, file system tasks, networking, and DNS resolution,
abstracting OS differences for Node.js.


3. How Does Node.js Handle Asynchronous Operations Under the Hood? (0.5 Grade)
Answer:
Node.js offloads asynchronous operations to Libuv, which uses either the OS's native async
interfaces (for networking) or a thread pool (for file 1/0, crypto). When complete, callbacks go to
the event queue, and the event loop executes them when the call stack is empty.


4. What is the Difference Between the Call Stack, Event Queue, and Event Loop in Node.js? (0.5 Grade)
Answer:
• Call Stack: Executes synchronous code LIFO
• Event Queue: Stores completed async callbacks FIFO
• Event Loop: Monitors both, moving callbacks from queue to stack when stack is empty


5. What is the Node.js Thread Pool and How to Set the Thread Pool Size? (0.5 Grade)
Answer:
The thread pool handles blocking operations like file 1/0, DNS, and crypto. Default size is 4 threads.
Set size using process.env.w THREADPOOL SIZE = number before running the application.


6. How Does Node.js Handle Blocking and Non-Blocking Code Execution? (0.5 Grade)
Answer:
Blocking code runs synchronously on the main thread and stops execution until complete. Non-blocking
code uses callbacks, Promises, or async/await, offloading operations to Libuv so the main
thread continues executing other code, with results handled by the event loop.

*/
/* "use strict"
const FS = require("fs")

/****  it's a program that do the following:
These are the specs for this week's assignment:
  - The user can run a NodeJs to-do app
  - The user can be able to run the file using node index.js
  - There should be a "help" section that lists all the commands for how to use the app

The following commands should be present:
  - No command: show help section (node index.js)
  - help: show help section (node index.js help)
  - list: show current todo's, or show an appropriate text if there are no todos (node index.js list)
  - add: add a todo item. all the words behind "add" are entered as 1 todo item to the list (node index.js add "Buy groceries")
  - remove: remove a todo item by its 1-base index. (node index.js remove 2)
  - reset: remove all todo items from the list (node index.js reset)
  - BONUS: update: update a todo item with new text (node index.js update 3 "Wash teeth")
*/
/*
const TERMINAL_ARGUMENTS = process.argv.slice(2)
const FIRST_ARGUMENT = TERMINAL_ARGUMENTS[0]
const FILE_NAME = process.env.newFile || "./todos.txt"


function isJSON(file) {
  try { JSON.parse(file) } catch (e) { return false }
  return true
}
let myPromise = function (data) {
  return new Promise((resolve, reject)=>{
    resolve(data)
  })
}
FS.readFile("./todos.txt", "utf8", (err, data) => {
  myPromise(data).then(d => {
    console.log(d)
    JSON.stringify(d)
    FS.writeFile("./todos.txt", JSON.stringify(d).push("newItem"))
    return d
  }).then(a => {
    JSON.stringify(a)
    console.log(a)
  })
}) */

"use strict";

const fs = require('fs');

const TODOS_FILENAME = process.env["TODOS_FILENAME"] || "todos.txt";

let myTodoList = []

// Helper function definitions

let readTodosFile = (filename) => {
  return new Promise((resolve, reject) => {
    fs.readFile(filename, "utf8", (err, data) => {
      if (err) {
        if (err.code === "ENOENT") {
          // No such file or directory
          console.log("I'm sorry, friend, but that file doesn't exist.");
        } else if (err.code === "EACCES") {
          console.log("That file exists but you don't have permission.");
        } else {
          console.log(`Uh oh, an unknown error occured: ${err.message}`);
        }
        process.exit()
      }
      console.log(`Successfully read the file: ${filename}`)
      resolve(data)
    })
  })
};

let writeTodosFile = (filename, dataAsString) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(TODOS_FILENAME, dataAsString, (err) => {
      if (err) throw err;
      // Handle errors here, please

      console.log(`Saved todos file: ${filename}`);
      resolve();
    })
  })
}

let addTodoItem = (filename, todoList, itemText) => {
  todoList.push({
    message: itemText
  })
  writeTodosFile(filename, JSON.stringify(myTodoList)).then(() => console.log("Done adding todo."));
}

let showHelpMenu = () => {

}

// Program start

readTodosFile(TODOS_FILENAME).then((data) => {
  data = data || "[]"
  myTodoList = JSON.parse(data)
  let commandArgs = process.argv.slice(2)
  if (commandArgs[0] === "add") {
    addTodoItem(TODOS_FILENAME, myTodoList, commandArgs[1])
  } else {
    showHelpMenu();
  }
})
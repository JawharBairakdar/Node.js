const fs = require('fs');

const myArg = process.argv.slice(2);

let myList = myArg[0];

//else if (myList === 'add'){
//  addNewThingsTodo();
//}


function showHelp() {
  openFile('help.txt', function (error, data) {
    if (error) {
      return console.log('Error: the help file could not be displayed', error);
    }
    console.log(data);
  });
}
if (myList === 'help' || !myList) {
  showHelp();
} else if (myList === 'list') {
  listed();
} else {
  update()
}
// function listTodos() {

//     if (error) {
//       if (error.code === 'ENOENT') {
//         return console.log('Nothing to do');
//         // fs.writeFile('todo.txt');
//         // let commandArgs = process.argv.slice(2);
//         // let myTodoList = [];
//         // if (commandArgs[0] === "add") {
//         //   myTodoList.push(commandArgs[1]);
//         //   console.log(myTodoList);
//       } else {
//         return console.log('Error: Something went wrong', error);
//       }
//     }

// var todos = splitStringByNewline(data);

// if (todos.length === 0) {
//   return console.log('Nothing to do');
// }

// console.log('Your todo list looks like this');
// todos.forEach(function (element, index) {
//   index = (index + 1).toString();
//   console.log(index, element);
// }); // forEach
//   }); // open
// }// main
// function splitStringByNewline(string) {
//   console.log(string.split(","))
//   return myarr.join("\n").trim();
// }
/* string.filter(function (element) {
  element = element.join("\n").trim();
  return element.length > 0;
}); */


function listed() {
  openFile('todo.txt', function (error, data) {
    if (error) {
      console.error(error)
    } else {
      console.log(data)
    }
  })
}
function writer(data, oldData) {
  if (data && !oldData) {
    fs.writeFile("todo.txt", data.join("\n"), (e) => {
      console.error(e)
    })
  } else if (!data) {
    fs.writeFile("todo.txt", data, (e) => {
      console.error(e)
    })
  } else {
    const container = oldData.split(",")
    container.push(data)
    fs.writeFile("todo.txt", container.join("\n"), (e) => {
      console.error(e)
    })
  }
}
function update() {
  let commandArgs = process.argv.slice(2);
  if (commandArgs[0] === "add") {
    let myTodoList = [];
    myTodoList.push();
    openFile("todo.txt", function (e, data) {
      writer(commandArgs[1], data);
    })
  } else if (commandArgs[0] === "remove") {
    openFile("todo.txt", function (e, data) {
      let items = data.split("\n")
      items.splice(Number(commandArgs[1]) - 1, 1)
      writer(items)
      // writer(commandArgs[1], data);
    })
  } else if (commandArgs[0] === "reset") {
    openFile("todo.txt", function (e, data) {
      writer("")
      // writer(commandArgs[1], data);
    })
  } // condetional statment
} // update()
function openFile(fileName, callback) {
  fs.readFile(__dirname + '/' + fileName, 'utf8', function (error, data) {
    callback(error, data);
  })
}
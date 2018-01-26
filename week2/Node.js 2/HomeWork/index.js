
//  let's begain
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
const FS = require("fs")

const TERMINAL_ARGUMENTS = process.argv.slice(2)
const FIRST_ARGUMENT = TERMINAL_ARGUMENTS[0]
const FILE_NAME = process.env.newFile || "./todos.txt"
// please if you wanna create a new file you can just type before (node index.js):
// (newFile="filename") and then you can add the content to it normaly
// for editing a spicific file that you have created do the same previouse steps

/*if (process.env.newFile) { 
  FS.writeFile(process.env.newFile, data, (err) => {
    // ||what if is't exist ?!
    // ||check if the file does exist
    // ||if is't get the data and push to it
    // ||if Not just push to it <|it will automaticly create a new file|>
  })
} */
const COMMANDS = Get(FIRST_ARGUMENT)

function isJSON(file) {
  try { JSON.parse(file) } catch (e) { return false }
  return true
}

function filesWriter(data) {
  return new Promise((resolve, reject) => {
    FS.writeFile(FILE_NAME, data, (err) => {
      if (err) {
        console.error("Oops", err.message)
        reject(err)
      }
      console.log(`Saved to ${FILE_NAME} Completed`)
      resolve()
    })
  })
}


switch (FIRST_ARGUMENT) {
  case "add":
  filesReader(FILE_NAME).then(data => {
    data = data || []
    if (!isJSON(data)) {
        filesWriter(data.concat(JSON.stringify({
            item: COMMANDS.value
          })))
      } else {
        filesWriter(data.split().concat(COMMANDS.value).join("\n")).then(() => {
          console.log("completed writing file")
        })
      }
    }).catch(e => {
      console.error(e)
    })
    break
  case "list":
    filesReader(FILE_NAME).then(e => {
      console.log(e)
    })
    break
  case "remove":
    filesReader(FILE_NAME).then(e => {
      let newContent = e.split("\n")
      let removedItem = newContent.splice(Number(COMMANDS.value)-1, 1)
      filesWriter(newContent.join("\n")).then(() => {
        console.log(`delete Completed >> ${removedItem}`)
      })
    })  
    break
  case "update":
    filesReader(FILE_NAME).then(e => {
      let newContent = e.split("\n")
      let updatedItem = newContent.splice(Number(COMMANDS.value) - 1, 1, COMMANDS.lastValidValue)
      filesWriter(newContent.join("\n")).then(() => {
        console.log(`delete Completed >> ${updatedItem}`)
      })
    })  
    break
  case "reset":
    filesWriter("")
    break
  default:
    filesReader("./help").then((data) => {
      console.log(data)
    })
}



function Get(argument) {
  const index = TERMINAL_ARGUMENTS.indexOf(argument)
  if (TERMINAL_ARGUMENTS[index + 1]) {
    return {
      command: TERMINAL_ARGUMENTS[index],
      value: TERMINAL_ARGUMENTS[index + 1],
      lastValidValue: TERMINAL_ARGUMENTS[index + 2]
      // if we did have an argument that it want a two parts after it name
    }
  } else if (FIRST_ARGUMENT !== "list" && FIRST_ARGUMENT !== "help" && FIRST_ARGUMENT !== "reset") {
    console.error("Please Enter a value")
    process.exit()
  }
}
// console.log(GET("add"))
// suppose to be the last line
// the reason is if the arguments side is Empty OR it contains "help" argument, it will just show the help menu
// if (TERMINAL_ARGUMENTS.length === 0 || TERMINAL_ARGUMENTS[2] === "help") {

// }
function filesReader(fileName) {
  // this function will read the file content and return the data As a promise
  return new Promise((resolve, reject) => {
    FS.readFile(fileName, "utf8", (err, data) => {
      if (err) {
        reject(err)
        process.exit()
      }
      if (isJSON) {
        resolve(JSON.parse(data))
      } else {
        resolve(data)
      }
    })
  })
}

const fs = require("fs")

// function argCommand() {
//   let commandsList = process.argv
//   commandsList.forEach(item => {
//     let index = commandsList.indexOf(item)
//     let nextIndex = index + 1
//     console.log(nextIndex)
//     return (index === -1 || !nextIndex) ? null : commandsList[nextIndex]
//   })
// }
// console.log(argCommand())
// let argumentValue = commandsList.forEach(item => {
//   console.log(item)
// })
// let val = argumentValue

const agumentsList = process.argv
const commandsList = ["add", "remove", "reset", "help"]

// we will got a function that it contain the values of the arguments
// -> that will pas throw the function it self as an arguments &
// -> it will return the next index to the value Easely
// ** it might be better make it a callback function **
function commandValue(command) {
  const agumentsList = process.argv
  const index = agumentsList.indexOf(command)
  const item = agumentsList[index + 1]
  return item
}
let validCommandsList = agumentsList.filter(item => {
  return commandsList.includes(item)
})
let value = []
validCommandsList.forEach(item => {
  // if the return from the commandValue() is valid it will push the content to the (value) variable
  commandValue(item) ? value.push(commandValue(item)) : console.error("Please Insert a Value")
})

console.log(value)
// the next step is to set a function that do what do we wanna do with the files
function readFiles() {
  fs.readFile()
}


function writeFiles() {
  fs.writeFile("todos.txt", value, (err) => {
    if (err) throw err
    console.log("the file has been saved")
  })
}
writeFiles()

// console.log(process.env.passing_an_env_var) // undefined until defining it from the terminal 
const uuidv4 = require('uuid/v4');

/*
*   createUser
*   Creates a user.
*   @prop id {string}
*   @prop name {string}
*   @param {object}
*       name {string}
*/
const createUser = ({name= ''} = {})=>(
    {
        id:uuidv4(),
        name
    }
)

/*
*   createMessage
*   Creates a messages object.
*   @prop id {string}
*   @prop time {Date} the time in 24hr format
*   @prop message {string} actual string message
*   @prop sender {string} sender of the messsage
*   @param {object}
*       message {string}
*       sender {string}
*/
const createMessage = ({message= '', sender= ''} = {})=>(
    {
        id:uuidv4(),
        time:getTime(new Date(Date.now())),
        message,
        sender
    }
)

/*
*   createChat
*   Creates a Chat object
*   @prop id {string}
*   @prop name {string}
*   @prop messages {Array.Message}
*   @prop users {Array.string}
*   @param {object}
*       messages {Array.Message}
*       name{string}
*       users {Array.string}
*/
const createChat = ({messages= [], name= 'Community', users= []} = {})=>(
    {
        id:uuidv4(),
        name,
        messages,
        users,
        typingUsers: []
    }
)

/*
*   @param date {Date}
*   @return a string represented in 24hr time
*/
const getTime = (date)=>{
    return `${date.getHours()}:${("0"+date.getMinutes()).slice(-2)}`
}

module.exports = {
    createMessage,
    createChat,
    createUser
}
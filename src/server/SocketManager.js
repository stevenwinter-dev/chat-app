const io = require('./index.js').io

const { VERIFY_USER, USER_CONNECTED, USER_DISCONNECTED, LOGOUT, COMMUNITY_CHAT, MESSAGE_RECEIVED, MESSAGE_SENT } = require('../Events')

const { createUser, createMessage, createChat } = require('../Factories')

let connectedUsers = { }

let communityChat = createChat()


module.exports = function(socket) {
    console.log("Socket Id" + socket.id);

    let sendMessageToChatFromUser;

    // Verify Username
    socket.on(VERIFY_USER, (nickname, callback)=>{
        if(isUser(connectedUsers, nickname)){
            callback({ isUser:true, user:null })
        } else {
            callback({ isUser:false, user:createUser({name:nickname})})
        }
    })
    // User Connects with Username
    socket.on(USER_CONNECTED, (user)=>{
        connectedUsers = addUser(connectedUsers, user)
        socket.user = user

        sendMessageToChatFromUser = sendMessageToChat(user.name)

        io.emit(USER_CONNECTED, connectedUsers)
        console.log(connectedUsers);
    })
    // User disconnects
    socket.on('disconnect', ()=>{
        if("user" in socket) {
            connectedUsers = removeUser(connectedUsers, socket.user.name)

            io.emit(USER_DISCONNECTED, connectedUsers)
            console.log("Disconnect", connectedUsers);
        }
    })

    // User logouts
    socket.on(LOGOUT, ()=>{
        connectedUsers = removeUser(connectedUsers, socket.user.name)

        io.emit(USER_DISCONNECTED, connectedUsers)
        console.log("Disconnect", connectedUsers);
    })

    // Get Community Chat
    socket.on(COMMUNITY_CHAT, (callback)=>{
        callback(communityChat)
    })

    socket.on(MESSAGE_SENT, ({chatId, message})=>{
        sendMessageToChatFromUser(chatId, message)
    })
}

/*
Returns a function that will take a chat id and message
and then emit a broadcast to the chat id.
@param sender {string} username of sender
@return function (chatId, message)
*/
function sendMessageToChat(sender){
    return (chatId, message)=>{
        io.emit(`${MESSAGE_RECEIVED}-${chatId}`, createMessage({message, sender}))
    }
}

/*
Adds user list to list passed in.
@param userList {object} Object with key value pairs of users
@param user {User} the user to added to the list.
@return userList {Object} Object with key value pairs of Users
*/

function addUser(userList, user){
    let newList = Object.assign({}, userList)
    newList[user.name] = user
    return newList
}

/*
Removes user from the list passed in.
@param userList {object} Object with key value pairs of users
@param username {string} name ofuser to be removed.
@return userList {Object} Object with key value pairs of Users
*/

function removeUser(userList, username){
    let newList = Object.assign({}, userList)
    delete newList[username]
    return newList
}

/*
Check if the user is in list passed in.
@param userList {object} Object with key value pairs of users
@param username {string}
@return userList {Object} Object with key value pairs of Users
*/

function isUser(userList, username){
    return username in userList
}
import messageBroker from "./message-broker.js"

messageBroker.on('userCreated', userCreated);
messageBroker.on('userDeleted', userDeleted);

function userCreated(username) {
    // TODO: actual audit

    console.log(`Audit System: ${username}`);
}

function userDeleted(username)  {
    console.log(`Audit System (user deleted): ${username}`);
}

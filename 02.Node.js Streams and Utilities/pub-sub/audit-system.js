import messageBroker from "./message-broker.js"

messageBroker.subscribe('userCreated', userCreated);
messageBroker.subscribe('userDeleted', userDeleted);

function userCreated(username) {
    // TODO: actual audit

    console.log(`Audit System: ${username}`);
}

function userDeleted(username)  {
    console.log(`Audit System (user deleted): ${username}`);
}

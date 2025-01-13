import messageBroker from "./message-broker.js";

messageBroker.subscribe('userCreated', userCreated);

function userCreated(username) {
    console.log(`Reportign Service: ${username}`);
}

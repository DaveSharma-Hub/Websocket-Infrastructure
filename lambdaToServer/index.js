import axios from 'axios';

const endpoints = {
    CONNECT: process.env.SERVICE_ENDPOINT_CONNECT,
    DISCONNECT: process.env.SERVICE_ENDPOINT_DISCONNECT,
    MESSAGE: process.env.SERVICE_ENDPOINT_MESSAGE,
};

export const handler = async(event) => {
    const { requestContext, headers, body: ingressBody } = event;
    const { connectionId, eventType } = requestContext;
    if(!eventType in endpoints){
        return;
    }

    let body = ingressBody;
    try{
        body = JSON.parse(ingressBody);
    }catch{}

    const endpoint = endpoints[eventType];
    await axios.post(endpoint, {
        eventType: eventType,
        connectionId: connectionId,
        body: body
    }, {
        headers
    });
}
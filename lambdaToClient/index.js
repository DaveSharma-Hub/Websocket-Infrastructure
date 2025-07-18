import { 
    ApiGatewayManagementApiClient, 
    PostToConnectionCommand
} from "@aws-sdk/client-apigatewaymanagementapi"

const gatewayClient = new ApiGatewayManagementApiClient({
    region: process.env.AWS_REGION,
    credentials: {
        accessKeyId: process.env.ACCESS_KEY,
        secretAccessKey: process.env.SECRET_KEY
    },
    endpoint: process.env.WS_API_GW_ENDPOINT
});

const sendToClient = async({customEventType, clientMessage, connectionId}) => {
    const message = {
        action: 'update',
        data: {
            customEventType,
            clientMessage
        }
    };
    const input = {
        Data: Buffer.from(JSON.stringify(message)),
        ConnectionId: connectionId
    }
    await gatewayClient.send(new PostToConnectionCommand(input));
}

export const handler = async(event) => {
    const { Records } = event;
    const requests = Records.map(({Sns})=>{
        const { Message } = Sns;
        const { customEventType, clientMessage, connectionId } = JSON.parse(Message);
        return sendToClient({
            customEventType: customEventType, 
            clientMessage, 
            connectionId
        });
    });
    await Promise.all(requests);
    return {
        statusCode:200
    };
}
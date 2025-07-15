const { SNSClient, PublishCommand } = require("@aws-sdk/client-sns");

const ServerPublishNewMessage =
  ({ region, accessKey, secretKey, topicArn }) =>
  async ({ connectionId, message, customEventType }) => {
    const snsClient = new SNSClient({
      region: region,
      credentials: {
        accessKey: accessKey,
        secretKey: secretKey,
      },
    });
    const input = {
      TopicArn: topicArn,
      Message: JSON.stringify({
        connectionId: connectionId,
        clientMessage: message,
        customEventType: customEventType
      }),
    };
    await snsClient.send(new PublishCommand(input));
  };

modules.export = {
  ServerPublishNewMessage: ServerPublishNewMessage,
};


// const wsPublish = ServerPublishNewMessage({});
// async function test(){
//   await wsPublish({
//     connectionId: id,
//     message: '123',
//     customEventType:"newVideo"
//   });
//   await wsPublish({
//     connectionId: id,
//     message: '1234',
//     customEventType:"newAudio"
//   });
// }
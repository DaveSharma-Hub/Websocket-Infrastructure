class ClientSocketMessageHandler{
    constructor(){
        this.map = {};
    }

    addEvent(event, fn){
        this.map[event] = fn;
        return this;
    }

    addAllEvents(eventFunctionMap){
        this.map = eventFunctionMap;
        return this;
    }

    onMessageHandler(err){
        return async(event)=>{
            const { action, data } = event;
            if(!(action === 'update')) return;
            const { customEventType, clientMessage } = data;
            const eventExists = customEventType in this.map;
            if(eventExists){
                const fn = this.map[customEventType];
                await fn(clientMessage);
            }else if(!eventExists && err && typeof err === 'function'){
                err(`Event type for message doesnt exist: ${customEventType} with client message: ${clientMessage}`);
            }
        }
    }
}

modules.export = {
    ClientSocketMessageHandler: ClientSocketMessageHandler
}

// const handler = new ClientSocketMessageHandler();
// handler.addEvent('newMessage', (msg)=>{
//     setState((s)=>[...s, msg])
// }).addEvent('newVideo', (msg)=>{
//     setState((s)=>[...s, msg])
// }).addEvent('newAudio', (msg)=>{
//     setState((s)=>[...s, msg])
// });

// WebSocket.onmessage(handler.onMessageHandler());
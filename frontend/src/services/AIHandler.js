const url = 'ws://localhost:50001';

class AIHandler {
    constructor() {
        const ws = new WebSocket(url);
        this.socket = ws;
        this.messages = [];

        ws.addEventListener('open', (ev) => {
            console.log('Connection with IA Assistant opened succesfully');
        });

        ws.addEventListener('message', (ev) => {
            window.addAIMessage(ev.data, false);
        });
    }

    askAssistant(data) {
        this.socket.send(data);
        window.addAIMessage(data, true);
    }
}

export default AIHandler;
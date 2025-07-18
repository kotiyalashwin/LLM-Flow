import WebSocket, { WebSocketServer } from 'ws';

export const wss = new WebSocketServer({ port: 3001 });

export const connections : Map<string , WebSocket> = new Map();


wss.on('connection', (ws , req)=>{
    
    const url = new URL(req.url || "", `http://${req.headers.host}` )
    const conId = url.searchParams.get('conId')

    if(conId){
        connections.set(conId , ws)

        ws.on('close' ,()=>{
            connections.delete(conId)
        })
    }
})
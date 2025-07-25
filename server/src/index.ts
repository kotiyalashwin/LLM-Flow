import express from "express";
import { createServer } from 'http';
import runRouter from "./routes/run";
import "dotenv/config";
import cors from 'cors'; // Fixed typo: cosrs -> cors
import { FRONTEND_URL } from "./types/constants";
import { WebSocket, WebSocketServer } from "ws";
import { ratelimiter } from "./rate-limiter";

const app = express();
const server = createServer(app);
export const wss = new WebSocketServer({ server });
export const connections: Map<string, WebSocket> = new Map();

// Log WebSocket server creation
console.log('🚀 WebSocket server created and attached to HTTP server');

// Add server error handling
server.on('error', (error) => {
    console.error('❌ HTTP Server error:', error);
});

wss.on('error', (error) => {
    console.error('❌ WebSocket Server error:', error);
});

// Log when server starts listening
server.on('listening', () => {
    const address = server.address();
    console.log('🎯 HTTP Server is now listening');
    console.log('📍 Server address details:', address);
});

wss.on('connection', (ws: WebSocket, req) => {
    const url = new URL(req.url || "", `http://${req.headers.host}`);
    const conId = url.searchParams.get('conId');
    
    console.log(`New WebSocket connection attempt from ${req.socket.remoteAddress}`);
    console.log(`Connection URL: ${req.url}`);
    console.log(`Connection ID: ${conId}`);
    
    if (conId) {
        connections.set(conId, ws);
        console.log(`✅ WebSocket client connected with ID: ${conId}`);
        console.log(`📊 Total active connections: ${connections.size}`);
        
        ws.on('close', () => {
            connections.delete(conId);
            console.log(`❌ WebSocket client disconnected. ID: ${conId}`);
            console.log(`📊 Total active connections: ${connections.size}`);
        });
        
        ws.on('error', (error) => {
            console.log(`🚨 WebSocket error for connection ${conId}:`, error);
        });
    } else {
        console.log(`⚠️ WebSocket connection rejected - no conId provided`);
        ws.close(1008, 'Connection ID required');
    }
});

app.use(cors({ origin: FRONTEND_URL })); // Fixed typo: cosrs -> cors
app.use(express.json());

app.use("/run/:id", ratelimiter, runRouter);

// Changed from app.listen to server.listen
server.listen(8080, () => {
    const address = server.address();
    const port = typeof address === 'string' ? address : address?.port;
    const host = typeof address === 'string' ? 'localhost' : 'localhost';
    
    console.log("Workflow Runner is up at http://localhost:8080");
    console.log(`WebSocket server is running on ws://${host}:${port}`);
    console.log(`WebSocket server address:`, address);
    console.log(`WebSocket clients can connect to: ws://${host}:${port}?conId=<connection-id>`);
});
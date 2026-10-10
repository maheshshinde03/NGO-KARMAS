import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class WebsocketService {
    private socket!: WebSocket;
    private socketSubject: Subject<any>;

    constructor() {
        this.socketSubject = new Subject();
    }

    connect(userId: string, role: number, authorization: string): void {
        const wsUrl = `wss://17oo2npm29.execute-api.ap-south-1.amazonaws.com/dev/?user-id=${userId}&role=${role}&authorization=${authorization}`;

        // const wsUrl = 'wss://echo.websocket.org';

        // Create WebSocket connection
        this.socket = new WebSocket(wsUrl);

        // Connection opened
        this.socket.onopen = () => {
            console.log('WebSocket connected!');
        };

        // Listen for messages
        this.socket.onmessage = (event) => {
            console.log('Message from server ', event);
            this.socketSubject.next(event.data);
        };

        // Connection closed
        this.socket.onclose = (event) => {
            console.log('WebSocket is closed now.', event);
        };

        // Handle errors
        this.socket.onerror = (error) => {
            console.error('WebSocket Error: ', error);
        };
    }

    // Expose WebSocket messages as an Observable
    getMessages(): Observable<any> {
        return this.socketSubject.asObservable();
    }

    // Send data to the WebSocket server
    sendMessage(message: string): void {
        if (this.socket && this.socket.readyState === WebSocket.OPEN) {
            this.socket.send(message);
        } else {
            console.error('WebSocket is not open. Ready state is:', this.socket.readyState);
        }
    }

    // Close the WebSocket connection
    closeConnection(): void {
        if (this.socket) {
            this.socket.close();
        }
    }
}

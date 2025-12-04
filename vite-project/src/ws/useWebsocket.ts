import {useCallback, useEffect, useRef, useState} from 'react';

interface UseWebSocketOptions {
    reconnectInterval?: number;
    maxReconnectAttempts?: number;
    shouldReconnect?: boolean;
}

export const useWebSocket = (url: string, onMessage: (message: string) => void, options: UseWebSocketOptions = {}) => {
    const socketRef = useRef<WebSocket | null>(null);
    const [isConnected, setIsConnected] = useState(false);
    const reconnectTimerRef = useRef<NodeJS.Timeout | null>(null);
    const isMountedRef = useRef(true);

    const sendMessage = useCallback((message: string) => {
        if (socketRef.current?.readyState === WebSocket.OPEN) {
            socketRef.current.send(message);
            return true;
        }
        console.warn('WebSocket не подключен');
        return false;
    }, []);

    const setupWebSocket = useCallback(() => {
        if (reconnectTimerRef.current) {
            clearTimeout(reconnectTimerRef.current);
            reconnectTimerRef.current = null;
        }

        if (socketRef.current) {
            socketRef.current.close();
        }

        console.log('Установка WebSocket соединения...');

        const socket = new WebSocket(url);
        socketRef.current = socket;

        socket.onopen = () => {
            if (!isMountedRef.current) return;
            console.log('WebSocket соединение установлено');
            setIsConnected(true);
        };

        socket.onmessage = (event) => {
            if (!isMountedRef.current) return;
            const message = event.data;
            if (message.includes('Request served by')) {
                return;
            }
            onMessage(message);
        };

        socket.onerror = (error) => {
            if (!isMountedRef.current) return;
            console.error('WebSocket ошибка:', error);
            setIsConnected(false);
        };

        socket.onclose = () => {
            if (!isMountedRef.current) return;
            console.log('WebSocket соединение закрыто');
            setIsConnected(false);

            reconnectTimerRef.current = setTimeout(() => {
                if (isMountedRef.current) {
                    console.log('Автоматическое переподключение...');
                    setupWebSocket();
                }
            }, 60000);
        };
    }, [url, onMessage]);

    useEffect(() => {
        if (!isMountedRef.current) return;

        const periodicReconnectTimer = setInterval(() => {
            if (isMountedRef.current) {
                console.log('Периодическое переподключение (каждые 60 секунд)...');
                setupWebSocket();
            }
        }, 60000);
        return () => {
            clearInterval(periodicReconnectTimer);
        };
    }, [setupWebSocket]);

    useEffect(() => {
        isMountedRef.current = true;
        setupWebSocket();

        return () => {
            isMountedRef.current = false;

            if (reconnectTimerRef.current) {
                clearTimeout(reconnectTimerRef.current);
            }

            if (socketRef.current) {
                socketRef.current.close();
            }
        };
    }, [setupWebSocket]);

    return {sendMessage, isConnected};
};
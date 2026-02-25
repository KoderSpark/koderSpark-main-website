import { useEffect, useRef } from 'react';
import { io } from 'socket.io-client';

const SOCKET_URL =
    import.meta.env.VITE_SOCKET_URL ||
    import.meta.env.VITE_API_URL?.replace('/api', '');

// Shared singleton socket across the app
let socket = null;

function getSocket() {
    if (!socket || socket.disconnected) {
        socket = io(SOCKET_URL, {
            transports: ['websocket', 'polling'],
            autoConnect: true,
        });
    }
    return socket;
}

/**
 * useSocket(events)
 * @param {Object} events - { eventName: callbackFn }
 * @example useSocket({ 'tasks:updated': (data) => setTasks(data.tasks) })
 */
export function useSocket(events = {}) {
    const eventsRef = useRef(events);

    // Keep ref in sync without triggering re-renders
    useEffect(() => {
        eventsRef.current = events;
    });

    useEffect(() => {
        const s = getSocket();

        // Join student's personal room
        try {
            const raw = sessionStorage.getItem('currentUser');
            if (raw) {
                const { email } = JSON.parse(raw);
                if (email) s.emit('join', email);
            }
        } catch { /* ignore */ }

        // Register event listeners
        const handlers = {};
        Object.keys(eventsRef.current).forEach((event) => {
            handlers[event] = (...args) => eventsRef.current[event]?.(...args);
            s.on(event, handlers[event]);
        });

        return () => {
            // Clean up listeners on unmount
            Object.entries(handlers).forEach(([event, handler]) => {
                s.off(event, handler);
            });
        };
    }, []); // only run once per mount

    return getSocket();
}

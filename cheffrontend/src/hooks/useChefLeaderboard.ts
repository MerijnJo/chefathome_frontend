// File: `cheffrontend/src/hooks/useChefLeaderboard.ts`
"use client";

import { useState, useEffect, useRef } from "react";
import SockJS from "sockjs-client";
import { Client, IMessage } from "@stomp/stompjs";
import type { Chef, ConnectionStatus, UseChefLeaderboardReturn } from "../types/Chef";

export function useChefLeaderboard(): UseChefLeaderboardReturn {
    const [chefs, setChefs] = useState<Chef[]>([]);
    const [connectionStatus, setConnectionStatus] = useState<ConnectionStatus>("connecting");
    const [error, setError] = useState<string | null>(null);

    const stompClientRef = useRef<Client | null>(null);
    const reconnectTimeoutRef = useRef<number | null>(null);
    const isUnmountedRef = useRef(false);

    useEffect(() => {
        isUnmountedRef.current = false;

        const connect = () => {
            if (isUnmountedRef.current) return;

            try {
                setConnectionStatus("connecting");
                setError(null);

                const socket = new SockJS("http://localhost:8080/ws");

                const stompClient = new Client({
                    webSocketFactory: () => socket as unknown as WebSocket,
                    debug: (str) => {
                        console.log("STOMP Debug:", str);
                    },
                    reconnectDelay: 5000,
                    heartbeatIncoming: 4000,
                    heartbeatOutgoing: 4000,
                });

                stompClient.onConnect = () => {
                    if (isUnmountedRef.current) {
                        stompClient.deactivate();
                        return;
                    }

                    setConnectionStatus("connected");
                    setError(null);

                    stompClient.subscribe("/topic/chef-leaderboard", (message: IMessage) => {
                        if (isUnmountedRef.current) return;

                        try {
                            const leaderboardData: Chef[] = JSON.parse(message.body);

                            if (Array.isArray(leaderboardData)) {
                                const validChefs = leaderboardData.filter(
                                    (chef) =>
                                        chef.id !== undefined &&
                                        chef.name !== undefined &&
                                        chef.viewCount !== undefined
                                );

                                setChefs(validChefs);
                            } else {
                                console.error("Invalid leaderboard data format:", leaderboardData);
                            }
                        } catch (err) {
                            console.error("Error parsing leaderboard message:", err);
                            setError("Failed to parse leaderboard data");
                        }
                    });
                };

                stompClient.onStompError = (frame) => {
                    if (isUnmountedRef.current) return;
                    console.error("STOMP error:", frame);
                    setConnectionStatus("error");
                    setError("Connection error occurred");
                    scheduleReconnect();
                };

                stompClient.onWebSocketError = (event) => {
                    if (isUnmountedRef.current) return;
                    console.error("WebSocket error:", event);
                    setConnectionStatus("error");
                    setError("Unable to connect to server");
                };

                stompClient.onDisconnect = () => {
                    if (isUnmountedRef.current) return;
                    setConnectionStatus("disconnected");
                    scheduleReconnect();
                };

                stompClient.activate();
                stompClientRef.current = stompClient;
            } catch (err) {
                console.error("Error creating WebSocket connection:", err);
                setConnectionStatus("error");
                setError("Failed to establish connection");
                scheduleReconnect();
            }
        };

        const scheduleReconnect = () => {
            if (isUnmountedRef.current) return;

            if (reconnectTimeoutRef.current) {
                clearTimeout(reconnectTimeoutRef.current);
            }

            reconnectTimeoutRef.current = window.setTimeout(() => {
                if (!isUnmountedRef.current) {
                    connect();
                }
            }, 5000);
        };

        connect();

        return () => {
            isUnmountedRef.current = true;

            if (reconnectTimeoutRef.current) {
                clearTimeout(reconnectTimeoutRef.current);
                reconnectTimeoutRef.current = null;
            }

            if (stompClientRef.current) {
                try {
                    stompClientRef.current.deactivate();
                } catch (err) {
                    console.error("Error deactivating STOMP client:", err);
                }
                stompClientRef.current = null;
            }
        };
    }, []);

    return {
        chefs,
        connectionStatus,
        error,
    };
}

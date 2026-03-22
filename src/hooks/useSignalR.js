import { useEffect, useState } from "react";
import * as signalR from "@microsoft/signalr";

export function useOrderTracking(orderId) {
  const [status, setStatus] = useState(null);
  const [connection, setConnection] = useState(null);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    if (!orderId) return;

    const newConnection = new signalR.HubConnectionBuilder()
      .withUrl(
        `${import.meta.env.VITE_API_URL?.replace("/api", "") || "https://localhost:7001"}/hubs/orders`,
        {
          accessTokenFactory: () => localStorage.getItem("token"),
          skipNegotiation: false,
          transport: signalR.HttpTransportType.WebSockets
        }
      )
      .withAutomaticReconnect([0, 2000, 5000, 10000]) // retry intervals in ms
      .configureLogging(signalR.LogLevel.Warning)
      .build();

    setConnection(newConnection);

    return () => {
      newConnection.stop();
    };
  }, [orderId]);

  useEffect(() => {
    if (!connection) return;

    const startConnection = async () => {
      try {
        await connection.start();
        setIsConnected(true);
        console.log("SignalR connected ✓");

        // Join the order's group to receive updates for this order only
        await connection.invoke("JoinOrderGroup", orderId);

        // Listen for real-time status updates
        connection.on("OrderStatusUpdated", (data) => {
          console.log("Live update received:", data);
          if (data.orderId === orderId) {
            setStatus(data.status);
          }
        });

      } catch (err) {
        console.error("SignalR connection failed:", err);
        setIsConnected(false);
      }
    };

    // Handle reconnection events
    connection.onreconnecting(() => {
      setIsConnected(false);
      console.warn("SignalR reconnecting...");
    });

    connection.onreconnected(async () => {
      setIsConnected(true);
      console.log("SignalR reconnected ✓");
      // Rejoin the group after reconnect
      await connection.invoke("JoinOrderGroup", orderId);
    });

    connection.onclose(() => {
      setIsConnected(false);
      console.warn("SignalR connection closed");
    });

    startConnection();

    return () => {
      connection.off("OrderStatusUpdated");
      connection.stop();
    };
  }, [connection, orderId]);

  return { status, isConnected };
}


// General purpose hook - use this for any real-time event
export function useSignalREvent(hubUrl, eventName, onEvent) {
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    if (!hubUrl || !eventName) return;

    const connection = new signalR.HubConnectionBuilder()
      .withUrl(
        `${import.meta.env.VITE_API_URL?.replace("/api", "") || "https://localhost:7001"}${hubUrl}`,
        {
          accessTokenFactory: () => localStorage.getItem("token")
        }
      )
      .withAutomaticReconnect()
      .configureLogging(signalR.LogLevel.Warning)
      .build();

    const startConnection = async () => {
      try {
        await connection.start();
        setIsConnected(true);
        connection.on(eventName, onEvent);
      } catch (err) {
        console.error("SignalR error:", err);
      }
    };

    connection.onreconnected(() => setIsConnected(true));
    connection.onclose(() => setIsConnected(false));

    startConnection();
    return () => {
      connection.off(eventName);
      connection.stop();
    };
  }, [hubUrl, eventName]);

  return { isConnected };
}
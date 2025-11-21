"use client";

import { useState, useEffect } from "react";
import { CheckCircle2, AlertCircle, XCircle, Activity } from "lucide-react";
import { motion } from "framer-motion";

type ServiceStatus = "operational" | "degraded" | "down" | "maintenance";

interface Service {
  name: string;
  status: ServiceStatus;
  uptime: number;
  responseTime?: number;
}

interface ApiStatusProps {
  compact?: boolean;
  className?: string;
}

export function ApiStatus({ compact = false, className = "" }: ApiStatusProps) {
  const [services] = useState<Service[]>([
    { name: "API Payments", status: "operational", uptime: 0, responseTime: 145 },
    { name: "API Connect", status: "operational", uptime: 0, responseTime: 152 },
    { name: "API Billing", status: "operational", uptime: 0, responseTime: 138 },
    { name: "Webhooks", status: "operational", uptime: 0, responseTime: 89 },
    { name: "Dashboard", status: "operational", uptime: 0, responseTime: 234 },
  ]);
  const [currentTime, setCurrentTime] = useState<string>("");
  const [isMounted, setIsMounted] = useState(false);
  const [uptimeData, setUptimeData] = useState<number[]>([]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsMounted(true);
    // Set initial time
    setCurrentTime(new Date().toLocaleTimeString("pt-BR"));
    
    // Update time every second
    const interval = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString("pt-BR"));
    }, 1000);

    // Generate deterministic uptime data based on index
    const data = Array.from({ length: 90 }).map((_, i) => {
      // Use a deterministic function instead of Math.random()
      const seed = i * 0.1;
      return Math.sin(seed) * 0.5 + 0.5;
    });
    setUptimeData(data);

    return () => clearInterval(interval);
  }, []);

  const getStatusIcon = (status: ServiceStatus) => {
    switch (status) {
      case "operational":
        return <CheckCircle2 className="h-4 w-4 text-green-500" />;
      case "degraded":
        return <AlertCircle className="h-4 w-4 text-yellow-500" />;
      case "down":
        return <XCircle className="h-4 w-4 text-red-500" />;
      case "maintenance":
        return <Activity className="h-4 w-4 text-blue-500" />;
    }
  };

  const getStatusText = (status: ServiceStatus) => {
    switch (status) {
      case "operational":
        return "Operacional";
      case "degraded":
        return "Degradado";
      case "down":
        return "Fora do ar";
      case "maintenance":
        return "Manutenção";
    }
  };

  const getStatusColor = (status: ServiceStatus) => {
    switch (status) {
      case "operational":
        return "bg-green-500";
      case "degraded":
        return "bg-yellow-500";
      case "down":
        return "bg-red-500";
      case "maintenance":
        return "bg-blue-500";
    }
  };

  const allOperational = services.every((s) => s.status === "operational");

  if (compact) {
    return (
      <a
        href="#status"
        className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border border-border bg-background hover:bg-muted/50 transition-colors ${className}`}
      >
        <span className="relative flex h-2 w-2">
          <span className={`animate-ping absolute inline-flex h-full w-full rounded-full ${getStatusColor("operational")} opacity-75`}></span>
          <span className={`relative inline-flex rounded-full h-2 w-2 ${getStatusColor("operational")}`}></span>
        </span>
        <span className="text-sm text-muted-foreground">
          {allOperational ? "Todos os sistemas operacionais" : "Problemas detectados"}
        </span>
      </a>
    );
  }

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Overall Status */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {getStatusIcon(allOperational ? "operational" : "degraded")}
          <div>
            <h3 className="text-lg font-semibold text-foreground">
              {allOperational ? "Todos os sistemas operacionais" : "Problemas detectados"}
            </h3>
            <p className="text-sm text-muted-foreground">
              Última atualização: {isMounted ? currentTime : "--:--:--"}
            </p>
          </div>
        </div>
        <a
          href="https://status.kodano.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-accent hover:underline"
        >
          Ver página de status →
        </a>
      </div>

      {/* Services List */}
      <div className="space-y-2">
        {services.map((service, index) => (
          <motion.div
            key={service.name}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05 }}
            className="flex items-center justify-between p-3 rounded-lg border border-border bg-muted/20"
          >
            <div className="flex items-center gap-3">
              {getStatusIcon(service.status)}
              <span className="text-sm font-medium text-foreground">{service.name}</span>
            </div>
            <div className="flex items-center gap-4 text-xs text-muted-foreground">
              {service.responseTime && (
                <span className="flex items-center gap-1">
                  <span className="font-mono">{service.responseTime}ms</span>
                </span>
              )}
              <span className={`px-2 py-1 rounded text-xs font-medium ${
                service.status === "operational"
                  ? "bg-green-500/10 text-green-700 dark:text-green-400"
                  : "bg-yellow-500/10 text-yellow-700 dark:text-yellow-400"
              }`}>
                {getStatusText(service.status)}
              </span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Uptime Graph Placeholder */}
      <div className="mt-6 p-4 rounded-lg border border-border bg-muted/10">
        <h4 className="text-sm font-medium text-foreground mb-3">Últimos 90 dias</h4>
        <div className="flex items-end gap-1 h-16">
          {isMounted && uptimeData.length > 0 ? (
            uptimeData.map((value, i) => (
              <div
                key={i}
                className={`flex-1 ${
                  value > 0.02 ? "bg-green-500" : "bg-red-500"
                } rounded-sm`}
                style={{ height: `${value * 20 + 80}%` }}
              />
            ))
          ) : (
            Array.from({ length: 90 }).map((_, i) => (
              <div
                key={i}
                className="flex-1 bg-muted rounded-sm"
                style={{ height: "90%" }}
              />
            ))
          )}
        </div>
        <p className="text-xs text-muted-foreground mt-2">
          Cada barra representa a disponibilidade em um dia
        </p>
      </div>
    </div>
  );
}

// Compact status badge for header
export function StatusBadge() {
  return (
    <a
      href="#status"
      className="inline-flex items-center gap-2 px-2 py-1 rounded-md text-xs font-medium text-green-700 dark:text-green-400 bg-green-500/10 hover:bg-green-500/20 transition-colors"
    >
      <span className="relative flex h-2 w-2">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75"></span>
        <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
      </span>
      Status: Operacional
    </a>
  );
}

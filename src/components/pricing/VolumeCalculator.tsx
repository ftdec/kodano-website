"use client";

import { useState, useMemo } from "react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Calculator, TrendingDown } from "lucide-react";

// PRD 6.4: Calculadora de volume transacional
export function VolumeCalculator() {
  const [volume, setVolume] = useState(100000); // R$ 100.000 inicial

  // Cálculo de taxa com desconto por volume
  const calculateFee = (vol: number) => {
    if (vol < 50000) return 2.99;
    if (vol < 200000) return 2.79;
    if (vol < 500000) return 2.59;
    if (vol < 1000000) return 2.39;
    return 2.19; // Volume > 1M
  };

  const fee = calculateFee(volume);
  const transactionFee = 0.39;

  // Estimativa de transações (ticket médio R$ 50)
  const avgTicket = 50;
  const transactionCount = Math.floor(volume / avgTicket);

  // Cálculo de custos
  const percentageCost = volume * (fee / 100);
  const fixedCost = transactionCount * transactionFee;
  const totalCost = percentageCost + fixedCost;
  const effectiveRate = (totalCost / volume) * 100;

  // Comparação com taxas tradicionais (3.5% + R$ 0.49)
  const traditionalPercentageCost = volume * 0.035;
  const traditionalFixedCost = transactionCount * 0.49;
  const traditionalTotalCost = traditionalPercentageCost + traditionalFixedCost;
  const savings = traditionalTotalCost - totalCost;
  const savingsPercentage = (savings / traditionalTotalCost) * 100;

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value);
  };

  const formatNumber = (value: number) => {
    return new Intl.NumberFormat("pt-BR").format(value);
  };

  // Valores de slider
  const volumeOptions = [
    { value: 10000, label: "R$ 10k" },
    { value: 50000, label: "R$ 50k" },
    { value: 100000, label: "R$ 100k" },
    { value: 250000, label: "R$ 250k" },
    { value: 500000, label: "R$ 500k" },
    { value: 1000000, label: "R$ 1M" },
    { value: 2000000, label: "R$ 2M" },
    { value: 5000000, label: "R$ 5M" },
  ];

  const sliderValue = useMemo(() => {
    // Mapear volume para posição no slider (0-100)
    const minLog = Math.log(10000);
    const maxLog = Math.log(5000000);
    const currentLog = Math.log(volume);
    return ((currentLog - minLog) / (maxLog - minLog)) * 100;
  }, [volume]);

  const handleSliderChange = (value: number) => {
    // Mapear posição do slider para volume (escala logarítmica)
    const minLog = Math.log(10000);
    const maxLog = Math.log(5000000);
    const logValue = minLog + (value / 100) * (maxLog - minLog);
    const newVolume = Math.round(Math.exp(logValue) / 1000) * 1000;
    setVolume(Math.max(10000, Math.min(5000000, newVolume)));
  };

  return (
    <Card className="border-accent/30 bg-gradient-to-br from-primary/5 to-accent/5 overflow-hidden">
      <CardHeader>
        <div className="flex items-center space-x-3">
          <div className="p-2 rounded-lg bg-accent/20">
            <Calculator className="h-6 w-6 text-accent" />
          </div>
          <div>
            <h3 className="text-2xl font-bold font-[family-name:var(--font-poppins)] text-foreground">
              Calculadora de Custos
            </h3>
            <p className="text-sm text-muted-foreground">
              Calcule quanto você pagará por mês
            </p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Volume Slider */}
        <div className="space-y-4">
          <div className="flex justify-between items-baseline">
            <label className="text-sm font-medium text-foreground">
              Volume mensal
            </label>
            <span className="text-3xl font-bold text-accent">
              {formatCurrency(volume)}
            </span>
          </div>

          <input
            type="range"
            min="0"
            max="100"
            step="0.5"
            value={sliderValue}
            onChange={(e) => handleSliderChange(parseFloat(e.target.value))}
            className="w-full h-2 bg-accent/20 rounded-lg appearance-none cursor-pointer accent-accent slider"
            style={{
              background: `linear-gradient(to right, hsl(var(--accent)) 0%, hsl(var(--accent)) ${sliderValue}%, hsl(var(--accent) / 0.2) ${sliderValue}%, hsl(var(--accent) / 0.2) 100%)`,
            }}
          />

          <div className="flex justify-between text-xs text-muted-foreground">
            {volumeOptions.map((opt, idx) => (
              <button
                key={idx}
                onClick={() => setVolume(opt.value)}
                className="hover:text-accent transition-colors"
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        {/* Resultados */}
        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 rounded-lg bg-background/80 backdrop-blur-sm">
            <p className="text-xs text-muted-foreground mb-1">Taxa aplicada</p>
            <p className="text-2xl font-bold text-foreground">{fee}%</p>
            <p className="text-xs text-muted-foreground">
              + {formatCurrency(transactionFee)} por transação
            </p>
          </div>

          <div className="p-4 rounded-lg bg-background/80 backdrop-blur-sm">
            <p className="text-xs text-muted-foreground mb-1">Transações estimadas</p>
            <p className="text-2xl font-bold text-foreground">{formatNumber(transactionCount)}</p>
            <p className="text-xs text-muted-foreground">
              Ticket médio: {formatCurrency(avgTicket)}
            </p>
          </div>

          <div className="p-4 rounded-lg bg-background/80 backdrop-blur-sm">
            <p className="text-xs text-muted-foreground mb-1">Custo total/mês</p>
            <p className="text-2xl font-bold text-accent">{formatCurrency(totalCost)}</p>
            <p className="text-xs text-muted-foreground">
              Taxa efetiva: {effectiveRate.toFixed(2)}%
            </p>
          </div>

          <div className="p-4 rounded-lg bg-accent/10 backdrop-blur-sm border border-accent/20">
            <p className="text-xs text-accent dark:text-accent mb-1 flex items-center">
              <TrendingDown className="h-3 w-3 mr-1" />
              Economia vs. mercado
            </p>
            <p className="text-2xl font-bold text-accent dark:text-accent">
              {formatCurrency(savings)}
            </p>
            <p className="text-xs text-accent/70 dark:text-accent/70">
              {savingsPercentage.toFixed(1)}% mais barato
            </p>
          </div>
        </div>

        {/* Breakdown detalhado */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 rounded-lg bg-muted/30 space-y-2 text-sm"
        >
          <div className="flex justify-between">
            <span className="text-muted-foreground">Taxa percentual ({fee}%)</span>
            <span className="font-semibold text-foreground">{formatCurrency(percentageCost)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">
              Taxa fixa ({formatNumber(transactionCount)} × {formatCurrency(transactionFee)})
            </span>
            <span className="font-semibold text-foreground">{formatCurrency(fixedCost)}</span>
          </div>
          <div className="flex justify-between pt-2 border-t border-border">
            <span className="font-semibold text-foreground">Total</span>
            <span className="font-bold text-accent">{formatCurrency(totalCost)}</span>
          </div>
        </motion.div>

        <p className="text-xs text-muted-foreground text-center">
          * Cálculo estimado. Valores exatos dependem do mix de métodos de pagamento e outras variáveis.
        </p>
      </CardContent>
    </Card>
  );
}

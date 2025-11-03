"use client";

import { useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus, oneLight } from "react-syntax-highlighter/dist/esm/styles/prism";
import { Button } from "@/components/ui/button";
import { Check, Copy, Terminal } from "lucide-react";
import { toast } from "react-hot-toast";
import { useTheme } from "next-themes";

interface CodeBlockProps {
  code: string;
  language?: string;
  showLineNumbers?: boolean;
  className?: string;
  title?: string;
  filename?: string;
}

export function CodeBlock({
  code,
  language = "typescript",
  showLineNumbers = true,
  className = "",
  title,
  filename,
}: CodeBlockProps) {
  const [copied, setCopied] = useState(false);
  const { theme } = useTheme();

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      toast.success("Código copiado!");
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      toast.error("Erro ao copiar código");
    }
  };

  // Choose style based on theme
  const codeStyle = theme === "dark" ? vscDarkPlus : oneLight;

  return (
    <div className={`relative group rounded-lg border border-border overflow-hidden ${className}`}>
      {/* Header */}
      {(title || filename) && (
        <div className="flex items-center justify-between px-4 py-2 bg-muted/30 border-b border-border">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Terminal className="h-4 w-4" />
            <span className="font-medium">{title || filename}</span>
            {language && (
              <span className="px-2 py-0.5 text-xs bg-accent/10 text-accent rounded">
                {language}
              </span>
            )}
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="h-7 text-xs"
            onClick={copyToClipboard}
          >
            {copied ? (
              <>
                <Check className="h-3 w-3 mr-1" />
                Copiado!
              </>
            ) : (
              <>
                <Copy className="h-3 w-3 mr-1" />
                Copiar
              </>
            )}
          </Button>
        </div>
      )}

      {/* Code */}
      <div className="relative">
        {!title && !filename && (
          <Button
            variant="ghost"
            size="sm"
            className="absolute right-2 top-2 opacity-0 group-hover:opacity-100 transition-opacity z-10 bg-background/80 backdrop-blur-sm"
            onClick={copyToClipboard}
          >
            {copied ? (
              <>
                <Check className="h-4 w-4 mr-1" />
                Copiado!
              </>
            ) : (
              <>
                <Copy className="h-4 w-4 mr-1" />
                Copiar
              </>
            )}
          </Button>
        )}
        <SyntaxHighlighter
          language={language}
          style={codeStyle}
          showLineNumbers={showLineNumbers}
          customStyle={{
            margin: 0,
            padding: "1rem",
            fontSize: "0.875rem",
            background: "transparent",
          }}
          wrapLines
          wrapLongLines
        >
          {code}
        </SyntaxHighlighter>
      </div>
    </div>
  );
}

// Inline code component
export function InlineCode({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <code
      className={`px-1.5 py-0.5 rounded text-sm bg-muted font-mono text-foreground ${className}`}
    >
      {children}
    </code>
  );
}

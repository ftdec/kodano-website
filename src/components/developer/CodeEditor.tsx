"use client";

import { useState } from "react";
import Editor from "@monaco-editor/react";
import { Button } from "@/components/ui/button";
import { Play, Copy, Check, Download, RotateCcw } from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "react-hot-toast";

interface CodeEditorProps {
  defaultValue?: string;
  language?: string;
  height?: string;
  readOnly?: boolean;
  showActions?: boolean;
  onRun?: (code: string) => void;
  className?: string;
}

export function CodeEditor({
  defaultValue = "",
  language = "javascript",
  height = "400px",
  readOnly = false,
  showActions = true,
  onRun,
  className = "",
}: CodeEditorProps) {
  const [code, setCode] = useState(defaultValue);
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      toast.success("Código copiado!");
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error("Erro ao copiar código");
    }
  };

  const handleRun = () => {
    if (onRun) {
      onRun(code);
      toast.success("Executando código...");
    }
  };

  const handleReset = () => {
    setCode(defaultValue);
    toast.success("Código restaurado");
  };

  const handleDownload = () => {
    const blob = new Blob([code], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `code.${language}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast.success("Código baixado!");
  };

  return (
    <div className={`aurora-card overflow-hidden ${className}`}>
      {showActions && (
        <div className="flex items-center justify-between px-4 py-3 border-b border-border/50 bg-muted/30">
          <div className="flex items-center gap-2">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-500/80" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
              <div className="w-3 h-3 rounded-full bg-accent/80" />
            </div>
            <span className="text-sm text-muted-foreground ml-4">
              {language}
            </span>
          </div>

          <div className="flex items-center gap-2">
            {!readOnly && (
              <Button
                variant="ghost"
                size="sm"
                onClick={handleReset}
                className="h-8 text-xs"
              >
                <RotateCcw className="h-3 w-3 mr-1" />
                Restaurar
              </Button>
            )}
            <Button
              variant="ghost"
              size="sm"
              onClick={handleCopy}
              className="h-8 text-xs"
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
            <Button
              variant="ghost"
              size="sm"
              onClick={handleDownload}
              className="h-8 text-xs"
            >
              <Download className="h-3 w-3 mr-1" />
              Baixar
            </Button>
            {onRun && !readOnly && (
              <Button
                size="sm"
                onClick={handleRun}
                className="h-8 text-xs aurora-button"
              >
                <Play className="h-3 w-3 mr-1" />
                Executar
              </Button>
            )}
          </div>
        </div>
      )}

      <Editor
        height={height}
        defaultLanguage={language}
        value={code}
        onChange={(value) => setCode(value || "")}
        theme="vs-dark"
        options={{
          readOnly,
          minimap: { enabled: false },
          fontSize: 14,
          lineNumbers: "on",
          roundedSelection: true,
          scrollBeyondLastLine: false,
          automaticLayout: true,
          tabSize: 2,
          wordWrap: "on",
          formatOnPaste: true,
          formatOnType: true,
          suggest: {
            showMethods: true,
            showFunctions: true,
            showConstructors: true,
            showFields: true,
            showVariables: true,
            showClasses: true,
            showStructs: true,
            showInterfaces: true,
            showModules: true,
            showProperties: true,
            showEvents: true,
            showOperators: true,
            showUnits: true,
            showValues: true,
            showConstants: true,
            showEnums: true,
            showEnumMembers: true,
            showKeywords: true,
            showWords: true,
            showColors: true,
            showFiles: true,
            showReferences: true,
            showFolders: true,
            showTypeParameters: true,
            showSnippets: true,
          },
        }}
        loading={
          <div className="flex items-center justify-center h-full">
            <div className="aurora-glow">
              <div className="text-sm text-muted-foreground">
                Carregando editor...
              </div>
            </div>
          </div>
        }
      />
    </div>
  );
}

// Multi-file editor component
interface File {
  name: string;
  language: string;
  content: string;
}

interface MultiFileEditorProps {
  files: File[];
  className?: string;
  onRun?: (files: File[]) => void;
}

export function MultiFileEditor({
  files: initialFiles,
  className = "",
  onRun,
}: MultiFileEditorProps) {
  const [files] = useState(initialFiles);
  const [activeFileIndex, setActiveFileIndex] = useState(0);

  const activeFile = files[activeFileIndex];

  const handleRun = (code: string) => {
    // Update current file
    const updatedFiles = files.map((file, index) =>
      index === activeFileIndex ? { ...file, content: code } : file
    );

    if (onRun) {
      onRun(updatedFiles);
    }
  };

  return (
    <div className={`aurora-card overflow-hidden ${className}`}>
      {/* File tabs */}
      <div className="flex items-center gap-1 px-2 py-2 border-b border-border/50 bg-muted/30 overflow-x-auto">
        {files.map((file, index) => (
          <motion.button
            key={index}
            onClick={() => setActiveFileIndex(index)}
            className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
              activeFileIndex === index
                ? "bg-background text-foreground"
                : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
            }`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {file.name}
          </motion.button>
        ))}
      </div>

      <CodeEditor
        defaultValue={activeFile.content}
        language={activeFile.language}
        showActions={true}
        onRun={handleRun}
      />
    </div>
  );
}

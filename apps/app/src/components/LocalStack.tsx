import { Copy, Download, Trash } from "lucide-react";
import React from "react";
import { Button } from "./ui/button";

type StackData = {
  store: string;
  aiResult?: Record<string, string>;
  date?: string;
  aboutProject?: { projectName: string };
  stackDetails?: { name: string }[];
};

export default function StackViewer() {
  const stackItems: StackData[] = Object.keys(localStorage)
    .filter((key) => key.startsWith("stack-"))
    .map((key) => {
      try {
        return JSON.parse(localStorage.getItem(key) || "{}") as StackData;
      } catch {
        return { store: "", aiResult: {} };
      }
    });

  const downloadFile = (filename: string, content: string) => {
    const blob = new Blob([content], { type: "text/plain" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = filename;
    a.click();
    URL.revokeObjectURL(a.href);
  };
  const downloadZip = async (files: Record<string, string>) => {
    const JSZip = (await import("jszip")).default;
    const zip = new JSZip();
    Object.entries(files).forEach(([filename, content]) => {
      zip.file(filename, content);
    });
    const blob = await zip.generateAsync({ type: "blob" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "files.zip";
    a.click();
    URL.revokeObjectURL(a.href);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="space-y-3 mb-1">
      {stackItems.length === 0 && (
        <div className="text-gray-500 text-center text-sm py-3 bg-gray-50 border border-gray-200 rounded-md">
          No locally stored stack
        </div>
      )}

      {stackItems.map((item, idx) => (
        <div
          key={idx}
          className="p-4 rounded-lg border border-gray-200 bg-white shadow-sm space-y-3"
        >
          {/* Header */}
          <div className="flex justify-between items-center text-xs text-gray-600">
            <span className="px-2 py-1 rounded-md bg-gray-100 border border-gray-200">
              {item.store}
            </span>
            <span className="truncate font-medium">{item.aboutProject?.projectName || 'No Name'}</span>
            <span className="px-2 py-1 rounded-md bg-gray-100 border border-gray-200">
              {new Intl.DateTimeFormat('en-US', {
                month: 'short',
                year: '2-digit',
                day: 'numeric',
              }).format(new Date(item.date || 0))}
            </span>
          </div>

          {/* Tags */}
          {item.stackDetails && item.stackDetails.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {item.stackDetails.map((s, i) => (
                <div
                  key={i}
                  className="whitespace-nowrap border border-gray-200 rounded-md px-2 py-1 bg-gray-50 text-xs text-gray-700"
                >
                  {s.name}
                </div>
              ))}
            </div>
          )}

          {/* Files */}
          {item.aiResult && (
            <div className="grid grid-cols-2 gap-2">
              {Object.keys(item.aiResult).map((filename) => (
                <div
                  key={filename}
                  className="flex items-center gap-2 px-2 py-1.5 rounded-md bg-gray-50 text-xs text-gray-700 border border-gray-200"
                >
                  <span className="flex-1 truncate">{filename}</span>
                  <button
                    onClick={() => copyToClipboard(item.aiResult![filename])}
                    className="hover:text-green-500 transition-colors"
                  >
                    <Copy size={14} />
                  </button>
                  <button
                    onClick={() => downloadFile(filename, item.aiResult![filename])}
                    className="hover:text-blue-500 transition-colors"
                  >
                    <Download size={14} />
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* Zip Download */}
          {item.aiResult && Object.keys(item.aiResult).length > 1 && (
            <div className="flex  gap-2">
              <Button
                variant={"outline"}
                className="flex-1 rounded-md bg-gray-100 transition-colors"
                onClick={() => downloadZip(item.aiResult!)}
              >
                Download ZIP
              </Button>
              <Button><Trash/></Button>
            </div>
          )}
        </div>
      ))}
    </div>




  );
}

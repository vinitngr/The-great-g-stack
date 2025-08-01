import { useState } from "react";
import {
    Card,
    CardHeader,
    CardTitle,
    CardContent,
    CardFooter,
    CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Copy, DownloadIcon } from "lucide-react";
import { SelectedStackItem } from "./Generator";

type AiResult = Record<string, string>;

type ResultProps = {
    loading: boolean
    projectName: string;
    stackDetails: SelectedStackItem[];
    aiResult: AiResult;
    onPublish: () => void;
    onDownloadFolder?: () => void;
};
export function ResultPage({ projectName, stackDetails, aiResult, onPublish, loading }: ResultProps) {
    const [activeTab, setActiveTab] = useState(Object.keys(aiResult)[0] || "");

    const handleCopy = () => {
        if (!activeTab) return;
        navigator.clipboard.writeText(aiResult[activeTab] || "");
    };

    const handleDownload = () => {
        if (!activeTab) return;
        const blob = new Blob([aiResult[activeTab]], { type: "text/plain" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = activeTab;
        a.click();
        URL.revokeObjectURL(url);
    };

    const handleDownloadFolder = () => {
        Object.entries(aiResult).forEach(([filename, content]) => {
            const blob = new Blob([content], { type: "text/plain" });
            const url = URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = filename;
            a.click();
            URL.revokeObjectURL(url);
        });
    };

    return (
        <div className="p-8 max-w-5xl mx-auto font-sans">
            <Card className="mb-2 flex justify-between">
                <CardHeader>
                    <CardTitle className="text-xl text-center">{projectName}</CardTitle>
                    <CardDescription className="text-center">description</CardDescription>
                </CardHeader>
                <CardFooter className="flex gap-4 justify-center">
                    <Button variant="outline" onClick={handleDownloadFolder}>Download</Button>
                    <Button variant="outline" onClick={() => localStorage.setItem(`stack-${projectName}`, JSON.stringify(aiResult))}>LocalStore</Button>
                    <Button onClick={onPublish}>Publish</Button>
                </CardFooter>
            </Card>

            <Card className="mb-2">
                <CardHeader>
                    <CardTitle>Selected Stack Details</CardTitle>
                </CardHeader>
                <CardContent>
                    <ul className="list-disc pl-5 space-y-1 grid grid-cols-5">
                        {stackDetails.map((stack, i) => (
                            <li key={i}>{stack.name}</li>
                        ))}
                    </ul>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <nav className="flex space-x-4 border-b border-gray-200">
                        {Object.keys(aiResult).map((key) => (
                            <button
                                key={key}
                                onClick={() => setActiveTab(key)}
                                className={`pb-2 px-4 font-semibold cursor-pointer border-b-2 ${activeTab === key ? "border-blue-600 text-blue-700" : "border-transparent hover:text-blue-600"
                                    }`}
                            >
                                {key}
                            </button>
                        ))}
                    </nav>
                </CardHeader>
                {
                    loading ? <div className="flex justify-center items-center text-purple-500">Ai is generating your stack...</div> : (

                        <CardContent className="relative">
                            <div className="absolute flex gap-4 top-2 right-12">
                                <div onClick={handleCopy} className="cursor-pointer"><Copy /></div>
                                <div onClick={handleDownload} className="cursor-pointer"><DownloadIcon /></div>
                            </div>

                            <pre
                                className="bg-gray-100 p-10 rounded-md overflow-auto max-h-96 whitespace-pre-wrap font-mono"
                                spellCheck={false}
                            >
                                {aiResult[activeTab]}
                            </pre>
                        </CardContent>
                    )
                }
            </Card>
        </div>
    );
}
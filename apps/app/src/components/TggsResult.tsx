import { useEffect, useState } from "react";
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
import { AboutProject, SelectedStackItem } from "./Generator";
import JSZip from "jszip";
import { saveAs } from "file-saver";

type AiResult = Record<string, string>;

type ResultProps = {
    loading: boolean
    projectName: string;
    stackDetails: SelectedStackItem[];
    aiResult: AiResult;
    onPublish: () => void;
    onDownloadFolder?: () => void;
    aboutProject: AboutProject;
    error?: string;
};
export function ResultPage({ projectName, stackDetails, aiResult, onPublish, loading, aboutProject, error }: ResultProps) {
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

    useEffect(() => {
        setActiveTab(Object.keys(aiResult)[0] || "");
    } , [aiResult, loading])


    const handleDownloadFolder = async () => {
        const zip = new JSZip();

        Object.entries(aiResult).forEach(([filename, content]) => {
            zip.file(filename, content);
        });

        const blob = await zip.generateAsync({ type: "blob" });
        saveAs(blob, `${aboutProject.projectName || ''}.zip`);
    };

    return (
        <div className="p-8 max-w-5xl mx-auto font-sans">
            <Card className="mb-2 flex justify-between bg-gray-800">
                <CardHeader>
                    <CardTitle className="text-xl text-white text-center">{aboutProject.projectName || "GStack"}</CardTitle>
                    <CardDescription className="text-center text-gray-300">{aboutProject.description || "no Description"}</CardDescription>
                </CardHeader>
                <CardFooter className="flex gap-4 justify-center">
                    <Button className="cursor-pointer" onClick={handleDownloadFolder}>Download</Button>
                    <Button className="cursor-pointer" onClick={() => localStorage.setItem(`stack-${projectName}`, JSON.stringify({ store: "local", aiResult, date: new Date(), stackDetails, aboutProject }))}>LocalStore</Button>
                    <Button onClick={onPublish} variant={"secondary"} className="cursor-pointer">Upload</Button>
                </CardFooter>
            </Card>

            <Card className="mb-2">
                <CardHeader className="gap-0">
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
                    loading ? <div className="flex justify-center items-center text-slate-950">Ai is generating your stack...</div> : (

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

                {!loading && error ? (
                    (() => {
                        try {
                            const errObj = typeof error === "string" ? JSON.parse(error) : error;
                            const msg = errObj?.error?.message || errObj?.message || "Unknown error";
                            const code = errObj?.error?.code || errObj?.code || "";
                            return (
                                <div className="px-6 text-red-600 whitespace-pre-wrap">
                                    <strong>Error{code && ` #${code}`}:</strong> {msg}
                                </div>
                            );
                        } catch {
                            return <pre className="px-6 text-red-600 whitespace-pre-wrap">{error}</pre>;
                        }
                    })()
                ) : !loading && !aiResult?.['setup.sh'] ? (
                    <div className="px-6">
                        Broken Result
                        <pre>{JSON.stringify(aiResult, null, 2)}</pre>
                    </div>
                ) : null}


            </Card>
        </div>
    );
}
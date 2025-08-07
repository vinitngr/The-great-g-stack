import { AboutProject } from "./Generator";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Label } from "@/components/ui/label";

const LEVEL_OPTIONS = [
    { value: "beginner", label: "Beginner" },
    { value: "intermediate", label: "Intermediate" },
    { value: "advanced", label: "Advanced" },
    { value: "expert", label: "Expert" },
];

const PROJECT_TYPE_OPTIONS = [
    { value: "personal", label: "Personal" },
    { value: "portfolio", label: "Portfolio" },
    { value: "ecommerce", label: "Ecommerce" },
    { value: "healthcare", label: "Healthcare" },
    { value: "education", label: "Education" },
    { value: "finance", label: "Finance" },
    { value: "social", label: "Social" },
    { value: "entertainment", label: "Entertainment" },
    { value: "productivity", label: "Productivity" },
    { value: "startup-saas", label: "Startup SaaS" },
    { value: "enterprise", label: "Enterprise" },
    { value: "logistics", label: "Logistics" },
    { value: "travel", label: "Travel" },
    { value: "real-estate", label: "Real Estate" },
    { value: "gaming", label: "Gaming" },
    { value: "blog", label: "Blog" },
    { value: "news", label: "News" },
    { value: "crypto", label: "Crypto" },
    { value: "ai", label: "AI" },
    { value: "iot", label: "IoT" },
    { value: "open-source", label: "Open Source" },
    { value: "internal-tool", label: "Internal Tool" },
    { value: "other", label: "Other" },
];

type Props = {
    aboutProject: AboutProject;
    setAboutProject: React.Dispatch<React.SetStateAction<AboutProject>>;
};

export default function AboutProjectForm({ aboutProject, setAboutProject }: Props) {
    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setAboutProject(prev => ({ ...prev, [name]: value }));
    };
    return (
        <form className="mx-auto space-y-6 bg-background">
            <div className="space-y-2">
                <Label htmlFor="projectName">Project Name</Label>
                <Input
                    id="projectName"
                    name="projectName"
                    value={aboutProject.projectName}
                    onChange={handleChange}
                    required
                    placeholder="Enter your project name"
                />
            </div>

            <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                    id="description"
                    name="description"
                    value={aboutProject.description}
                    onChange={handleChange}
                    rows={4}
                    required
                    placeholder="Describe your project"
                />
            </div>

            <div className="gap-2 w-full">
                <div className="grid grid-cols-3 gap-2">
                    <div className="space-y-2">
                        <Label htmlFor="level">Level</Label>
                        <Select
                            value={aboutProject.level}
                            onValueChange={value => setAboutProject(prev => ({ ...prev, level: value as AboutProject["level"] }))}
                        >
                            <SelectTrigger id="level" className="w-full">
                                <SelectValue placeholder="Select level" />
                            </SelectTrigger>
                            <SelectContent>
                                {LEVEL_OPTIONS.map(opt => (
                                    <SelectItem key={opt.value} value={opt.value}>
                                        {opt.label}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="projectType">Project Type</Label>
                        <Select
                            value={aboutProject.projectType}
                            onValueChange={value => setAboutProject(prev => ({ ...prev, projectType: value as AboutProject["projectType"] }))}
                        >
                            <SelectTrigger id="projectType" className="w-full">
                                <SelectValue placeholder="Select project type" />
                            </SelectTrigger>
                            <SelectContent>
                                {PROJECT_TYPE_OPTIONS.map(opt => (
                                    <SelectItem key={opt.value} value={opt.value}>
                                        {opt.label}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="projectType">model</Label>
                        <Select
                            value={aboutProject.model}
                            onValueChange={value => setAboutProject(prev => ({ ...prev, model: value as AboutProject["model"] }))}
                        >
                            <SelectTrigger id="model" className="w-full">
                                <SelectValue placeholder="Select project type" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="gemini-2.5-pro">
                                    gemini 2.5 pro (best)
                                </SelectItem>
                                <SelectItem value="gemini-2.5-flash">
                                    gemini 2.5 flash
                                </SelectItem>
                                <SelectItem value="gemini-2.0-flash">
                                    gemini 2.0 flash
                                </SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>
                <div className="grid grid-cols-3">
                    <div className="space-y-2 col-span-2 content-center">
                        <Label>Options</Label>
                        <div className="flex gap-10">
                            <label className="flex items-center gap-2">
                                <input
                                    type="checkbox"
                                    name="includeGuide"
                                    checked={aboutProject.includeReadme ?? true}
                                    onChange={e =>
                                        setAboutProject(prev => ({
                                            ...prev,
                                            includeReadme: e.target.checked,
                                        }))
                                    }
                                />
                                <span>Include next README.md</span>
                            </label>
                            <label className="flex items-center gap-2">
                                <input
                                    type="checkbox"
                                    name="includeStructure"
                                    checked={aboutProject.includeStructure ?? true}
                                    onChange={e =>
                                        setAboutProject(prev => ({
                                            ...prev,
                                            includeStructure: e.target.checked,
                                        }))
                                    }
                                />
                                <span>Include structure.txt</span>
                            </label>
                        </div>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="moduleFormat">Module Format</Label>
                        <Select
                            value={aboutProject.moduleFormat}
                            onValueChange={value =>
                                setAboutProject(prev => ({ ...prev, moduleFormat: value as "esm" | "cjs" }))
                            }
                        >
                            <SelectTrigger id="moduleFormat" className="w-full">
                                <SelectValue placeholder="Select module format" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="esm">ESM</SelectItem>
                                <SelectItem value="cjs">CJS</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>
            </div>
        </form>
    );
}

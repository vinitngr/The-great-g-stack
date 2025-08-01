import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { PlusIcon, Trash2 } from "lucide-react";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";
export interface SelectedStackItem {
    name: string;
    version?: string;
    description?: string;
    category?: string;
}

interface CustomPackageProps {
    customPackages: SelectedStackItem[];
    setCustomPackages: (items: SelectedStackItem[]) => void;
}

export default function CustomPackage({ customPackages, setCustomPackages }: CustomPackageProps) {
    const [showForm, setShowForm] = useState(false);
    const [form, setForm] = useState<SelectedStackItem>({ name: "", version: "", description: "", category: "" });

    const handleAdd = () => {
        if (!form.name) return;
        setCustomPackages([...customPackages, form]);
        setForm({ name: "", version: "", description: "", category: "" });
        setShowForm(false);
    };

    return (
        <div className="space-y-4">
            <Button variant="outline" onClick={() => setShowForm(!showForm)} size="sm">
                <PlusIcon className="w-4 h-4 mr-2" /> Add Package
            </Button>

            {showForm && (
                <Card className="p-4">
                    <CardHeader>
                        <CardTitle>Add Custom Package</CardTitle>
                    </CardHeader>

                    <CardContent className="grid-cols-3 grid gap-2">
                        <Input
                            placeholder="Package name"
                            value={form.name}
                            onChange={(e) => setForm({ ...form, name: e.target.value })}
                        />
                        <Input
                            placeholder="Version (compatible)"
                            value={form.version}

                            onChange={(e) => setForm({ ...form, version: e.target.value })}
                        />
                        <Select
                            value={form.category}
                            onValueChange={(value) => setForm({ ...form, category: value })}
                        >
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Select category" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="UI">UI</SelectItem>
                                <SelectItem value="Backend">Backend</SelectItem>
                                <SelectItem value="Database">Database</SelectItem>
                                <SelectItem value="Testing">Testing</SelectItem>
                                <SelectItem value="Build Tool">Build Tool</SelectItem>
                                <SelectItem value="Other">Other</SelectItem>
                            </SelectContent>
                        </Select>
                        <Textarea
                            placeholder="Description"
                            className="col-span-3"
                            value={form.description}
                            onChange={(e) => setForm({ ...form, description: e.target.value })}
                        />
                    </CardContent>

                    <CardFooter>
                        <Button onClick={handleAdd}>Add</Button>
                    </CardFooter>
                </Card>
            )}

            {customPackages.map((pkg, index) => (
                <Card key={index} className="p-3 rounded-sm border-muted">
                    <CardHeader className="p-0">
                        <div className="flex items-center justify-between">
                            <CardTitle className="text-base font-medium">{pkg.name}</CardTitle>
                            <div className="flex items-center gap-2">
                                <span className="text-xs text-muted-foreground">v{pkg.version || "latest"}</span>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    className="text-red-500 hover:text-red-600"
                                    onClick={() => {
                                        const updated = [...customPackages];
                                        updated.splice(index, 1);
                                        setCustomPackages(updated);
                                    }}
                                >
                                    <Trash2 />
                                </Button>
                            </div>
                        </div>
                        <CardDescription className="text-sm text-muted-foreground">
                            {pkg.category && <span className="mr-2">📦 {pkg.category} : </span>}
                            {pkg.description}
                        </CardDescription>
                    </CardHeader>
                </Card>
            ))}
        </div>
    );
}
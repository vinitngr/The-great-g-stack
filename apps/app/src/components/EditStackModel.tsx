import { CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { CheckIcon, DatabaseIcon, PencilIcon, TagIcon, TextIcon } from "lucide-react";
import { SelectedStackItem } from "./Generator";

interface Props {
  editingOption: SelectedStackItem | null;
  tempDesc: string;
  tempVersion: string;
  tempService: string;
  tempPackage: string;
  setTempDesc: (v: string) => void;
  setTempVersion: (v: string) => void;
  setTempService: (v: string) => void;
  setTempPackage: (v: string) => void;
  onCancel: () => void;
  onSave: () => void;
}


export default function EditStackModal({
  editingOption,
  tempDesc,
  tempVersion,
  setTempDesc,
  setTempVersion,
  onCancel,
  onSave,
  tempPackage,
  tempService,
  setTempService,
  setTempPackage
}: Props) {

  if (!editingOption) return null;

  return (
    <div className="fixed h-screen overflow-auto inset-0 bg-background/80 backdrop-blur-md flex items-center justify-center z-50 animate-in fade-in">
      <div className="bg-card p-6 rounded-xl shadow-2xl w-full max-w-md border border-border/50 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-transparent to-primary/5 opacity-20 -z-10" />
        <div className="absolute top-0 right-0 w-16 h-16 bg-primary/10 rounded-full blur-xl -z-10" />

        <CardHeader className="p-0 mb-5">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/10">
              <PencilIcon className="w-5 h-5 text-primary" />
            </div>
            <div>
              <CardTitle className="text-lg font-semibold">Edit {editingOption.name}</CardTitle>
              <CardDescription className="text-sm text-muted-foreground">
                Update the details below
              </CardDescription>
            </div>
          </div>
        </CardHeader>

        <div className="space-y-5">
          <div className="space-y-2.5">
            <Label className="flex items-center gap-1.5 text-sm font-medium">
              <TextIcon className="w-4 h-4 opacity-70" />
              Description
            </Label>
            <textarea
              className="flex min-h-[150px] w-full rounded-lg border border-border/60 bg-background px-3.5 py-2.5 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50 focus-visible:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 transition-colors"
              value={tempDesc}
              onChange={e => setTempDesc(e.target.value)}
            />
          </div>

          {(editingOption.services ?? []).length > 0 && (
            <div className="space-y-2.5">
              <Label className="flex items-center gap-1.5 text-sm font-medium">
                <DatabaseIcon className="w-4 h-4 opacity-70" />
                Service Provider
              </Label>
              <div className="grid grid-cols-3 gap-3">
                {(editingOption.services || [])
                  .filter(service => service !== "default")
                  .map(service => (
                    <div key={service} className="flex items-center space-x-2">
                      <input
                        type="radio"
                        value={service}
                        id={service}
                        checked={tempService === service}
                        onChange={() => setTempService(service)}
                        className="accent-primary"
                      />
                      <Label htmlFor={service} className="text-sm cursor-pointer">
                        {service}
                      </Label>
                    </div>
                  ))}

              </div>
            </div>
          )}

          {(editingOption.packages ?? []).length > 0 && (
            <div className="space-y-2.5">
              <Label className="flex items-center gap-1.5 text-sm font-medium">
                <DatabaseIcon className="w-4 h-4 opacity-70" />
                Packages
              </Label>
              <div className="grid grid-cols-3 gap-3">
                {(editingOption.packages || [])
                  .filter(pkg => pkg !== "default")
                  .map(pkg => (
                    <div key={pkg} className="flex items-center space-x-2">
                      <input
                        type="radio"
                        value={pkg}
                        id={pkg}
                        checked={tempPackage === pkg}
                        onChange={() => setTempPackage(pkg)}
                        className="accent-primary"
                      />
                      <Label htmlFor={pkg} className="text-sm cursor-pointer">
                        {pkg}
                      </Label>
                    </div>
                  ))}

              </div>
            </div>
          )}

          <div className="space-y-2.5">
            <Label className="flex items-center gap-1.5 text-sm font-medium">
              <TagIcon className="w-4 h-4 opacity-70" />
              Version
            </Label>
            <input
              type="text"
              className="flex h-10 w-full rounded-lg border border-border/60 bg-background px-3.5 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50 focus-visible:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 transition-colors"
              value={tempVersion}
              onChange={e => setTempVersion(e.target.value)}
            />
          </div>
        </div>

        <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-border/30">
          <Button
            variant="outline"
            className="rounded-lg hover:bg-accent/80 hover:text-accent-foreground/90"
            onClick={onCancel}
          >
            Cancel
          </Button>
          <Button
            className="rounded-lg bg-primary/90 hover:bg-primary shadow-sm"
            onClick={onSave}
          >
            <CheckIcon className="w-4 h-4 mr-1.5" />
            Save Changes
          </Button>
        </div>
      </div>
    </div>
  );
}

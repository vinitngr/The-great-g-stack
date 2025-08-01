import { CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { CheckIcon, PencilIcon, TagIcon, TextIcon } from "lucide-react";
import { SelectedStackItem } from "./Generator";

interface Props {
  editingOption: SelectedStackItem | null;
  tempDesc: string;
  tempVersion: string;
  setTempDesc: (v: string) => void;
  setTempVersion: (v: string) => void;
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
  onSave
}: Props) {
  if (!editingOption) return null;

  return (
    <div className="fixed inset-0 bg-background/80  backdrop-blur-md flex items-center justify-center z-50 animate-in fade-in">
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
              className="flex min-h-[300px] w-full rounded-lg border border-border/60 bg-background px-3.5 py-2.5 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50 focus-visible:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 transition-colors"
              value={tempDesc}
              onChange={e => setTempDesc(e.target.value)}
            />
          </div>

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

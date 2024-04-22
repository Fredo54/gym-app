import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { SwitchProps } from "@radix-ui/react-switch";

export function SwitchDemo(props: SwitchProps) {
  const { checked, onCheckedChange } = props;

  return (
    <div className="flex items-center space-x-2">
      <Switch
        id="is-finished"
        checked={checked}
        onCheckedChange={onCheckedChange}
      />
      <Label htmlFor="is-finished">Finished?</Label>
    </div>
  );
}

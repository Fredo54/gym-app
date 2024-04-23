import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { SwitchProps } from "@radix-ui/react-switch";

export function SwitchWrapper(
  props: SwitchProps & { text: string; id: string }
) {
  const { checked, onCheckedChange, id, text } = props;

  return (
    <div className="flex items-center space-x-2">
      <Switch id={id} checked={checked} onCheckedChange={onCheckedChange} />
      <Label htmlFor={id}>{text}</Label>
    </div>
  );
}

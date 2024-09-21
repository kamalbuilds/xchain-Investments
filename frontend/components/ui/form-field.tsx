import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

interface FormFieldProps {
  label: string
  type?: string
  id?: string
  [key: string]: any
}

export function FormField({ label, type = "text", ...props }: FormFieldProps) {
  return (
    <div className="space-y-2">
      <Label htmlFor={props.id}>{label}</Label>
      {type === "textarea" ? (
        <Textarea id={props.id} {...props} />
      ) : (
        <Input type={type} id={props.id} {...props} />
      )}
    </div>
  )
}

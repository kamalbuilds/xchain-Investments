interface SectionHeadingProps {
  title: string
  subtitle?: string
}

export function SectionHeading({ title, subtitle }: SectionHeadingProps) {
  return (
    <div className="mb-8 text-center">
      <h2 className="text-3xl font-bold">{title}</h2>
      {subtitle && <p className="mt-2 text-muted-foreground">{subtitle}</p>}
    </div>
  )
}

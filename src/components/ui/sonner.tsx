import { Toaster as Sonner, type ToasterProps } from "sonner"

import { useTheme } from "next-themes"

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme()

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            "!rounded-2xl !border !border-border !bg-card !text-card-foreground !shadow-card-lg",
          description: "!text-muted-foreground",
          actionButton: "!bg-primary !text-primary-foreground !rounded-full",
          cancelButton: "!bg-muted !text-muted-foreground !rounded-full",
        },
      }}
      {...props}
    />
  )
}

export { Toaster }

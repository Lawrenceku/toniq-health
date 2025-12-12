'use client'

import * as React from "react"
import { cn } from "@/lib/utils"
import { ChevronDown } from "lucide-react"

// For a full accessible Select, typically we'd use Radix UI.
// For this fail-safe demo without installing heavy deps, we'll use a styled native select 
// or a simple custom implementation if the user expects the specific Shadcn look.
// Let's build a lightweight visual wrapper around native select for robustness.

const Select = React.forwardRef<
    HTMLSelectElement,
    React.SelectHTMLAttributes<HTMLSelectElement> & { onValueChange?: (value: string) => void }
>(({ className, children, onValueChange, onChange, ...props }, ref) => {

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        onChange?.(e)
        onValueChange?.(e.target.value)
    }

    return (
        <div className="relative">
            <select
                className={cn(
                    "flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 appearance-none",
                    className
                )}
                onChange={handleChange}
                ref={ref}
                {...props}
            >
                {children}
            </select>
            <ChevronDown className="absolute right-3 top-3 h-4 w-4 opacity-50 pointer-events-none" />
        </div>
    )
})
Select.displayName = "Select"

const SelectTrigger = ({ className, children }: any) => <>{children}</>
const SelectValue = ({ placeholder }: any) => <>{placeholder}</>
const SelectContent = ({ children }: any) => <>{children}</>
const SelectItem = ({ value, children }: any) => <option value={value}>{children}</option>

export { Select, SelectTrigger, SelectValue, SelectContent, SelectItem }

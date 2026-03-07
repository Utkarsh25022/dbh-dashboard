// // // // // 'use client'

// // // // // import {
// // // // // BarChart3,
// // // // // CalendarIcon,
// // // // // Download,
// // // // // FileDown,
// // // // // ChevronsUpDown,
// // // // // Check,
// // // // // X,
// // // // // } from 'lucide-react'

// // // // // import { Button } from '@/components/ui/button'
// // // // // import { Badge } from '@/components/ui/badge'
// // // // // import {
// // // // // Popover,
// // // // // PopoverContent,
// // // // // PopoverTrigger,
// // // // // } from '@/components/ui/popover'
// // // // // import {
// // // // // Command,
// // // // // CommandEmpty,
// // // // // CommandGroup,
// // // // // CommandInput,
// // // // // CommandItem,
// // // // // CommandList,
// // // // // } from '@/components/ui/command'
// // // // // import { Calendar as DateCalendar } from '@/components/ui/calendar'
// // // // // import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'

// // // // // import { cn } from '@/lib/utils'
// // // // // import { getAllParentModels } from '@/lib/modelMap'

// // // // // import { DateRange } from 'react-day-picker'
// // // // // import { format } from 'date-fns'
// // // // // import { useState } from 'react'

// // // // // interface DashboardHeaderProps {
// // // // // selectedModel: string
// // // // // onModelChange: (model: string) => void

// // // // // selectedCompetitors: string[]
// // // // // onCompetitorsChange: (models: string[]) => void

// // // // // onExport: () => void
// // // // // onDownloadPPT: () => void

// // // // // dateRange: DateRange | undefined
// // // // // onDateRangeChange: (range: DateRange | undefined) => void

// // // // // trafficType: 'overall' | 'organic' | 'inorganic'
// // // // // onTrafficTypeChange: (type: 'overall' | 'organic' | 'inorganic') => void
// // // // // }

// // // // // export function DashboardHeader({
// // // // // selectedModel,
// // // // // onModelChange,

// // // // // selectedCompetitors,
// // // // // onCompetitorsChange,

// // // // // onExport,
// // // // // onDownloadPPT,

// // // // // dateRange,
// // // // // onDateRangeChange,

// // // // // trafficType,
// // // // // onTrafficTypeChange,
// // // // // }: DashboardHeaderProps) {

// // // // // const models = getAllParentModels()

// // // // // const [modelOpen, setModelOpen] = useState(false)
// // // // // const [competitorOpen, setCompetitorOpen] = useState(false)

// // // // // const selectedLabel =
// // // // // models.find((m) => m.value === selectedModel)?.label ||
// // // // // 'Select model'

// // // // // const toggleCompetitor = (value: string) => {

// // // // // if (selectedCompetitors.includes(value)) {
// // // // //   onCompetitorsChange(
// // // // //     selectedCompetitors.filter((v) => v !== value)
// // // // //   )
// // // // //   return
// // // // // }

// // // // // if (selectedCompetitors.length >= 10) return

// // // // // onCompetitorsChange([...selectedCompetitors, value])


// // // // // }

// // // // // const removeCompetitor = (value: string) => {
// // // // // onCompetitorsChange(
// // // // // selectedCompetitors.filter((v) => v !== value)
// // // // // )
// // // // // }

// // // // // return ( <header className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
// // // // //   {/* LEFT */}
// // // // //   <div className="flex items-center gap-3">
// // // // //     <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
// // // // //       <BarChart3 className="h-5 w-5 text-primary-foreground" />
// // // // //     </div>

// // // // //     <div>
// // // // //       <h1 className="text-xl font-semibold tracking-tight">
// // // // //         CarDekho Digital Brand Health Dashboard
// // // // //       </h1>

// // // // //       <p className="text-sm text-muted-foreground">
// // // // //         Automotive competitive intelligence and performance monitoring
// // // // //       </p>
// // // // //     </div>
// // // // //   </div>

// // // // //   {/* RIGHT CONTROLS */}
// // // // //   <div className="flex flex-wrap items-center gap-3">

// // // // //     {/* MODEL SELECT */}
// // // // //     <Popover open={modelOpen} onOpenChange={setModelOpen}>
// // // // //       <PopoverTrigger asChild>
// // // // //         <Button variant="outline" className="w-[220px] justify-between">
// // // // //           {selectedLabel}
// // // // //           <ChevronsUpDown className="ml-2 h-4 w-4 opacity-50" />
// // // // //         </Button>
// // // // //       </PopoverTrigger>

// // // // //       <PopoverContent className="w-[260px] p-0">
// // // // //         <Command>
// // // // //           <CommandInput placeholder="Search model..." />

// // // // //           <CommandList className="max-h-[300px] overflow-y-auto">
// // // // //             <CommandEmpty>No model found.</CommandEmpty>

// // // // //             <CommandGroup>
// // // // //               {models.map((model) => (
// // // // //                 <CommandItem
// // // // //                   key={model.value}
// // // // //                   value={model.label}
// // // // //                   onSelect={() => {
// // // // //                     onModelChange(model.value)
// // // // //                     setModelOpen(false)
// // // // //                   }}
// // // // //                 >
// // // // //                   <Check
// // // // //                     className={cn(
// // // // //                       'mr-2 h-4 w-4',
// // // // //                       selectedModel === model.value
// // // // //                         ? 'opacity-100'
// // // // //                         : 'opacity-0'
// // // // //                     )}
// // // // //                   />
// // // // //                   {model.label}
// // // // //                 </CommandItem>
// // // // //               ))}
// // // // //             </CommandGroup>

// // // // //           </CommandList>
// // // // //         </Command>
// // // // //       </PopoverContent>
// // // // //     </Popover>

// // // // //     {/* COMPETITOR SELECT */}
// // // // //     <Popover open={competitorOpen} onOpenChange={setCompetitorOpen}>
// // // // //       <PopoverTrigger asChild>
// // // // //         <Button variant="outline" className="w-[220px] justify-between">
// // // // //           Select Competitors
// // // // //           <ChevronsUpDown className="ml-2 h-4 w-4 opacity-50" />
// // // // //         </Button>
// // // // //       </PopoverTrigger>

// // // // //       <PopoverContent className="w-[260px] p-0">
// // // // //         <Command>
// // // // //           <CommandInput placeholder="Search competitors..." />

// // // // //           <CommandList className="max-h-[300px] overflow-y-auto">
// // // // //             <CommandEmpty>No competitor found.</CommandEmpty>

// // // // //             <CommandGroup>
// // // // //               {models.map((model) => (
// // // // //                 <CommandItem
// // // // //                   key={model.value}
// // // // //                   value={model.label}
// // // // //                   onSelect={() => toggleCompetitor(model.value)}
// // // // //                 >
// // // // //                   <Check
// // // // //                     className={cn(
// // // // //                       'mr-2 h-4 w-4',
// // // // //                       selectedCompetitors.includes(model.value)
// // // // //                         ? 'opacity-100'
// // // // //                         : 'opacity-0'
// // // // //                     )}
// // // // //                   />
// // // // //                   {model.label}
// // // // //                 </CommandItem>
// // // // //               ))}
// // // // //             </CommandGroup>

// // // // //           </CommandList>
// // // // //         </Command>
// // // // //       </PopoverContent>
// // // // //     </Popover>

// // // // //     {/* SELECTED COMPETITORS */}
// // // // //     <div className="flex flex-wrap gap-2 max-w-[350px]">
// // // // //       {selectedCompetitors.map((comp) => {

// // // // //         const label =
// // // // //           models.find((m) => m.value === comp)?.label || comp

// // // // //         return (
// // // // //           <Badge key={comp} variant="secondary" className="flex items-center gap-1">
// // // // //             {label}
// // // // //             <X
// // // // //               className="h-3 w-3 cursor-pointer"
// // // // //               onClick={() => removeCompetitor(comp)}
// // // // //             />
// // // // //           </Badge>
// // // // //         )
// // // // //       })}
// // // // //     </div>

// // // // //     {/* TRAFFIC TYPE */}
// // // // //     <ToggleGroup
// // // // //       type="single"
// // // // //       value={trafficType}
// // // // //       onValueChange={(val) => {
// // // // //         if (val) onTrafficTypeChange(val as any)
// // // // //       }}
// // // // //       className="border rounded-md"
// // // // //     >
// // // // //       <ToggleGroupItem value="overall">Overall</ToggleGroupItem>
// // // // //       <ToggleGroupItem value="organic">Organic</ToggleGroupItem>
// // // // //       <ToggleGroupItem value="inorganic">Inorganic</ToggleGroupItem>
// // // // //     </ToggleGroup>

// // // // //     {/* DATE RANGE */}
// // // // //     <Popover>
// // // // //       <PopoverTrigger asChild>
// // // // //         <Button variant="outline" className="w-[260px] justify-start text-left font-normal">
// // // // //           <CalendarIcon className="mr-2 h-4 w-4" />

// // // // //           {dateRange?.from ? (
// // // // //             dateRange.to
// // // // //               ? `${format(dateRange.from, 'LLL dd, y')} — ${format(dateRange.to, 'LLL dd, y')}`
// // // // //               : format(dateRange.from, 'LLL dd, y')
// // // // //           ) : (
// // // // //             <span>Select date range</span>
// // // // //           )}
// // // // //         </Button>
// // // // //       </PopoverTrigger>

// // // // //       <PopoverContent className="w-auto p-0" align="start">
// // // // //         <DateCalendar
// // // // //           mode="range"
// // // // //           selected={dateRange}
// // // // //           onSelect={onDateRangeChange}
// // // // //           numberOfMonths={2}
// // // // //           disabled={(date) => date > new Date()}
// // // // //           initialFocus
// // // // //         />
// // // // //       </PopoverContent>
// // // // //     </Popover>

// // // // //     <Button onClick={onExport} className="gap-2">
// // // // //       <Download className="h-4 w-4" />
// // // // //       Download Report
// // // // //     </Button>

// // // // //     <Button
// // // // //       variant="secondary"
// // // // //       onClick={onDownloadPPT}
// // // // //       className="gap-2 bg-blue-600 text-white hover:bg-blue-700"
// // // // //     >
// // // // //       <FileDown className="h-4 w-4" />
// // // // //       Export PPT
// // // // //     </Button>

// // // // //   </div>
// // // // // </header>
// // // // // )
// // // // // }















// // // // 'use client'

// // // // import {
// // // //   BarChart3,
// // // //   CalendarIcon,
// // // //   Download,
// // // //   FileDown,
// // // //   ChevronsUpDown,
// // // //   Check,
// // // //   X,
// // // // } from 'lucide-react'

// // // // import { Button } from '@/components/ui/button'
// // // // import { Badge } from '@/components/ui/badge'
// // // // import {
// // // //   Popover,
// // // //   PopoverContent,
// // // //   PopoverTrigger,
// // // // } from '@/components/ui/popover'
// // // // import {
// // // //   Command,
// // // //   CommandEmpty,
// // // //   CommandGroup,
// // // //   CommandInput,
// // // //   CommandItem,
// // // //   CommandList,
// // // // } from '@/components/ui/command'
// // // // import { Calendar as DateCalendar } from '@/components/ui/calendar'
// // // // import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'

// // // // import { cn } from '@/lib/utils'
// // // // import { getAllParentModels } from '@/lib/modelMap'

// // // // import { DateRange } from 'react-day-picker'
// // // // import { format } from 'date-fns'
// // // // import { useState } from 'react'

// // // // interface DashboardHeaderProps {

// // // //   /* UPDATED HERE */
// // // //   selectedModel: string | null
// // // //   onModelChange: (model: string) => void

// // // //   selectedCompetitors: string[]
// // // //   onCompetitorsChange: (models: string[]) => void

// // // //   onExport: () => void
// // // //   onDownloadPPT: () => void

// // // //   dateRange: DateRange | undefined
// // // //   onDateRangeChange: (range: DateRange | undefined) => void

// // // //   trafficType: 'overall' | 'organic' | 'inorganic'
// // // //   onTrafficTypeChange: (type: 'overall' | 'organic' | 'inorganic') => void
// // // // }

// // // // export function DashboardHeader({
// // // //   selectedModel,
// // // //   onModelChange,

// // // //   selectedCompetitors,
// // // //   onCompetitorsChange,

// // // //   onExport,
// // // //   onDownloadPPT,

// // // //   dateRange,
// // // //   onDateRangeChange,

// // // //   trafficType,
// // // //   onTrafficTypeChange,
// // // // }: DashboardHeaderProps) {

// // // //   const models = getAllParentModels()

// // // //   const [modelOpen, setModelOpen] = useState(false)
// // // //   const [competitorOpen, setCompetitorOpen] = useState(false)

// // // //   const selectedLabel =
// // // //     models.find((m) => m.value === selectedModel)?.label ||
// // // //     'Select model'

// // // //   const toggleCompetitor = (value: string) => {

// // // //     if (selectedCompetitors.includes(value)) {
// // // //       onCompetitorsChange(
// // // //         selectedCompetitors.filter((v) => v !== value)
// // // //       )
// // // //       return
// // // //     }

// // // //     if (selectedCompetitors.length >= 10) return

// // // //     onCompetitorsChange([...selectedCompetitors, value])
// // // //   }

// // // //   const removeCompetitor = (value: string) => {
// // // //     onCompetitorsChange(
// // // //       selectedCompetitors.filter((v) => v !== value)
// // // //     )
// // // //   }

// // // //   return (
// // // // <header className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

// // // //   {/* LEFT */}
// // // //   <div className="flex items-center gap-3">
// // // //     <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
// // // //       <BarChart3 className="h-5 w-5 text-primary-foreground" />
// // // //     </div>

// // // //     <div>
// // // //       <h1 className="text-xl font-semibold tracking-tight">
// // // //         CarDekho Digital Brand Health Dashboard
// // // //       </h1>

// // // //       <p className="text-sm text-muted-foreground">
// // // //         Automotive competitive intelligence and performance monitoring
// // // //       </p>
// // // //     </div>
// // // //   </div>

// // // //   {/* RIGHT CONTROLS */}
// // // //   <div className="flex flex-wrap items-center gap-3">

// // // //     {/* MODEL SELECT */}
// // // //     <Popover open={modelOpen} onOpenChange={setModelOpen}>
// // // //       <PopoverTrigger asChild>
// // // //         <Button variant="outline" className="w-[220px] justify-between">
// // // //           {selectedLabel}
// // // //           <ChevronsUpDown className="ml-2 h-4 w-4 opacity-50" />
// // // //         </Button>
// // // //       </PopoverTrigger>

// // // //       <PopoverContent className="w-[260px] p-0">
// // // //         <Command>
// // // //           <CommandInput placeholder="Search model..." />

// // // //           <CommandList className="max-h-[300px] overflow-y-auto">
// // // //             <CommandEmpty>No model found.</CommandEmpty>

// // // //             <CommandGroup>
// // // //               {models.map((model) => (
// // // //                 <CommandItem
// // // //                   key={model.value}
// // // //                   value={model.label}
// // // //                   onSelect={() => {
// // // //                     onModelChange(model.value)
// // // //                     setModelOpen(false)
// // // //                   }}
// // // //                 >
// // // //                   <Check
// // // //                     className={cn(
// // // //                       'mr-2 h-4 w-4',
// // // //                       selectedModel === model.value
// // // //                         ? 'opacity-100'
// // // //                         : 'opacity-0'
// // // //                     )}
// // // //                   />
// // // //                   {model.label}
// // // //                 </CommandItem>
// // // //               ))}
// // // //             </CommandGroup>

// // // //           </CommandList>
// // // //         </Command>
// // // //       </PopoverContent>
// // // //     </Popover>

// // // //     {/* COMPETITOR SELECT */}
// // // //     <Popover open={competitorOpen} onOpenChange={setCompetitorOpen}>
// // // //       <PopoverTrigger asChild>
// // // //         <Button variant="outline" className="w-[220px] justify-between">
// // // //           Select Competitors
// // // //           <ChevronsUpDown className="ml-2 h-4 w-4 opacity-50" />
// // // //         </Button>
// // // //       </PopoverTrigger>

// // // //       <PopoverContent className="w-[260px] p-0">
// // // //         <Command>
// // // //           <CommandInput placeholder="Search competitors..." />

// // // //           <CommandList className="max-h-[300px] overflow-y-auto">
// // // //             <CommandEmpty>No competitor found.</CommandEmpty>

// // // //             <CommandGroup>
// // // //               {models.map((model) => (
// // // //                 <CommandItem
// // // //                   key={model.value}
// // // //                   value={model.label}
// // // //                   onSelect={() => toggleCompetitor(model.value)}
// // // //                 >
// // // //                   <Check
// // // //                     className={cn(
// // // //                       'mr-2 h-4 w-4',
// // // //                       selectedCompetitors.includes(model.value)
// // // //                         ? 'opacity-100'
// // // //                         : 'opacity-0'
// // // //                     )}
// // // //                   />
// // // //                   {model.label}
// // // //                 </CommandItem>
// // // //               ))}
// // // //             </CommandGroup>

// // // //           </CommandList>
// // // //         </Command>
// // // //       </PopoverContent>
// // // //     </Popover>

// // // //     {/* SELECTED COMPETITORS */}
// // // //     <div className="flex flex-wrap gap-2 max-w-[350px]">
// // // //       {selectedCompetitors.map((comp) => {

// // // //         const label =
// // // //           models.find((m) => m.value === comp)?.label || comp

// // // //         return (
// // // //           <Badge key={comp} variant="secondary" className="flex items-center gap-1">
// // // //             {label}
// // // //             <X
// // // //               className="h-3 w-3 cursor-pointer"
// // // //               onClick={() => removeCompetitor(comp)}
// // // //             />
// // // //           </Badge>
// // // //         )
// // // //       })}
// // // //     </div>

// // // //     {/* TRAFFIC TYPE */}
// // // //     <ToggleGroup
// // // //       type="single"
// // // //       value={trafficType}
// // // //       onValueChange={(val) => {
// // // //         if (val) onTrafficTypeChange(val as any)
// // // //       }}
// // // //       className="border rounded-md"
// // // //     >
// // // //       <ToggleGroupItem value="overall">Overall</ToggleGroupItem>
// // // //       <ToggleGroupItem value="organic">Organic</ToggleGroupItem>
// // // //       <ToggleGroupItem value="inorganic">Inorganic</ToggleGroupItem>
// // // //     </ToggleGroup>

// // // //     {/* DATE RANGE */}
// // // //     <Popover>
// // // //       <PopoverTrigger asChild>
// // // //         <Button variant="outline" className="w-[260px] justify-start text-left font-normal">
// // // //           <CalendarIcon className="mr-2 h-4 w-4" />

// // // //           {dateRange?.from ? (
// // // //             dateRange.to
// // // //               ? `${format(dateRange.from, 'LLL dd, y')} — ${format(dateRange.to, 'LLL dd, y')}`
// // // //               : format(dateRange.from, 'LLL dd, y')
// // // //           ) : (
// // // //             <span>Select date range</span>
// // // //           )}
// // // //         </Button>
// // // //       </PopoverTrigger>

// // // //       <PopoverContent className="w-auto p-0" align="start">
// // // //         <DateCalendar
// // // //           mode="range"
// // // //           selected={dateRange}
// // // //           onSelect={onDateRangeChange}
// // // //           numberOfMonths={2}
// // // //           disabled={(date) => date > new Date()}
// // // //           initialFocus
// // // //         />
// // // //       </PopoverContent>
// // // //     </Popover>

// // // //     <Button onClick={onExport} className="gap-2">
// // // //       <Download className="h-4 w-4" />
// // // //       Download Report
// // // //     </Button>

// // // //     <Button
// // // //       variant="secondary"
// // // //       onClick={onDownloadPPT}
// // // //       className="gap-2 bg-blue-600 text-white hover:bg-blue-700"
// // // //     >
// // // //       <FileDown className="h-4 w-4" />
// // // //       Export PPT
// // // //     </Button>

// // // //   </div>

// // // // </header>
// // // //   )
// // // // }










// // // 'use client'

// // // import {
// // //   BarChart3,
// // //   CalendarIcon,
// // //   Download,
// // //   FileDown,
// // //   ChevronsUpDown,
// // //   Check,
// // //   X,
// // // } from 'lucide-react'

// // // import { Button } from '@/components/ui/button'
// // // import { Badge } from '@/components/ui/badge'
// // // import {
// // //   Popover,
// // //   PopoverContent,
// // //   PopoverTrigger,
// // // } from '@/components/ui/popover'
// // // import {
// // //   Command,
// // //   CommandEmpty,
// // //   CommandGroup,
// // //   CommandInput,
// // //   CommandItem,
// // //   CommandList,
// // // } from '@/components/ui/command'
// // // import { Calendar as DateCalendar } from '@/components/ui/calendar'
// // // import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'

// // // import { cn } from '@/lib/utils'
// // // import { getAllParentModels } from '@/lib/modelMap'

// // // import { DateRange } from 'react-day-picker'
// // // import { format } from 'date-fns'
// // // import { useState } from 'react'

// // // interface DashboardHeaderProps {

// // //   selectedModel: string | null
// // //   onModelChange: (model: string) => void

// // //   selectedCompetitors: string[]
// // //   onCompetitorsChange: (models: string[]) => void

// // //   onExport: () => void
// // //   onDownloadPPT: () => void

// // //   dateRange: DateRange | undefined
// // //   onDateRangeChange: (range: DateRange | undefined) => void

// // //   trafficType: 'overall' | 'organic' | 'inorganic'
// // //   onTrafficTypeChange: (type: 'overall' | 'organic' | 'inorganic') => void
// // // }

// // // export function DashboardHeader({
// // //   selectedModel,
// // //   onModelChange,

// // //   selectedCompetitors,
// // //   onCompetitorsChange,

// // //   onExport,
// // //   onDownloadPPT,

// // //   dateRange,
// // //   onDateRangeChange,

// // //   trafficType,
// // //   onTrafficTypeChange,
// // // }: DashboardHeaderProps) {

// // //   /* ALL PARENT MODELS */
// // //   const models = getAllParentModels()

// // //   /* REMOVE FOCUS MODEL FROM COMPETITORS */
// // //   const competitorModels = models.filter(
// // //     (m) => m.value !== selectedModel
// // //   )

// // //   const [modelOpen, setModelOpen] = useState(false)
// // //   const [competitorOpen, setCompetitorOpen] = useState(false)

// // //   const selectedLabel =
// // //     models.find((m) => m.value === selectedModel)?.label ||
// // //     'Select model'

// // //   const toggleCompetitor = (value: string) => {

// // //     if (selectedCompetitors.includes(value)) {
// // //       onCompetitorsChange(
// // //         selectedCompetitors.filter((v) => v !== value)
// // //       )
// // //       return
// // //     }

// // //     if (selectedCompetitors.length >= 10) return

// // //     onCompetitorsChange([...selectedCompetitors, value])
// // //   }

// // //   const removeCompetitor = (value: string) => {
// // //     onCompetitorsChange(
// // //       selectedCompetitors.filter((v) => v !== value)
// // //     )
// // //   }

// // //   return (
// // // <header className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

// // //   {/* LEFT */}
// // //   <div className="flex items-center gap-3">
// // //     <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
// // //       <BarChart3 className="h-5 w-5 text-primary-foreground" />
// // //     </div>

// // //     <div>
// // //       <h1 className="text-xl font-semibold tracking-tight">
// // //         CarDekho Digital Brand Health Dashboard
// // //       </h1>

// // //       <p className="text-sm text-muted-foreground">
// // //         Automotive competitive intelligence and performance monitoring
// // //       </p>
// // //     </div>
// // //   </div>

// // //   {/* RIGHT CONTROLS */}
// // //   <div className="flex flex-wrap items-center gap-3">

// // //     {/* MODEL SELECT */}
// // //     <Popover open={modelOpen} onOpenChange={setModelOpen}>
// // //       <PopoverTrigger asChild>
// // //         <Button variant="outline" className="w-[220px] justify-between">
// // //           {selectedLabel}
// // //           <ChevronsUpDown className="ml-2 h-4 w-4 opacity-50" />
// // //         </Button>
// // //       </PopoverTrigger>

// // //       <PopoverContent className="w-[260px] p-0">
// // //         <Command>
// // //           <CommandInput placeholder="Search model..." />

// // //           <CommandList className="max-h-[300px] overflow-y-auto">
// // //             <CommandEmpty>No model found.</CommandEmpty>

// // //             <CommandGroup>
// // //               {models.map((model) => (
// // //                 <CommandItem
// // //                   key={model.value}
// // //                   value={model.label}
// // //                   onSelect={() => {
// // //                     onModelChange(model.value)
// // //                     setModelOpen(false)
// // //                   }}
// // //                 >
// // //                   <Check
// // //                     className={cn(
// // //                       'mr-2 h-4 w-4',
// // //                       selectedModel === model.value
// // //                         ? 'opacity-100'
// // //                         : 'opacity-0'
// // //                     )}
// // //                   />
// // //                   {model.label}
// // //                 </CommandItem>
// // //               ))}
// // //             </CommandGroup>

// // //           </CommandList>
// // //         </Command>
// // //       </PopoverContent>
// // //     </Popover>

// // //     {/* COMPETITOR SELECT */}
// // //     <Popover open={competitorOpen} onOpenChange={setCompetitorOpen}>
// // //       <PopoverTrigger asChild>
// // //         <Button variant="outline" className="w-[220px] justify-between">
// // //           Select Competitors
// // //           <ChevronsUpDown className="ml-2 h-4 w-4 opacity-50" />
// // //         </Button>
// // //       </PopoverTrigger>

// // //       <PopoverContent className="w-[260px] p-0">
// // //         <Command>
// // //           <CommandInput placeholder="Search competitors..." />

// // //           <CommandList className="max-h-[300px] overflow-y-auto">
// // //             <CommandEmpty>No competitor found.</CommandEmpty>

// // //             <CommandGroup>
// // //               {competitorModels.map((model) => (
// // //                 <CommandItem
// // //                   key={model.value}
// // //                   value={model.label}
// // //                   onSelect={() => toggleCompetitor(model.value)}
// // //                 >
// // //                   <Check
// // //                     className={cn(
// // //                       'mr-2 h-4 w-4',
// // //                       selectedCompetitors.includes(model.value)
// // //                         ? 'opacity-100'
// // //                         : 'opacity-0'
// // //                     )}
// // //                   />
// // //                   {model.label}
// // //                 </CommandItem>
// // //               ))}
// // //             </CommandGroup>

// // //           </CommandList>
// // //         </Command>
// // //       </PopoverContent>
// // //     </Popover>

// // //     {/* SELECTED COMPETITORS */}
// // //     <div className="flex flex-wrap gap-2 max-w-[350px]">
// // //       {selectedCompetitors.map((comp) => {

// // //         const label =
// // //           models.find((m) => m.value === comp)?.label || comp

// // //         return (
// // //           <Badge key={comp} variant="secondary" className="flex items-center gap-1">
// // //             {label}
// // //             <X
// // //               className="h-3 w-3 cursor-pointer"
// // //               onClick={() => removeCompetitor(comp)}
// // //             />
// // //           </Badge>
// // //         )
// // //       })}
// // //     </div>

// // //     {/* TRAFFIC TYPE */}
// // //     <ToggleGroup
// // //       type="single"
// // //       value={trafficType}
// // //       onValueChange={(val) => {
// // //         if (val) onTrafficTypeChange(val as any)
// // //       }}
// // //       className="border rounded-md"
// // //     >
// // //       <ToggleGroupItem value="overall">Overall</ToggleGroupItem>
// // //       <ToggleGroupItem value="organic">Organic</ToggleGroupItem>
// // //       <ToggleGroupItem value="inorganic">Inorganic</ToggleGroupItem>
// // //     </ToggleGroup>

// // //     {/* DATE RANGE */}
// // //     <Popover>
// // //       <PopoverTrigger asChild>
// // //         <Button variant="outline" className="w-[260px] justify-start text-left font-normal">
// // //           <CalendarIcon className="mr-2 h-4 w-4" />

// // //           {dateRange?.from ? (
// // //             dateRange.to
// // //               ? `${format(dateRange.from, 'LLL dd, y')} — ${format(dateRange.to, 'LLL dd, y')}`
// // //               : format(dateRange.from, 'LLL dd, y')
// // //           ) : (
// // //             <span>Select date range</span>
// // //           )}
// // //         </Button>
// // //       </PopoverTrigger>

// // //       <PopoverContent className="w-auto p-0" align="start">
// // //         <DateCalendar
// // //           mode="range"
// // //           selected={dateRange}
// // //           onSelect={onDateRangeChange}
// // //           numberOfMonths={2}
// // //           disabled={(date) => date > new Date()}
// // //           initialFocus
// // //         />
// // //       </PopoverContent>
// // //     </Popover>

// // //     <Button onClick={onExport} className="gap-2">
// // //       <Download className="h-4 w-4" />
// // //       Download Report
// // //     </Button>

// // //     <Button
// // //       variant="secondary"
// // //       onClick={onDownloadPPT}
// // //       className="gap-2 bg-blue-600 text-white hover:bg-blue-700"
// // //     >
// // //       <FileDown className="h-4 w-4" />
// // //       Export PPT
// // //     </Button>

// // //   </div>

// // // </header>
// // //   )
// // // }



















// // 'use client'

// // import {
// //   BarChart3,
// //   CalendarIcon,
// //   Download,
// //   FileDown,
// //   ChevronsUpDown,
// //   Check,
// //   X,
// // } from 'lucide-react'

// // import { Button } from '@/components/ui/button'
// // import { Badge } from '@/components/ui/badge'
// // import {
// //   Popover,
// //   PopoverContent,
// //   PopoverTrigger,
// // } from '@/components/ui/popover'
// // import {
// //   Command,
// //   CommandEmpty,
// //   CommandGroup,
// //   CommandInput,
// //   CommandItem,
// //   CommandList,
// // } from '@/components/ui/command'
// // import { Calendar as DateCalendar } from '@/components/ui/calendar'
// // import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'

// // import { cn } from '@/lib/utils'
// // import { getAllParentModels } from '@/lib/modelMap'

// // import { DateRange } from 'react-day-picker'
// // import { format } from 'date-fns'
// // import { useState, useMemo } from 'react'

// // interface DashboardHeaderProps {

// //   selectedModel: string | null
// //   onModelChange: (model: string) => void

// //   selectedCompetitors: string[]
// //   onCompetitorsChange: (models: string[]) => void

// //   onExport: () => void
// //   onDownloadPPT: () => void

// //   dateRange: DateRange | undefined
// //   onDateRangeChange: (range: DateRange | undefined) => void

// //   trafficType: 'overall' | 'organic' | 'inorganic'
// //   onTrafficTypeChange: (type: 'overall' | 'organic' | 'inorganic') => void
// // }

// // export function DashboardHeader({
// //   selectedModel,
// //   onModelChange,

// //   selectedCompetitors,
// //   onCompetitorsChange,

// //   onExport,
// //   onDownloadPPT,

// //   dateRange,
// //   onDateRangeChange,

// //   trafficType,
// //   onTrafficTypeChange,
// // }: DashboardHeaderProps) {

// //   /* ----------------------------- */
// //   /* ALL PARENT MODELS (STABLE) */
// //   /* ----------------------------- */

// //   const models = useMemo(() => {

// //     const list = getAllParentModels()

// //     return [...list].sort((a, b) =>
// //       a.label.localeCompare(b.label)
// //     )

// //   }, [])

// //   /* ----------------------------- */
// //   /* REMOVE FOCUS MODEL FROM COMPETITORS */
// //   /* ----------------------------- */

// //   const competitorModels = useMemo(() => {

// //     return models.filter(
// //       (m) =>
// //         m.value !== selectedModel &&
// //         !selectedCompetitors.includes(m.value)
// //     )

// //   }, [models, selectedModel, selectedCompetitors])

// //   const [modelOpen, setModelOpen] = useState(false)
// //   const [competitorOpen, setCompetitorOpen] = useState(false)

// //   const selectedLabel =
// //     models.find((m) => m.value === selectedModel)?.label ||
// //     'Select model'

// //   const toggleCompetitor = (value: string) => {

// //     const normalized = value.toLowerCase()

// //     if (selectedCompetitors.includes(normalized)) {

// //       onCompetitorsChange(
// //         selectedCompetitors.filter((v) => v !== normalized)
// //       )
// //       return
// //     }

// //     if (selectedCompetitors.length >= 10) return

// //     onCompetitorsChange([
// //       ...selectedCompetitors,
// //       normalized
// //     ])
// //   }

// //   const removeCompetitor = (value: string) => {

// //     onCompetitorsChange(
// //       selectedCompetitors.filter((v) => v !== value)
// //     )

// //   }

// //   return (
// // <header className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

// //   {/* LEFT */}
// //   <div className="flex items-center gap-3">
// //     <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
// //       <BarChart3 className="h-5 w-5 text-primary-foreground" />
// //     </div>

// //     <div>
// //       <h1 className="text-xl font-semibold tracking-tight">
// //         CarDekho Digital Brand Health Dashboard
// //       </h1>

// //       <p className="text-sm text-muted-foreground">
// //         Automotive competitive intelligence and performance monitoring
// //       </p>
// //     </div>
// //   </div>

// //   {/* RIGHT CONTROLS */}
// //   <div className="flex flex-wrap items-center gap-3">

// //     {/* MODEL SELECT */}
// //     <Popover open={modelOpen} onOpenChange={setModelOpen}>
// //       <PopoverTrigger asChild>
// //         <Button variant="outline" className="w-[220px] justify-between">
// //           {selectedLabel}
// //           <ChevronsUpDown className="ml-2 h-4 w-4 opacity-50" />
// //         </Button>
// //       </PopoverTrigger>

// //       <PopoverContent className="w-[260px] p-0">
// //         <Command>
// //           <CommandInput placeholder="Search model..." />

// //           <CommandList className="max-h-[300px] overflow-y-auto">
// //             <CommandEmpty>No model found.</CommandEmpty>

// //             <CommandGroup>
// //               {models.map((model) => (
// //                 <CommandItem
// //                   key={model.value}
// //                   value={model.label}
// //                   onSelect={() => {
// //                     onModelChange(model.value)
// //                     setModelOpen(false)
// //                   }}
// //                 >
// //                   <Check
// //                     className={cn(
// //                       'mr-2 h-4 w-4',
// //                       selectedModel === model.value
// //                         ? 'opacity-100'
// //                         : 'opacity-0'
// //                     )}
// //                   />
// //                   {model.label}
// //                 </CommandItem>
// //               ))}
// //             </CommandGroup>

// //           </CommandList>
// //         </Command>
// //       </PopoverContent>
// //     </Popover>

// //     {/* COMPETITOR SELECT */}
// //     <Popover open={competitorOpen} onOpenChange={setCompetitorOpen}>
// //       <PopoverTrigger asChild>
// //         <Button variant="outline" className="w-[220px] justify-between">
// //           Select Competitors
// //           <ChevronsUpDown className="ml-2 h-4 w-4 opacity-50" />
// //         </Button>
// //       </PopoverTrigger>

// //       <PopoverContent className="w-[260px] p-0">
// //         <Command>
// //           <CommandInput placeholder="Search competitors..." />

// //           <CommandList className="max-h-[300px] overflow-y-auto">
// //             <CommandEmpty>No competitor found.</CommandEmpty>

// //             <CommandGroup>
// //               {competitorModels.map((model) => (
// //                 <CommandItem
// //                   key={model.value}
// //                   value={model.label}
// //                   onSelect={() => toggleCompetitor(model.value)}
// //                 >
// //                   <Check
// //                     className={cn(
// //                       'mr-2 h-4 w-4',
// //                       selectedCompetitors.includes(model.value)
// //                         ? 'opacity-100'
// //                         : 'opacity-0'
// //                     )}
// //                   />
// //                   {model.label}
// //                 </CommandItem>
// //               ))}
// //             </CommandGroup>

// //           </CommandList>
// //         </Command>
// //       </PopoverContent>
// //     </Popover>

// //     {/* SELECTED COMPETITORS */}
// //     <div className="flex flex-wrap gap-2 max-w-[350px]">
// //       {selectedCompetitors.map((comp) => {

// //         const label =
// //           models.find((m) => m.value === comp)?.label || comp

// //         return (
// //           <Badge key={comp} variant="secondary" className="flex items-center gap-1">
// //             {label}
// //             <X
// //               className="h-3 w-3 cursor-pointer"
// //               onClick={(e) => {
// //                 e.stopPropagation()
// //                 removeCompetitor(comp)
// //               }}
// //             />
// //           </Badge>
// //         )
// //       })}
// //     </div>

// //     {/* TRAFFIC TYPE */}
// //     <ToggleGroup
// //       type="single"
// //       value={trafficType}
// //       onValueChange={(val) => {
// //         if (val) onTrafficTypeChange(val as any)
// //       }}
// //       className="border rounded-md"
// //     >
// //       <ToggleGroupItem value="overall">Overall</ToggleGroupItem>
// //       <ToggleGroupItem value="organic">Organic</ToggleGroupItem>
// //       <ToggleGroupItem value="inorganic">Inorganic</ToggleGroupItem>
// //     </ToggleGroup>

// //     {/* DATE RANGE */}
// //     <Popover>
// //       <PopoverTrigger asChild>
// //         <Button variant="outline" className="w-[260px] justify-start text-left font-normal">
// //           <CalendarIcon className="mr-2 h-4 w-4" />

// //           {dateRange?.from ? (
// //             dateRange.to
// //               ? `${format(dateRange.from, 'LLL dd, y')} — ${format(dateRange.to, 'LLL dd, y')}`
// //               : format(dateRange.from, 'LLL dd, y')
// //           ) : (
// //             <span>Select date range</span>
// //           )}
// //         </Button>
// //       </PopoverTrigger>

// //       <PopoverContent className="w-auto p-0" align="start">
// //         <DateCalendar
// //           mode="range"
// //           selected={dateRange}
// //           onSelect={onDateRangeChange}
// //           numberOfMonths={2}
// //           disabled={(date) => date > new Date()}
// //           initialFocus
// //         />
// //       </PopoverContent>
// //     </Popover>

// //     <Button onClick={onExport} className="gap-2">
// //       <Download className="h-4 w-4" />
// //       Download Report
// //     </Button>

// //     <Button
// //       variant="secondary"
// //       onClick={onDownloadPPT}
// //       className="gap-2 bg-blue-600 text-white hover:bg-blue-700"
// //     >
// //       <FileDown className="h-4 w-4" />
// //       Export PPT
// //     </Button>

// //   </div>

// // </header>
// //   )
// // }


// 'use client'

// import {
//   BarChart3,
//   CalendarIcon,
//   Download,
//   FileDown,
//   ChevronsUpDown,
//   Check,
//   X,
// } from 'lucide-react'

// import { Button } from '@/components/ui/button'
// import { Badge } from '@/components/ui/badge'
// import {
//   Popover,
//   PopoverContent,
//   PopoverTrigger,
// } from '@/components/ui/popover'
// import {
//   Command,
//   CommandEmpty,
//   CommandGroup,
//   CommandInput,
//   CommandItem,
//   CommandList,
// } from '@/components/ui/command'
// import { Calendar as DateCalendar } from '@/components/ui/calendar'
// import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'

// import { cn } from '@/lib/utils'
// import { getAllParentModels } from '@/lib/modelMap'

// import { DateRange } from 'react-day-picker'
// import { format } from 'date-fns'
// import { useState, useMemo } from 'react'

// interface DashboardHeaderProps {

//   selectedModel: string | null
//   onModelChange: (model: string) => void

//   selectedCompetitors: string[]
//   onCompetitorsChange: (models: string[]) => void

//   onExport: () => void
//   onDownloadPPT: () => void

//   dateRange: DateRange | undefined
//   onDateRangeChange: (range: DateRange | undefined) => void

//   trafficType: 'overall' | 'organic' | 'inorganic'
//   onTrafficTypeChange: (type: 'overall' | 'organic' | 'inorganic') => void
// }

// export function DashboardHeader({
//   selectedModel,
//   onModelChange,

//   selectedCompetitors,
//   onCompetitorsChange,

//   onExport,
//   onDownloadPPT,

//   dateRange,
//   onDateRangeChange,

//   trafficType,
//   onTrafficTypeChange,
// }: DashboardHeaderProps) {

//   /* ----------------------------- */
//   /* ALL PARENT MODELS */
//   /* ----------------------------- */

//   const models = useMemo(() => {

//     const list = getAllParentModels()

//     return [...list].sort((a, b) =>
//       a.label.localeCompare(b.label)
//     )

//   }, [])

//   /* ----------------------------- */
//   /* REMOVE FOCUS MODEL FROM COMPETITORS */
//   /* ----------------------------- */

//   const competitorModels = useMemo(() => {

//     return models.filter(
//       (m) =>
//         m.value !== selectedModel &&
//         !selectedCompetitors.includes(m.value)
//     )

//   }, [models, selectedModel, selectedCompetitors])

//   const [modelOpen, setModelOpen] = useState(false)
//   const [competitorOpen, setCompetitorOpen] = useState(false)

//   const selectedLabel =
//     models.find((m) => m.value === selectedModel)?.label ||
//     'Select model'

//   /* ----------------------------- */
//   /* ADD / REMOVE COMPETITOR */
//   /* ----------------------------- */

//   const toggleCompetitor = (value: string) => {

//     const normalized = value.toLowerCase()

//     if (selectedCompetitors.includes(normalized)) {

//       onCompetitorsChange(
//         selectedCompetitors.filter((v) => v !== normalized)
//       )
//       return
//     }

//     if (selectedCompetitors.length >= 10) return

//     onCompetitorsChange([
//       ...selectedCompetitors,
//       normalized
//     ])
//   }

//   /* ----------------------------- */
//   /* REMOVE COMPETITOR */
//   /* ----------------------------- */

//   const removeCompetitor = (value: string) => {

//     const normalized = value.toLowerCase()

//     onCompetitorsChange(
//       selectedCompetitors.filter((v) => v !== normalized)
//     )
//   }

//   return (
// <header className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

//   {/* LEFT */}
//   <div className="flex items-center gap-3">
//     <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
//       <BarChart3 className="h-5 w-5 text-primary-foreground" />
//     </div>

//     <div>
//       <h1 className="text-xl font-semibold tracking-tight">
//         CarDekho Digital Brand Health Dashboard
//       </h1>

//       <p className="text-sm text-muted-foreground">
//         Automotive competitive intelligence and performance monitoring
//       </p>
//     </div>
//   </div>

//   {/* RIGHT CONTROLS */}
//   <div className="flex flex-wrap items-center gap-3">

//     {/* MODEL SELECT */}
//     <Popover open={modelOpen} onOpenChange={setModelOpen}>
//       <PopoverTrigger asChild>
//         <Button variant="outline" className="w-[220px] justify-between">
//           {selectedLabel}
//           <ChevronsUpDown className="ml-2 h-4 w-4 opacity-50" />
//         </Button>
//       </PopoverTrigger>

//       <PopoverContent className="w-[260px] p-0">
//         <Command>
//           <CommandInput placeholder="Search model..." />

//           <CommandList className="max-h-[300px] overflow-y-auto">
//             <CommandEmpty>No model found.</CommandEmpty>

//             <CommandGroup>
//               {models.map((model) => (
//                 <CommandItem
//                   key={model.value}
//                   value={model.label}
//                   onSelect={() => {
//                     onModelChange(model.value)
//                     setModelOpen(false)
//                   }}
//                 >
//                   <Check
//                     className={cn(
//                       'mr-2 h-4 w-4',
//                       selectedModel === model.value
//                         ? 'opacity-100'
//                         : 'opacity-0'
//                     )}
//                   />
//                   {model.label}
//                 </CommandItem>
//               ))}
//             </CommandGroup>

//           </CommandList>
//         </Command>
//       </PopoverContent>
//     </Popover>

//     {/* COMPETITOR SELECT */}
//     <Popover open={competitorOpen} onOpenChange={setCompetitorOpen}>
//       <PopoverTrigger asChild>
//         <Button variant="outline" className="w-[220px] justify-between">
//           Select Competitors
//           <ChevronsUpDown className="ml-2 h-4 w-4 opacity-50" />
//         </Button>
//       </PopoverTrigger>

//       <PopoverContent className="w-[260px] p-0">
//         <Command>
//           <CommandInput placeholder="Search competitors..." />

//           <CommandList className="max-h-[300px] overflow-y-auto">
//             <CommandEmpty>No competitor found.</CommandEmpty>

//             <CommandGroup>
//               {competitorModels.map((model) => (
//                 <CommandItem
//                   key={model.value}
//                   value={model.label}
//                   onSelect={() => toggleCompetitor(model.value)}
//                 >
//                   <Check
//                     className={cn(
//                       'mr-2 h-4 w-4',
//                       selectedCompetitors.includes(model.value)
//                         ? 'opacity-100'
//                         : 'opacity-0'
//                     )}
//                   />
//                   {model.label}
//                 </CommandItem>
//               ))}
//             </CommandGroup>

//           </CommandList>
//         </Command>
//       </PopoverContent>
//     </Popover>

//     {/* SELECTED COMPETITORS */}
//     <div className="flex flex-wrap gap-2 max-w-[350px]">
//       {selectedCompetitors.map((comp) => {

//         const label =
//           models.find((m) => m.value === comp)?.label || comp

//         return (
//           <div
//             key={comp}
//             className="flex items-center gap-1 rounded bg-muted px-2 py-1 text-sm"
//           >
//             <span>{label}</span>

//             <X
//               className="h-3 w-3 cursor-pointer hover:text-red-500"
//               onClick={(e) => {
//                 e.preventDefault()
//                 e.stopPropagation()
//                 removeCompetitor(comp)
//               }}
//             />

//           </div>
//         )
//       })}
//     </div>

//     {/* TRAFFIC TYPE */}
//     <ToggleGroup
//       type="single"
//       value={trafficType}
//       onValueChange={(val) => {
//         if (val) onTrafficTypeChange(val as any)
//       }}
//       className="border rounded-md"
//     >
//       <ToggleGroupItem value="overall">Overall</ToggleGroupItem>
//       <ToggleGroupItem value="organic">Organic</ToggleGroupItem>
//       <ToggleGroupItem value="inorganic">Inorganic</ToggleGroupItem>
//     </ToggleGroup>

//     {/* DATE RANGE */}
//     <Popover>
//       <PopoverTrigger asChild>
//         <Button variant="outline" className="w-[260px] justify-start text-left font-normal">
//           <CalendarIcon className="mr-2 h-4 w-4" />

//           {dateRange?.from ? (
//             dateRange.to
//               ? `${format(dateRange.from, 'LLL dd, y')} — ${format(dateRange.to, 'LLL dd, y')}`
//               : format(dateRange.from, 'LLL dd, y')
//           ) : (
//             <span>Select date range</span>
//           )}
//         </Button>
//       </PopoverTrigger>

//       <PopoverContent className="w-auto p-0" align="start">
//         <DateCalendar
//           mode="range"
//           selected={dateRange}
//           onSelect={onDateRangeChange}
//           numberOfMonths={2}
//           disabled={(date) => date > new Date()}
//           initialFocus
//         />
//       </PopoverContent>
//     </Popover>

//     <Button onClick={onExport} className="gap-2">
//       <Download className="h-4 w-4" />
//       Download Report
//     </Button>

//     <Button
//       variant="secondary"
//       onClick={onDownloadPPT}
//       className="gap-2 bg-blue-600 text-white hover:bg-blue-700"
//     >
//       <FileDown className="h-4 w-4" />
//       Export PPT
//     </Button>

//   </div>

// </header>
//   )
// }








'use client'

import {
  BarChart3,
  CalendarIcon,
  Download,
  FileDown,
  ChevronsUpDown,
  Check,
  X,
} from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command'
import { Calendar as DateCalendar } from '@/components/ui/calendar'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'

import { cn } from '@/lib/utils'
import { getAllParentModels } from '@/lib/modelMap'

import { DateRange } from 'react-day-picker'
import { format } from 'date-fns'
import { useState, useMemo } from 'react'

interface DashboardHeaderProps {

  selectedModel: string | null
  onModelChange: (model: string) => void

  selectedCompetitors: string[]
  onCompetitorsChange: (models: string[]) => void

  onExport: () => void
  onDownloadPPT: () => void

  dateRange: DateRange | undefined
  onDateRangeChange: (range: DateRange | undefined) => void

  trafficType: 'overall' | 'organic' | 'inorganic'
  onTrafficTypeChange: (type: 'overall' | 'organic' | 'inorganic') => void
}

export function DashboardHeader({
  selectedModel,
  onModelChange,

  selectedCompetitors,
  onCompetitorsChange,

  onExport,
  onDownloadPPT,

  dateRange,
  onDateRangeChange,

  trafficType,
  onTrafficTypeChange,
}: DashboardHeaderProps) {

  const models = useMemo(() => {

    const list = getAllParentModels()

    return [...list].sort((a, b) =>
      a.label.localeCompare(b.label)
    )

  }, [])

  const competitorModels = useMemo(() => {

    return models.filter(
      (m) =>
        m.value !== selectedModel &&
        !selectedCompetitors.includes(m.value)
    )

  }, [models, selectedModel, selectedCompetitors])

  const [modelOpen, setModelOpen] = useState(false)
  const [competitorOpen, setCompetitorOpen] = useState(false)

  const selectedLabel =
    models.find((m) => m.value === selectedModel)?.label ||
    'Select model'

  const toggleCompetitor = (value: string) => {

    const normalized = value.toLowerCase()

    if (selectedCompetitors.includes(normalized)) {

      onCompetitorsChange(
        selectedCompetitors.filter((v) => v !== normalized)
      )
      return
    }

    if (selectedCompetitors.length >= 10) return

    onCompetitorsChange([
      ...selectedCompetitors,
      normalized
    ])
  }

  const removeCompetitor = (value: string) => {

    const normalized = value.toLowerCase()

    onCompetitorsChange(
      selectedCompetitors.filter((v) => v !== normalized)
    )
  }

  return (
<header className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

  {/* LEFT */}
  <div className="flex items-center gap-3">
    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
      <BarChart3 className="h-5 w-5 text-primary-foreground" />
    </div>

    <div>
      <h1 className="text-xl font-semibold tracking-tight">
        CarDekho Digital Brand Health Dashboard
      </h1>

      <p className="text-sm text-muted-foreground">
        Automotive competitive intelligence and performance monitoring
      </p>
    </div>
  </div>

  {/* RIGHT CONTROLS */}
  <div className="flex flex-wrap items-center gap-3">

    {/* MODEL SELECT */}
    <Popover open={modelOpen} onOpenChange={setModelOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" className="w-[220px] justify-between">
          {selectedLabel}
          <ChevronsUpDown className="ml-2 h-4 w-4 opacity-50" />
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-[260px] p-0">
        <Command>
          <CommandInput placeholder="Search model..." />

          <CommandList className="max-h-[300px] overflow-y-auto">
            <CommandEmpty>No model found.</CommandEmpty>

            <CommandGroup>
              {models.map((model) => (
                <CommandItem
                  key={model.value}
                  value={model.label}
                  onSelect={() => {
                    onModelChange(model.value)
                    setModelOpen(false)
                  }}
                >
                  <Check
                    className={cn(
                      'mr-2 h-4 w-4',
                      selectedModel === model.value
                        ? 'opacity-100'
                        : 'opacity-0'
                    )}
                  />
                  {model.label}
                </CommandItem>
              ))}
            </CommandGroup>

          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>

    {/* COMPETITOR SELECT */}
    <Popover open={competitorOpen} onOpenChange={setCompetitorOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" className="w-[220px] justify-between">
          Select Competitors
          <ChevronsUpDown className="ml-2 h-4 w-4 opacity-50" />
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-[260px] p-0">
        <Command>
          <CommandInput placeholder="Search competitors..." />

          <CommandList className="max-h-[300px] overflow-y-auto">
            <CommandEmpty>No competitor found.</CommandEmpty>

            <CommandGroup>
              {competitorModels.map((model) => (
                <CommandItem
                  key={model.value}
                  value={model.label}
                  onSelect={() => toggleCompetitor(model.value)}
                >
                  <Check
                    className={cn(
                      'mr-2 h-4 w-4',
                      selectedCompetitors.includes(model.value)
                        ? 'opacity-100'
                        : 'opacity-0'
                    )}
                  />
                  {model.label}
                </CommandItem>
              ))}
            </CommandGroup>

          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>

    {/* SELECTED COMPETITORS */}
    <div className="flex flex-wrap gap-2 max-w-[350px]">
      {selectedCompetitors.map((comp) => {

        const label =
          models.find((m) => m.value === comp)?.label || comp

        return (
          <div
            key={comp}
            className="flex items-center gap-1 rounded bg-muted px-2 py-1 text-sm"
          >
            <span>{label}</span>

            <button
              type="button"
              className="flex items-center justify-center hover:text-red-500"
              onClick={(e) => {
                e.preventDefault()
                e.stopPropagation()
                removeCompetitor(comp)
              }}
            >
              <X className="h-3 w-3" />
            </button>

          </div>
        )
      })}
    </div>

    {/* TRAFFIC TYPE */}
    <ToggleGroup
      type="single"
      value={trafficType}
      onValueChange={(val) => {
        if (val) onTrafficTypeChange(val as any)
      }}
      className="border rounded-md"
    >
      <ToggleGroupItem value="overall">Overall</ToggleGroupItem>
      <ToggleGroupItem value="organic">Organic</ToggleGroupItem>
      <ToggleGroupItem value="inorganic">Inorganic</ToggleGroupItem>
    </ToggleGroup>

    {/* DATE RANGE */}
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" className="w-[260px] justify-start text-left font-normal">
          <CalendarIcon className="mr-2 h-4 w-4" />

          {dateRange?.from ? (
            dateRange.to
              ? `${format(dateRange.from, 'LLL dd, y')} — ${format(dateRange.to, 'LLL dd, y')}`
              : format(dateRange.from, 'LLL dd, y')
          ) : (
            <span>Select date range</span>
          )}
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-auto p-0" align="start">
        <DateCalendar
          mode="range"
          selected={dateRange}
          onSelect={onDateRangeChange}
          numberOfMonths={2}
          disabled={(date) => date > new Date()}
          initialFocus
        />
      </PopoverContent>
    </Popover>

    <Button onClick={onExport} className="gap-2">
      <Download className="h-4 w-4" />
      Download Report
    </Button>

    <Button
      variant="secondary"
      onClick={onDownloadPPT}
      className="gap-2 bg-blue-600 text-white hover:bg-blue-700"
    >
      <FileDown className="h-4 w-4" />
      Export PPT
    </Button>

  </div>

</header>
  )
}
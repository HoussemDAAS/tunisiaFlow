"use client"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
  interface props{
 filters: {
  name: string,
  value: string
 }[]  ,
 otherClasses?:string,
 containerClasses?:string
}
const Filter = ({filters,otherClasses,containerClasses}:props) => {
  return (

    <div className={`relative ${containerClasses} gap-4 `}>
    <Select >
  <SelectTrigger className={` ${otherClasses} max-w-[180px] background-light800_dark400 border-none shadow-none outline-none `}>
    <SelectValue placeholder="Select Filter" />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="light">Newest</SelectItem>
    <SelectItem value="dark">Recommended</SelectItem>
    <SelectItem value="system">Frequement</SelectItem>
  </SelectContent>
</Select>
    </div>
    
  )
}

export default Filter

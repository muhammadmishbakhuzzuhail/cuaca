import {
   DropdownMenu,
   DropdownMenuContent,
   DropdownMenuLabel,
   DropdownMenuSeparator,
   DropdownMenuTrigger,
   DropdownMenuRadioGroup,
   DropdownMenuRadioItem,
} from "@/components/ui/dropdown-menu";
import { ScrollArea } from "@/components/ui/scroll-area";
import { IoIosArrowDown } from "react-icons/io";

type Props = {
   title: string;
   label: string;
   items: { nama: string; kode: string }[];
   value: string;
   setValue: (id: string) => void;
   open: boolean;
   onClick: () => void;
};

const Dropdown = ({ title, items, label, value, setValue, open, onClick }: Props) => {
   const parts = title.split(" ");
   const customTitle: string[] = [];

   parts.forEach((part) => {
      if (part.length === 0) return;
      customTitle.push(part[0].toUpperCase() + part.slice(1).toLowerCase());
   });

   return (
      <DropdownMenu modal={false} open={open}>
         <DropdownMenuTrigger
            onClick={onClick}
            className="px-4 py-0.5 bg-purple-200 rounded-sm min-w-32 max-w-64 hover:cursor-pointer"
         >
            <div className="text-center font-medium text-sm flex items-center gap-1 whitespace-nowrap">
               <h6 className="flex-1">{customTitle.join(" ")}</h6>
               <IoIosArrowDown
                  className={`${
                     open ? "" : "rotate-180"
                  } transform transition duration-300 size-3 ml-auto`}
               />
            </div>
         </DropdownMenuTrigger>
         <DropdownMenuContent className="relative p-0 overflow-y-hidden">
            <div className="sticky top-0 inset-x-0 z-50 bg-purple-200">
               <DropdownMenuLabel className="font-medium text-center text-base py-0.5">
                  {label}
               </DropdownMenuLabel>
               <DropdownMenuSeparator />
            </div>
            <DropdownMenuRadioGroup
               value={value}
               onValueChange={setValue}
               className="overflow-y-scroll"
            >
               <ScrollArea className="max-h-72 w-48">
                  {items.map((item, id) => {
                     const parts = item.nama.split(" ");
                     const customNama: string[] = [];

                     parts.forEach((part) => {
                        if (part.length === 0) return;
                        customNama.push(part[0].toUpperCase() + part.slice(1).toLowerCase());
                     });

                     return (
                        <DropdownMenuRadioItem key={id} value={item.kode}>
                           {customNama.join(" ")}
                        </DropdownMenuRadioItem>
                     );
                  })}
               </ScrollArea>
            </DropdownMenuRadioGroup>
         </DropdownMenuContent>
      </DropdownMenu>
   );
};

export default Dropdown;

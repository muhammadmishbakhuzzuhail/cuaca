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
import { useMainStore } from "@/hooks/ueMainStore";
import { useRouter } from "next/navigation";
import { IoIosArrowDown } from "react-icons/io";

export interface PropsDropdown {
   title: string;
   label: string;
   items: { id: string; nama: string }[];
   value: string;
   setValue: (id: string) => void;
   open: boolean;
   onClick: () => void;
}

const Dropdown = ({ title, items, label, value, setValue, open, onClick }: PropsDropdown) => {
   const router = useRouter();

   const parts = title.split(" ");
   const customTitle: string[] = [];

   parts.forEach((part) => {
      if (part.length === 0) return;
      customTitle.push(part[0].toUpperCase() + part.slice(1).toLowerCase());
   });

   const { mainDesaId } = useMainStore();

   return (
      <DropdownMenu modal={false} open={open}>
         <DropdownMenuTrigger
            onClick={onClick}
            className="px-4 py-0.5 bg-purple-500 text-white rounded-sm min-w-32 max-w-64 hover:cursor-pointer border border-purple-300"
         >
            <div className="text-center font-medium text-sm flex items-center gap-1 whitespace-nowrap">
               <h6 className="flex-1 text-white">{customTitle.join(" ")}</h6>
               <IoIosArrowDown
                  className={`${
                     open ? "" : "rotate-180"
                  } transform transition duration-300 size-3 ml-auto`}
               />
            </div>
         </DropdownMenuTrigger>
         <DropdownMenuContent className="relative p-0 overflow-y-hidden">
            <div className="sticky top-0 inset-x-0 z-50 bg-purple-500">
               <DropdownMenuLabel className="font-medium text-center text-base py-0.5 text-white">
                  {label}
               </DropdownMenuLabel>
               <DropdownMenuSeparator />
            </div>
            <DropdownMenuRadioGroup
               value={value}
               onValueChange={(id) => {
                  setValue(id);
                  if (label === "Desa") {
                     router.push(`/cuaca/desa/${mainDesaId}`);
                  }
               }}
               className="overflow-y-scroll"
            >
               <ScrollArea className="max-h-72 w-48">
                  {items.map((item) => {
                     const parts = item.nama.split(" ");
                     const customNama: string[] = [];

                     parts.forEach((part) => {
                        if (part.length === 0) return;
                        customNama.push(part[0].toUpperCase() + part.slice(1).toLowerCase());
                     });

                     return (
                        <DropdownMenuRadioItem
                           key={item.id}
                           value={item.id}
                           className="hover:bg-purple-200"
                        >
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

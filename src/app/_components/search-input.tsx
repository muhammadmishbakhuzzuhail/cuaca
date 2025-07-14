"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { IoSearch } from "react-icons/io5";

const SearchInput = () => {
   const [value, setValue] = React.useState<string>("");
   return (
      <div className="flex flex-row gap-2">
         <Input
            placeholder="Cari nama desa..."
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className="rounded-full w-lg focus-visible:ring-0 font-medium font-sans border-black/20 px-5 selection:bg-black/10 selection:text-black"
         />
         <Button
            variant="link"
            size="icon"
            className="p-0 bg-purple-500 rounded-full hover:cursor-pointer active:scale-95"
         >
            <IoSearch size="1.5em" className="text-white" />
         </Button>
      </div>
   );
};

export default SearchInput;

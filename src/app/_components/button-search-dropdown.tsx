"use client";

import { Button } from "@/components/ui/button";
import { useToggleContext } from "@/hooks/useToggleContext";
import { IoIosArrowDown } from "react-icons/io";

const ButtonSearchDropdown = () => {
   const { isSearchDropdownOpen, setIsSearchDropdownOpen } = useToggleContext();
   return (
      <Button
         size="icon"
         variant="link"
         onClick={() => setIsSearchDropdownOpen((prev) => !prev)}
         className="p-0 ml-auto"
      >
         <IoIosArrowDown
            className={`${
               isSearchDropdownOpen ? "" : "rotate-180"
            } transform transition duration-300`}
         />
      </Button>
   );
};

export default ButtonSearchDropdown;

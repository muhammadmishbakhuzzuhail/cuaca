"use client";

import React, { createContext } from "react";

type TitleDropdown = "" | "provinsi" | "kota" | "kecamatan" | "desa";

type TToggleContext = {
   isSearchDropdownOpen: boolean;
   setIsSearchDropdownOpen: React.Dispatch<React.SetStateAction<boolean>>;
   isLoading: boolean;
   setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
   titleDropdownOpen: TitleDropdown;
   setTitleDropdownOpen: React.Dispatch<React.SetStateAction<TitleDropdown>>;
};

export const ToggleContext = createContext<TToggleContext | undefined>(
   undefined
);

export const ToggleContextProvider = ({
   children,
}: {
   children: React.ReactNode;
}) => {
   const [isSearchDropdownOpen, setIsSearchDropdownOpen] =
      React.useState<boolean>(false);
   const [isLoading, setIsLoading] = React.useState<boolean>(false);
   const [titleDropdownOpen, setTitleDropdownOpen] =
      React.useState<TitleDropdown>("");

   return (
      <ToggleContext.Provider
         value={{
            isSearchDropdownOpen,
            setIsSearchDropdownOpen,
            isLoading,
            setIsLoading,
            titleDropdownOpen,
            setTitleDropdownOpen,
         }}
      >
         {children}
      </ToggleContext.Provider>
   );
};

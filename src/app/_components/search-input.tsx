"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { IoSearch } from "react-icons/io5";
import { useQuery } from "@tanstack/react-query";
import { getAllDataDesa } from "@/utils/getAllDataDesa";
import { useDebounce } from "@/hooks/useDebounce";
import highlightText from "./highlight-text";
import { useRouter } from "next/navigation";

const SearchInput = () => {
  const router = useRouter();

  const [value, setValue] = React.useState<string>("");
  const [showList, setShowList] = React.useState<boolean>();
  const debouncedValue = useDebounce(value, 1000);

  const { data } = useQuery({
    queryKey: ["input", debouncedValue],
    queryFn: () => getAllDataDesa(debouncedValue),
    enabled: debouncedValue.length > 0,
  });

  React.useEffect(() => {
    if (value.length > 0) {
      setShowList(true);
    } else {
      setShowList(false);
    }
  }, [value]);

  const containerRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setShowList(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showList]);

  return (
    <div className="flex flex-row gap-2 relative" ref={containerRef}>
      <Input
        placeholder="Cari nama desa..."
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="rounded-full w-lg focus-visible:ring-0 font-medium font-sans border-black/20 px-5 selection:bg-black/10 selection:text-black bg-white"
      />
      <Button
        variant="link"
        size="icon"
        className="p-0 bg-purple-500 rounded-full hover:cursor-pointer active:scale-95"
      >
        <IoSearch size="1.5em" className="text-white" />
      </Button>
      {showList && data?.data && (
        <ul className="absolute top-full left-0 rounded-md bg-white border border-black/20 mt-1 max-h-60 overflow-y-auto z-50 w-lg font-sans">
          {data.data.map(({ desaId, namaDesa, namaKecamatan, namaKota }) => {
            const parts = namaKota.split(" ");
            const customNamaKota: string[] = [];
            parts.forEach((part) => {
              customNamaKota.push(
                part.slice(0, 1).toUpperCase() + part.slice(1).toLowerCase()
              );
            });

            return (
              <li
                key={desaId}
                className="p-2 hover:bg-purple-500 hover:text-white cursor-pointer text-black leading-none px-4 group/show-list"
                onClick={() => {
                  setValue(namaDesa);
                  setShowList(false);
                  router.push(`/cuaca/desa/${desaId}`);
                }}
              >
                {highlightText(namaDesa, value)}, {namaKecamatan},{" "}
                {customNamaKota.join(" ")}
              </li>
            );
          })}
        </ul>
      )}

      {showList && data?.data?.length === 0 && (
        <div className="absolute top-full left-0 w-lg rounded-md border-black/40 bg-white border mt-1 z-50 p-2 text-sm text-red-500">
          Tidak ditemukan
        </div>
      )}
    </div>
  );
};

export default SearchInput;

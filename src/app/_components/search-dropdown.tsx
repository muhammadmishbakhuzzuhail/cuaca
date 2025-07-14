"use client";

import * as React from "react";
import Dropdown from "./dropdown";
import { useDropdownStore } from "@/hooks/useDropdownStore";
import { useToggleContext } from "@/hooks/useToggleContext";
import { getListProvinsi } from "@/utils/getListProvinsi";
import { Base, Kota, Kecamatan, Desa } from "@/types/base";
import { getListKota } from "@/utils/getListKota";
import { getListKecamatan } from "@/utils/getListKecamatan";
import { getListDesa } from "@/utils/getListDesa";
import { getTitleProvinsi } from "@/utils/getTitleProvinsi";
import { getTitleKecamatan } from "@/utils/getTitleKecamatan";
import { getTitleDesa } from "@/utils/getTitleDesa";
import { getTitleKota } from "@/utils/getTitleKota";
import { PropsDropdown } from "@/types/props-dropdown";

const SearchDropdown = () => {
   // Save data
   const [dataProvinsi, setDataProvinsi] = React.useState<Omit<Base, "kota">[]>([]);
   const [dataKota, setDataKota] = React.useState<Omit<Kota, "kecamatan">[]>([]);
   const [dataKecamatan, setDataKecamatan] = React.useState<Omit<Kecamatan, "desa">[]>([]);
   const [dataDesa, setDataDesa] = React.useState<Desa[]>([]);

   // Name title
   const [titleProvinsi, setTitleProvinsi] = React.useState<string>("");
   const [titleKota, setTitleKota] = React.useState<string>("");
   const [titleKecamatan, setTitleKecamatan] = React.useState<string>("");
   const [titleDesa, setTitleDesa] = React.useState<string>("");

   const { isSearchDropdownOpen, setIsLoading, titleDropdownOpen, setTitleDropdownOpen } =
      useToggleContext();
   const {
      desaId,
      setDesaId,
      kecamatanId,
      setKecamatanId,
      kotaId,
      setKotaId,
      provinsiId,
      setProvinsiId,
   } = useDropdownStore();

   const wrapperRef = React.useRef<HTMLDivElement>(null);

   // Auto-select first item dan revalidate names
   React.useEffect(() => {
      const autoSelectAndRevalidate = async () => {
         try {
            // Ketika provinsi berubah, auto-select kota pertama
            if (provinsiId && !kotaId) {
               const kotaResponse = await getListKota({ provinsiId });
               if (kotaResponse.data && kotaResponse.data.length > 0) {
                  const firstKota = kotaResponse.data[0];
                  setKotaId(firstKota.kode);
                  setDataKota(kotaResponse.data);
               }
            }

            // Ketika kota berubah, auto-select kecamatan pertama
            if (kotaId && !kecamatanId) {
               const kecamatanResponse = await getListKecamatan({ kotaId });
               if (kecamatanResponse.data && kecamatanResponse.data.length > 0) {
                  const firstKecamatan = kecamatanResponse.data[0];
                  setKecamatanId(firstKecamatan.kode);
                  setDataKecamatan(kecamatanResponse.data);
               }
            }

            // Ketika kecamatan berubah, auto-select desa pertama
            if (kecamatanId && !desaId) {
               const desaResponse = await getListDesa({ kecamatanId });
               if (desaResponse.data && desaResponse.data.length > 0) {
                  const firstDesa = desaResponse.data[0];
                  setDesaId(firstDesa.kode);
                  setDataDesa(desaResponse.data);
               }
            }
         } catch (error) {
            console.error("Error auto-selecting:", error);
         }
      };

      if (isSearchDropdownOpen) {
         autoSelectAndRevalidate();
      }
   }, [provinsiId, kotaId, kecamatanId, isSearchDropdownOpen]);

   // Revalidate titles ketika ID berubah
   React.useEffect(() => {
      const revalidateTitles = async () => {
         setIsLoading(true);
         try {
            // Revalidate title provinsi
            if (provinsiId) {
               const provinsi = await getTitleProvinsi({ provinsiId });
               if (provinsi?.data?.nama) {
                  setTitleProvinsi(provinsi.data.nama);
               }
            } else {
               setTitleProvinsi("");
            }

            // Revalidate title kota
            if (kotaId) {
               const kota = await getTitleKota({ kotaId });
               if (kota?.data?.nama) {
                  setTitleKota(kota.data.nama);
               }
            } else {
               setTitleKota("");
            }

            // Revalidate title kecamatan
            if (kecamatanId) {
               const kecamatan = await getTitleKecamatan({ kecamatanId });
               if (kecamatan.data?.nama) {
                  setTitleKecamatan(kecamatan.data.nama);
               }
            } else {
               setTitleKecamatan("");
            }

            // Revalidate title desa
            if (desaId) {
               const desa = await getTitleDesa({ desaId });
               if (desa.data?.nama) {
                  setTitleDesa(desa.data.nama);
               }
            } else {
               setTitleDesa("");
            }
         } catch (err) {
            console.error("Error revalidating titles:", err);
         } finally {
            setIsLoading(false);
         }
      };

      revalidateTitles();
   }, [isSearchDropdownOpen, desaId, kecamatanId, kotaId, provinsiId]);

   const handleDropdown = React.useCallback(async () => {
      if (!titleDropdownOpen) return;

      setIsLoading(true);
      let response;

      try {
         switch (titleDropdownOpen) {
            case "provinsi":
               response = await getListProvinsi();
               setDataProvinsi(response.data || []);
               break;
            case "kota":
               if (provinsiId) {
                  response = await getListKota({ provinsiId });
                  setDataKota(response.data || []);
               }
               break;
            case "kecamatan":
               if (kotaId) {
                  response = await getListKecamatan({ kotaId });
                  setDataKecamatan(response.data || []);
               }
               break;
            case "desa":
               if (kecamatanId) {
                  response = await getListDesa({ kecamatanId });
                  setDataDesa(response.data || []);
               }
               break;
            default:
               break;
         }
      } catch (error) {
         console.error("Gagal fetch data: ", error);
      } finally {
         setIsLoading(false);
      }
   }, [titleDropdownOpen, provinsiId, kotaId, kecamatanId]);

   // When open dropdown
   React.useEffect(() => {
      handleDropdown();
      const handleClickOutside = (event: MouseEvent) => {
         if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
            setTitleDropdownOpen("");
         }
      };

      document.addEventListener("mousedown", handleClickOutside);
      return () => {
         document.removeEventListener("mousedown", handleClickOutside);
      };
   }, [handleDropdown]);

   const dataDropdown: PropsDropdown[] = [
      {
         items: dataProvinsi,
         title: titleProvinsi,
         label: "Provinsi",
         onClick: () => setTitleDropdownOpen((prev) => (prev === "provinsi" ? "" : "provinsi")),
         value: provinsiId,
         setValue: setProvinsiId,
         open: titleDropdownOpen === "provinsi",
      },
      {
         items: dataKota,
         title: titleKota,
         label: "Kota/Kabupaten",
         onClick: () => setTitleDropdownOpen((prev) => (prev === "kota" ? "" : "kota")),
         value: kotaId,
         setValue: setKotaId,
         open: titleDropdownOpen === "kota",
      },
      {
         items: dataKecamatan,
         title: titleKecamatan,
         label: "Kecamatan",
         onClick: () => setTitleDropdownOpen((prev) => (prev === "kecamatan" ? "" : "kecamatan")),
         value: kecamatanId,
         setValue: setKecamatanId,
         open: titleDropdownOpen === "kecamatan",
      },
      {
         items: dataDesa,
         title: titleDesa,
         label: "Desa",
         onClick: () => setTitleDropdownOpen((prev) => (prev === "desa" ? "" : "desa")),
         value: desaId,
         setValue: setDesaId,
         open: titleDropdownOpen === "desa",
      },
   ];

   return (
      <div
         ref={wrapperRef}
         className={`flex justify-around items-center transform transition duration-300 ${
            isSearchDropdownOpen ? "opacity-100" : "opacity-0"
         } gap-4`}
      >
         {dataDropdown.map(({ items, title, label, onClick, open, value, setValue }, id) => (
            <Dropdown
               key={id}
               items={items}
               title={title}
               label={label}
               value={value}
               setValue={setValue}
               open={open}
               onClick={onClick}
            />
         ))}
      </div>
   );
};

export default SearchDropdown;

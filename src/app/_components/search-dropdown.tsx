"use client";

import * as React from "react";
import Dropdown from "./dropdown";
import { useDropdownStore } from "@/hooks/useDropdownStore";
import { useToggleContext } from "@/hooks/useToggleContext";
import { Provinsi, Kota, Kecamatan, Desa } from "@/types/data";
import { getDataKota } from "@/utils/getDataKota";
import { getDataKecamatan } from "@/utils/getDataKecamatan";
import { getDataDesa } from "@/utils/getDataDesa";
import { getDataProvinsi } from "@/utils/getDataProvinsi";
import { useMainStore } from "@/hooks/ueMainStore";

const SearchDropdown = () => {
  // Save data
  const [dataProvinsi, setDataProvinsi] = React.useState<
    Omit<Provinsi, "kota">[]
  >([]);
  const [dataKota, setDataKota] = React.useState<Omit<Kota, "kecamatan">[]>([]);
  const [dataKecamatan, setDataKecamatan] = React.useState<
    Omit<Kecamatan, "desa">[]
  >([]);
  const [dataDesa, setDataDesa] = React.useState<Desa[]>([]);

  const {
    isSearchDropdownOpen,
    setIsLoading,
    titleDropdownOpen,
    setTitleDropdownOpen,
  } = useToggleContext();

  const {
    desaId,
    setDesaId,
    kecamatanId,
    setKecamatanId,
    kotaId,
    setKotaId,
    provinsiId,
    setProvinsiId,
    namaDesa,
    setNamaDesa,
    namaKecamatan,
    setNamaKecamatan,
    namaKota,
    setNamaKota,
    namaProvinsi,
    setNamaProvinsi,
  } = useDropdownStore();
  const { setMainDesaId } = useMainStore();

  const wrapperRef = React.useRef<HTMLDivElement>(null);

  // Auto-select first item dan revalidate names
  React.useEffect(() => {
    const autoSelectAndRevalidate = async () => {
      try {
        // Ketika provinsi berubah, auto-select kota pertama
        if (provinsiId && !kotaId) {
          const kotaResponse = await getDataKota(provinsiId);
          if (kotaResponse.data && kotaResponse.data.length > 0) {
            const firstKota = kotaResponse.data[0];
            setKotaId(firstKota.kotaId);
            setDataKota(kotaResponse.data);
          }
        }

        // Ketika kota berubah, auto-select kecamatan pertama
        if (kotaId && !kecamatanId) {
          const kecamatanResponse = await getDataKecamatan(kotaId);
          if (kecamatanResponse.data && kecamatanResponse.data.length > 0) {
            const firstKecamatan = kecamatanResponse.data[0];
            setKecamatanId(firstKecamatan.kecamatanId);
            setDataKecamatan(kecamatanResponse.data);
          }
        }

        // Ketika kecamatan berubah, auto-select desa pertama
        if (kecamatanId && !desaId) {
          const desaResponse = await getDataDesa(kecamatanId);
          if (desaResponse.data && desaResponse.data.length > 0) {
            const firstDesa = desaResponse.data[0];
            setDesaId(firstDesa.desaId);
            setMainDesaId(firstDesa.desaId); // Update main store
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
  }, [
    provinsiId,
    kotaId,
    kecamatanId,
    isSearchDropdownOpen,
    desaId,
    setMainDesaId,
    setKotaId,
    setKecamatanId,
    setDesaId,
  ]);

  // Revalidate titles ketika ID berubah (manual)
  // Hanya untuk set title provinsi
  React.useEffect(() => {
    const revalidateTitles = async () => {
      setIsLoading(true);
      try {
        // Revalidate title provinsi
        if (provinsiId) {
          const provinsi = await getDataProvinsi();
          if (provinsi.data && provinsi.data.length > 0) {
            const found = provinsi.data?.find(
              (item) => item.provinsiId === provinsiId
            );
            if (found) {
              setNamaProvinsi(found.nama);
            }
          }
        } else {
          setNamaProvinsi("");
        }

        // Revalidate title kota
        if (kotaId) {
          const kota = await getDataKota(provinsiId);
          if (kota.data && kota.data.length > 0) {
            const found = kota.data.find((item) => item.kotaId === kotaId);
            if (found) {
              setNamaKota(found.nama);
            }
          }
        } else {
          setNamaKota("");
        }

        // Revalidate title kecamatan
        if (kecamatanId) {
          const kecamatan = await getDataKecamatan(kotaId);
          if (kecamatan.data && kecamatan.data.length > 0) {
            const found = kecamatan.data.find(
              (item) => item.kecamatanId === kecamatanId
            );
            if (found) {
              setNamaKecamatan(found.nama);
            }
          }
        } else {
          setNamaKecamatan("");
        }

        // Revalidate title desa
        if (desaId) {
          const desa = await getDataDesa(kecamatanId);
          if (desa.data && desa.data.length > 0) {
            const found = desa.data.find((item) => item.desaId === desaId);
            if (found) {
              setNamaDesa(found.nama);
            }
          }
        } else {
          setNamaDesa("");
        }
      } catch (err) {
        console.error("Error revalidating titles:", err);
      } finally {
        setIsLoading(false);
      }
    };

    revalidateTitles();
  }, [
    isSearchDropdownOpen,
    desaId,
    kecamatanId,
    kotaId,
    provinsiId,
    setIsLoading,
    setNamaDesa,
    setNamaKecamatan,
    setNamaKota,
    setNamaProvinsi,
  ]);

  const handleDropdown = React.useCallback(async () => {
    if (!titleDropdownOpen) return;

    setIsLoading(true);
    let response;

    try {
      switch (titleDropdownOpen) {
        case "provinsi":
          response = await getDataProvinsi();
          setDataProvinsi(response.data || []);
          break;
        case "kota":
          if (provinsiId) {
            response = await getDataKota(provinsiId);
            setDataKota(response.data || []);
          }
          break;
        case "kecamatan":
          if (kotaId) {
            response = await getDataKecamatan(kotaId);
            setDataKecamatan(response.data || []);
          }
          break;
        case "desa":
          if (kecamatanId) {
            response = await getDataDesa(kecamatanId);
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
  }, [titleDropdownOpen, provinsiId, kotaId, kecamatanId, setIsLoading]);

  // When open dropdown
  React.useEffect(() => {
    handleDropdown();
    const handleClickOutside = (event: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setTitleDropdownOpen("");
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [handleDropdown, setTitleDropdownOpen]);

  const formattedProvinsi = dataProvinsi.map((item) => ({
    id: item.provinsiId,
    nama: item.nama,
  }));

  const formattedKota = dataKota.map((item) => ({
    id: item.kotaId,
    nama: item.nama,
  }));

  const formattedKecamatan = dataKecamatan.map((item) => ({
    id: item.kecamatanId,
    nama: item.nama,
  }));

  const formattedDesa = dataDesa.map((item) => ({
    id: item.desaId,
    nama: item.nama,
  }));

  return (
    <>
      {isSearchDropdownOpen && (
        <div
          ref={wrapperRef}
          className={`flex justify-around items-center transform transition duration-300 ${
            isSearchDropdownOpen ? "opacity-100" : "opacity-0"
          } gap-4`}
        >
          <Dropdown
            items={formattedProvinsi}
            title={namaProvinsi}
            label="Provinsi"
            open={titleDropdownOpen === "provinsi"}
            value={provinsiId}
            setValue={setProvinsiId}
            onClick={() =>
              setTitleDropdownOpen((prev) =>
                prev === "provinsi" ? "" : "provinsi"
              )
            }
          />
          <Dropdown
            items={formattedKota}
            title={namaKota}
            label="Kota/Kabupaten"
            open={titleDropdownOpen === "kota"}
            value={kotaId}
            setValue={setKotaId}
            onClick={() =>
              setTitleDropdownOpen((prev) => (prev === "kota" ? "" : "kota"))
            }
          />
          <Dropdown
            items={formattedKecamatan}
            title={namaKecamatan}
            label="Kecamatan"
            open={titleDropdownOpen === "kecamatan"}
            value={kecamatanId}
            setValue={setKecamatanId}
            onClick={() =>
              setTitleDropdownOpen((prev) =>
                prev === "kecamatan" ? "" : "kecamatan"
              )
            }
          />
          <Dropdown
            items={formattedDesa}
            title={namaDesa}
            label="Desa"
            open={titleDropdownOpen === "desa"}
            value={desaId}
            setValue={setDesaId}
            onClick={() =>
              setTitleDropdownOpen((prev) => (prev === "desa" ? "" : "desa"))
            }
          />
        </div>
      )}
    </>
  );
};

export default SearchDropdown;

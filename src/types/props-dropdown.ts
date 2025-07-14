export interface PropsDropdown {
   title: string;
   label: string;
   items: { nama: string; kode: string }[];
   value: string;
   setValue: (id: string) => void;
   open: boolean;
   onClick: () => void;
}

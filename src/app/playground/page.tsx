import { getPreviewCuaca } from "@/utils/getPreviewCuaca";

export default async function page() {
   const res = await getPreviewCuaca("1", "9");
   console.log(res);
   return <div>halo</div>;
}

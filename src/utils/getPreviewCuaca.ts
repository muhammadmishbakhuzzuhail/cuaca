import { getBaseUrl } from "@/lib/getBaseUrl";
import { Page } from "@/types/page";
import { PreviewCuaca } from "@/types/preview-cuaca";
import { ServerResponse } from "@/types/server-response";
import axios from "axios";

export const getPreviewCuaca = async (
  page: string,
  limit: string
): Promise<ServerResponse<PreviewCuaca[]> & Partial<Page>> => {
  try {
    const BASE = getBaseUrl();
    const res = await axios.get<ServerResponse<PreviewCuaca[]> & Page>(
      `${BASE}/api/cuaca/desa`,
      {
        params: {
          page,
          limit,
        },
        timeout: 10000,
        timeoutErrorMessage: "Server sedang sibuk",
      }
    );

    return res.data;
  } catch (error) {
    if (axios.isAxiosError<ServerResponse & Page>(error)) {
      const serverError = error.response?.data;

      if (serverError) {
        const { code, success, message, errors, page } = serverError;
        return {
          code,
          success,
          message,
          errors,
          page,
        };
      }
    }

    return {
      code: 500,
      success: false,
      message: "Terjadi kesalahan yang tidak diketahui.",
    };
  }
};

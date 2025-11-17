"use client";

import { getPreviewCuaca } from "@/utils/getPreviewCuaca";
import { useQuery } from "@tanstack/react-query";
import * as React from "react";
import { PreviewCuaca } from "@/types/preview-cuaca";
import PreviewCardCuaca from "./preview-card-cuaca";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useRouter, useSearchParams } from "next/navigation";
import LoadingPreviewCardCuaca from "./loading-preview-card-cuaca";

const GridCardPreview = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const LIMIT = 9;
  const page = parseInt(searchParams.get("page") || "1", 10);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["preview-cuaca", page],
    queryFn: () => getPreviewCuaca(page.toString(), LIMIT.toString()),
  });

  const totalPage = data?.page?.totalPages as number;

  const setPage = (newPage: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", newPage.toString());
    params.set("limit", LIMIT.toString());
    router.push(`?${params.toString()}`);
  };

  const handlePrevious = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const handleNext = () => {
    if (page < totalPage) {
      setPage(page + 1);
    }
  };

  return (
    <>
      <div className="grid grid-cols-3 grid-rows-3 gap-4">
        {data?.data?.map((item: PreviewCuaca) => {
          return (
            <PreviewCardCuaca {...item} key={item.desaId} />
            // <div key={1000 + item.desaId}>p</div>
          );
        })}
        {isLoading &&
          Array.from({ length: 9 }, (_, id) => (
            <LoadingPreviewCardCuaca key={id} />
          ))}

        {isError && (
          <div className="col-span-3 row-span-3 flex items-center justify-center bg-red-50 rounded-md border border-red-200 py-96">
            <div className="text-center">
              <div className="font-poppins text-2xl text-red-500 font-bold">
                Terjadi Kesalahan
              </div>
              <p className="text-red-400">
                Gagal memuat data. Silakan coba lagi nanti.
              </p>
            </div>
          </div>
        )}
      </div>
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              href="#"
              onClick={(e) => {
                e.preventDefault();
                handlePrevious();
              }}
              className={page <= 1 ? "pointer-events-none opacity-75" : ""}
            />
          </PaginationItem>

          <PaginationItem key={1}>
            <PaginationLink
              href="#"
              isActive={page === 1}
              onClick={(e) => {
                e.preventDefault();
                setPage(1);
              }}
            >
              1
            </PaginationLink>
          </PaginationItem>

          {page < 5 && (
            <>
              {[2, 3, 4, 5].map((item) => (
                <PaginationItem key={item}>
                  <PaginationLink
                    href={"#"}
                    isActive={page === item}
                    onClick={(e) => {
                      e.preventDefault();
                      setPage(item);
                    }}
                  >
                    {item}
                  </PaginationLink>
                </PaginationItem>
              ))}
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
            </>
          )}

          {page >= 5 && page <= totalPage - 4 && (
            <>
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
              {[page - 1, page, page + 1].map((item) => (
                <PaginationItem key={item}>
                  <PaginationLink
                    href="#"
                    isActive={page === item}
                    onClick={(e) => {
                      e.preventDefault();
                      setPage(item);
                    }}
                  >
                    {item}
                  </PaginationLink>
                </PaginationItem>
              ))}
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
            </>
          )}

          {page > totalPage - 4 && (
            <>
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
              {[totalPage - 4, totalPage - 3, totalPage - 2, totalPage - 1].map(
                (item) => (
                  <PaginationItem key={item}>
                    <PaginationLink
                      href="#"
                      isActive={page === item}
                      onClick={(e) => {
                        e.preventDefault();
                        setPage(item);
                      }}
                    >
                      {item}
                    </PaginationLink>
                  </PaginationItem>
                )
              )}
            </>
          )}

          <PaginationItem key={totalPage}>
            <PaginationLink
              href="#"
              isActive={page === totalPage}
              onClick={(e) => {
                e.preventDefault();
                setPage(totalPage);
              }}
            >
              {totalPage}
            </PaginationLink>
          </PaginationItem>

          <PaginationItem>
            <PaginationNext
              href="#"
              onClick={(e) => {
                e.preventDefault();
                handleNext();
              }}
              className={
                page >= totalPage ? "pointer-events-none opacity-50" : ""
              }
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </>
  );
};

export default GridCardPreview;

/// prev [1] 2 3 4 5 ... 100 next
/// prev 1 [2] 3 4 5 ... 100 next
/// prev 1 2 [3] 4 5 ... 100 next
/// prev 1 2 3 [4] 5 ... 100 next
/// prev 1 ... 4 [5] 6 ... 100 next
/// prev 1 ... 95 [96] 97 ... 100 next
/// prev 1 ... 96 [97] 98 99 100 next
/// prev 1 ... 96 97 [98] 99 100 next
/// prev 1 ... 96 97 98 [99] 100 next
/// prev 1 ... 96 97 98 99 [100] next

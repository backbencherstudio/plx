'use client'

import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
} from "@/components/ui/pagination"
import PaginationLeftArrow from "@/public/commonIcons/PaginationLeftArrow";
import PaginationRightArrow from "@/public/commonIcons/PaginationRightArrow";

interface TransportPaginationProps {
    currentPage: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
    onPageChange: (page: number) => void;
    show?: boolean;
}

export default function TransportPagination({
    currentPage,
    totalPages,
    hasNextPage,
    hasPrevPage,
    onPageChange,
    show = true
}: TransportPaginationProps) {

    const handlePrevious = () => {
        if (hasPrevPage) {
            onPageChange(currentPage - 1);
        }
    };

    const handleNext = () => {
        if (hasNextPage) {
            onPageChange(currentPage + 1);
        }
    };

    const handlePageClick = (page: number) => {
        onPageChange(page);
    };

    // Generate visible page numbers
    const getPageNumbers = () => {
        const pages: number[] = [];
        const maxVisiblePages = 3;

        if (totalPages <= maxVisiblePages) {
            for (let i = 1; i <= totalPages; i++) pages.push(i);
        } else {
            let startPage = Math.max(1, currentPage - 1);
            let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

            if (endPage - startPage + 1 < maxVisiblePages) startPage = endPage - maxVisiblePages + 1;

            for (let i = startPage; i <= endPage; i++) pages.push(i);
        }

        return pages;
    };

    return (
        <div className="flex flex-col-reverse sm:flex-row justify-between py-3 text-[#5D5D5D] text-sm leading-[21px] rounded-b-lg select-none">
            <div className="select-none">
                <Pagination>
                    <PaginationContent>

                        {/* Previous Button */}
                        <PaginationItem className="mr-5">
                            <div
                                onClick={handlePrevious}
                                className={`w-full h-[35px] flex items-center p-2.5 cursor-pointer rounded-md border border-[#F1F2F4] ${!hasPrevPage ? 'opacity-50 cursor-not-allowed' : ''}`}
                            >
                                <PaginationLeftArrow />
                            </div>
                        </PaginationItem>

                        {/* Page Numbers */}
                        {getPageNumbers().map((page) => (
                            <PaginationItem key={page}>
                                <PaginationLink
                                    href="#"
                                    isActive={page === currentPage}
                                    className={`${page === currentPage ? 'bg-[#F8F8F8]' : 'bg-transparent'} text-graytext border-0`}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        handlePageClick(page);
                                    }}
                                >
                                    {page}
                                </PaginationLink>
                            </PaginationItem>
                        ))}

                        {/* Ellipsis for long pages */}
                        {totalPages > 5 && currentPage < totalPages - 1 && (
                            <PaginationItem>
                                <PaginationEllipsis />
                            </PaginationItem>
                        )}

                        {/* Last Page */}
                        {totalPages > 3 && currentPage < totalPages - 1 && (
                            <PaginationLink
                                href="#"
                                isActive={totalPages === currentPage}
                                onClick={(e) => {
                                    e.preventDefault();
                                    handlePageClick(totalPages);
                                }}
                            >
                                {totalPages}
                            </PaginationLink>
                        )}

                        {/* Next Button */}
                        <PaginationItem className="ml-5">
                            <div
                                onClick={handleNext}
                                className={`w-full h-[35px] flex items-center p-2.5 cursor-pointer rounded-md border border-[#F1F2F4] ${!hasNextPage ? 'opacity-50 cursor-not-allowed' : ''}`}
                            >
                                <PaginationRightArrow />
                            </div>
                        </PaginationItem>

                    </PaginationContent>
                </Pagination>
            </div>
        </div>
    );
}

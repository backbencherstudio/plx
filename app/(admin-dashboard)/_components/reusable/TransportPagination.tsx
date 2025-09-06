 'use client'

import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"
import PaginationLeftArrow from "@/public/commonIcons/PaginationLeftArrow";
 
import PaginationRightArrow from "@/public/commonIcons/PaginationRightArrow";

interface ProductRequestPaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
    show?:boolean;
}




export default function TransportPagination ({
    currentPage,
    totalPages,
    onPageChange,
    show=true
}: ProductRequestPaginationProps) {
    const handlePrevious = () => {
        if (currentPage > 1) {
            onPageChange(currentPage - 1);
        }
    };

    const handleNext = () => {
        if (currentPage < totalPages) {
            onPageChange(currentPage + 1);
        }
    };

    const handlePageClick = (page: number) => {
        onPageChange(page);
    };

    // Generate page numbers to display
    const getPageNumbers = () => {
        const pages = [];
        const maxVisiblePages = 3;

        if (totalPages <= maxVisiblePages) {
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i);
            }
        } else {
            let startPage = Math.max(1, currentPage - 2);
            let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

            if (endPage - startPage + 1 < maxVisiblePages) {
                startPage = endPage - maxVisiblePages + 1;
            }

            for (let i = startPage; i <= endPage; i++) {
                pages.push(i);
            }
        }

        return pages;
    };

    return (
        <div className="flex flex-col-reverse sm:flex-row justify-between  py-3 text-[#5D5D5D] text-sm leading-[21px] rounded-b-lg select-none ">
            {/* {show && <div className="leading-[21px] text-base items-center hidden sm:flex">
                Showing {currentPage} of {totalPages}
            </div>} */}
            <div className="select-none">
                <Pagination>
                    <PaginationContent  >
                        <PaginationItem className=" mr-5">
                            <div
                                onClick={(e) => {
                                    e.preventDefault();
                                    handlePrevious();
                                }}
                                className="w-full h-[35px]   flex items-center p-2.5 cursor-pointer rounded-md border border-[#F1F2F4]  "
                            >
                               <PaginationLeftArrow/>
                            </div>
                        </PaginationItem>

 

                        {getPageNumbers().map((page) => (
                            <PaginationItem key={page}>
                                <PaginationLink
                                    href="#"
                                    isActive={page === currentPage}
                                    className={`${page===currentPage? ' bg-[#F8F8F8]' :'bg-transparent  '} text-graytext border-0`}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        handlePageClick(page);
                                    }}

                                >
                                    {page}
                                </PaginationLink>
                            </PaginationItem>
                        ))}

                        {totalPages > 5 && currentPage < totalPages - 2 && (
                            <PaginationItem>
                                <PaginationEllipsis />
                            </PaginationItem>
                        )}

                        {
                            currentPage < totalPages - 2 && (
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
                            )
                        }
  

                        <PaginationItem className=" ml-5">
                            <div
                                onClick={(e) => {
                                    e.preventDefault();
                                    handleNext();
                                }}
                                className="w-full h-[35px]  flex items-center p-2.5 cursor-pointer rounded-md border border-[#F1F2F4] "
                            >
                                <PaginationRightArrow/>
                            </div>
                        </PaginationItem>
                    </PaginationContent>
                </Pagination>
            </div>
        </div>
    );
};
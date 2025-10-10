"use client"
import React from 'react'
import { useState, useEffect } from 'react'
import { Stack } from '@mui/material'
import ProductBox from '@/Components/ProductBox/ProductBox'
import Pagination from "@mui/material/Pagination";
import { useRouter, useSearchParams } from 'next/navigation';
import PaginationItem from "@mui/material/PaginationItem";
import { ArrowBack, ArrowForward } from "@mui/icons-material";

export default function SearchSection() {

    const router = useRouter();
    const searchParams = useSearchParams();

    const [page, setPage] = useState(Number(searchParams.get("page")) || 1);
    const [totalPages, setTotalPages] = useState(1);

    // فرضی: محصولات نمونه
    const allProducts = Array.from({ length: 20 }, (_, i) => ({
        id: i + 1,
        name: `محصول ${i + 1}`,
    }));

    const productsPerPage = 4;

    useEffect(() => {
        setPage(Number(searchParams.get("page")) || 1);
    }, [searchParams]);

    useEffect(() => {
        // تعداد صفحات را حساب کن
        setTotalPages(Math.ceil(allProducts.length / productsPerPage));
    }, [allProducts]);

    const handleChange = (event, value) => {
        router.push(`?page=${value}`);
    };

    // محصولات مربوط به همان صفحه
    const startIndex = (page - 1) * productsPerPage;
    const visibleProducts = allProducts.slice(startIndex, startIndex + productsPerPage);


    return (
        <>
            <Stack spacing={4} key={page} className='mt-5'>
                <div className='mt-4 flex lg:flex-row sm:flex-col justify-between items-center gap-3'>
                    {visibleProducts.map((p) => (
                        <ProductBox key={p.id} title={p.name} />
                    ))}
                </div>
                <Pagination
                    className='mt-5 flex justify-center'
                    count={totalPages}
                    page={page}
                    onChange={handleChange}
                    color="error"
                    renderItem={(item) => (
                        <PaginationItem
                            slots={{
                                previous: ArrowForward,
                                next: ArrowBack,
                            }}
                            {...item}
                        />
                    )}
                />
            </Stack>
        </>
    )
}

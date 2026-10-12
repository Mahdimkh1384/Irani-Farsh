"use client"
import React from 'react'
import { useState, useEffect } from 'react'
import { Stack } from '@mui/material'
import ProductBox from '@/Components/ProductBox/ProductBox'
import Pagination from "@mui/material/Pagination";
import { useRouter, useSearchParams, useParams } from 'next/navigation';
import PaginationItem from "@mui/material/PaginationItem";
import { ArrowBack, ArrowForward } from "@mui/icons-material";
import Image from 'next/image'
import Link from 'next/link'
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

export default function SearchSection() {

    const router = useRouter();
    const searchParams = useSearchParams();
    const params = useParams()
    const slug = decodeURIComponent(params.slug);

    const [page, setPage] = useState(Number(searchParams.get("page")) || 1);
    const [totalPages, setTotalPages] = useState(1);
    const [searchedProduct, setSearchedProduct] = useState([])
    const [loading, setLoading] = useState(true)
    const [productsPerPage, setProductsPerPage] = useState(8);
    const [isMobile, setIsMobile] = useState(false);


    useEffect(() => {
        const getSearchedProducts = async () => {
            setLoading(true);
            try {
                const res = await fetch(`https://api-iranifarsh.gawyhub.online/products/search/${slug}`)
                const data = await res.json()

                setSearchedProduct(data.data) || []
            } catch (err) {
                console.error(err)
            } finally {
                setLoading(false)
            }
        }

        getSearchedProducts()
    }, [slug])

    // تعیین حالت موبایل یا دسکتاپ
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 640) {
                setIsMobile(true)
                setProductsPerPage(6) // موبایل
            } else {
                setIsMobile(false)
                setProductsPerPage(8) // دسکتاپ
            }
        };
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    useEffect(() => {
        setPage(Number(searchParams.get("page")) || 1);
    }, [searchParams]);

    useEffect(() => {
        // تعداد صفحات را حساب کن
        setTotalPages(Math.ceil(searchedProduct.length / productsPerPage));
    }, [searchedProduct]);

    const handleChange = (event, value) => {
        router.push(`?page=${value}`);
    };

    // محصولات مربوط به همان صفحه
    const startIndex = (page - 1) * productsPerPage;
    const visibleProducts = searchedProduct.slice(startIndex, startIndex + productsPerPage);


    return (
        <>
            {loading ? (
                // 🔹 حالت لودر (Skeleton)
                <div className="flex gap-6 lg:flex-row sm:flex-col justify-between items-center overflow-x-auto mt-5">
                    {Array.from({ length: 4 }).map((_, i) => (
                        <div key={i} className='flex flex-col justify-center gap-y-6 w-[287.5px] h-[493px] p-4 rounded-[12px] border border-neutral-300 flex-shrink-0'>
                            <Skeleton height={261} width={255} borderRadius={12} />
                            <Skeleton count={2} height={20} />
                            <Skeleton height={40} width={255} />
                        </div>
                    ))}
                </div>
            ) : searchedProduct.length ? (
                // 🔹 حالت نمایش محصولات
                <Stack spacing={4} key={page} className='mt-5'>
                    <div
                        className={`mt-4 gap-3 ${isMobile ? 'flex flex-col items-center' : 'grid sm:grid-cols-3 lg:grid-cols-4'
                            }`}
                    >
                        {visibleProducts.map(product => (
                            <ProductBox key={product.id} {...product} />
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
            ) : (
                // 🔹 حالت "محصولی یافت نشد"
                <div className='flex flex-col justify-center items-center lg:mt-0 sm:mt-15'>
                    <Image width={450} height={300} src="/images/search-not-found.jpg" alt='no search result' />
                    <h1 className='text-4xl'>هیچ محصولی یافت نشد !</h1>
                    <Link href="/" className='btn h-[40px] px-2.5 mt-7'>بازگشت به صفحه اصلی</Link>
                </div>
            )}
        </>
    )
}

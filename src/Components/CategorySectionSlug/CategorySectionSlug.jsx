"use client"
import { useParams, useSearchParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";
import { ArrowBack, ArrowForward } from "@mui/icons-material";
import ProductBox from '@/Components/ProductBox/ProductBox'
import { Stack } from '@mui/material'
import Link from 'next/link'
import Image from 'next/image'
import ProductSort from '@/Components/ProductSort/ProductSort'


export default function CategorySectionSlug() {
    const params = useParams()
    const searchParams = useSearchParams();
    const [mainCategory, setMainCategory] = useState([])
    const [mainProducts, setMainProducts] = useState([])
    const [sortedProducts, setSortedProducts] = useState([])

    const [page, setPage] = useState(Number(searchParams.get("page")) || 1);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(true)
    const [productsPerPage, setProductsPerPage] = useState(8);
    const [isMobile, setIsMobile] = useState(false);

    const getCategories = async () => {
        const res = await fetch("https://backend.sajlab.ir/api/categories")
        const data = await res.json()

        const filteredCategory = data.data.filter(category => {
            return category.slug.includes(params.slug)
        })

        setMainCategory(filteredCategory)
    }

    const getProducts = async () => {
        setLoading(true);
        try {
            const res = await fetch(`https://backend.sajlab.ir/api/categories/${params.slug}`)
            const data = await res.json()
            setMainProducts(data.data.products)
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        getCategories()
        getProducts()
    }, [])

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
        setTotalPages(Math.ceil(mainProducts.length / productsPerPage));
    }, [mainProducts]);

    const handleChange = (event, value) => {
        router.push(`?page=${value}`);
    };

    // محصولات مربوط به همان صفحه
    const startIndex = (page - 1) * productsPerPage;
    const productsToRender = sortedProducts.length ? sortedProducts : mainProducts;
    const visibleProducts = productsToRender.slice(startIndex, startIndex + productsPerPage);

    // set sort
    const setProductSort = (value) => {
        if (value === "expensive") {
            const sorted = [...mainProducts].sort((a, b) => Number(b.price) - Number(a.price))
            setSortedProducts(sorted)
        } else if (value === "cheap") {
            const sorted = [...mainProducts].sort((a, b) => Number(a.price) - Number(b.price))
            setSortedProducts(sorted)
        } else if (value === "new") {
            const sorted = [...mainProducts].sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
            setSortedProducts(sorted);
        } else {
            const sorted = [...mainProducts].sort((a, b) => new Date(a.created_at) - new Date(b.created_at));
            setSortedProducts(sorted);
        }
    }

    return (
        <>
            <div className='lg:px-[108px] sm:px-3 mt-7 flex justify-center items-center'>
                <h1 className='text-2xl text-primary border-b border-neutral-500 p-2.5'>{mainCategory.length ? mainCategory[0].title : <Skeleton width="200px" />}</h1>
            </div>

            {/* ============================= sort products ================================= */}
            {!!mainProducts.length && <ProductSort productSort={setProductSort} />}

            <div className='lg:px-[108px] sm:px-3 mt-5'>
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
                ) : mainProducts.length ? (
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
            </div>
        </>
    )
}

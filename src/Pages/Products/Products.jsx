import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import useAxiosBase from '../../CustomHooks/useAxiosBase';
import ProductCard from './ProductCard';

const Products = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const axiosBase = useAxiosBase();

    const { data, isLoading, isError } = useQuery({
        queryKey: ['products', currentPage],
        queryFn: async () => {
            const response = await axiosBase.get(`/products?page=${currentPage}&limit=15`);
            return response.data;
        }
    });

    const handlePrevious = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleNext = () => {
        if (data && currentPage < data.pagination.totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    if (isLoading) {
        return <p>Loading...</p>;
    }

    if (isError) {
        return <p>Error loading products.</p>;
    }

    return (
        <div>
            <div className="grid grid-cols-3 gap-6 mx-6 my-10">
                {data.products.map((product) => (
                    <ProductCard product={product} key={product._id} />
                ))}
            </div>

            <div className="flex flex-col items-center mx-4 my-6">
                <div className="flex justify-between items-center w-full mb-4">
                    <button
                        className="px-4 py-2 bg-gray-300 text-black rounded-lg hover:bg-gray-400"
                        onClick={handlePrevious}
                        disabled={currentPage === 1}
                    >
                        Previous
                    </button>
                    <div className="flex flex-wrap gap-2">
                        {[...Array(data.pagination.totalPages)].map((_, index) => (
                            <button
                                key={index + 1}
                                className={`px-3 py-1 rounded-lg ${currentPage === index + 1 ? 'bg-blue-500 text-white' : 'bg-gray-200 text-black hover:bg-gray-300'}`}
                                onClick={() => handlePageChange(index + 1)}
                            >
                                {index + 1}
                            </button>
                        ))}
                    </div>
                    <button
                        className="px-4 py-2 bg-gray-300 text-black rounded-lg hover:bg-gray-400"
                        onClick={handleNext}
                        disabled={currentPage === data.pagination.totalPages}
                    >
                        Next
                    </button>
                </div>


            </div>
        </div>
    );
};

export default Products;

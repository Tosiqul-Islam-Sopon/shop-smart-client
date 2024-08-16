import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import useAxiosBase from '../../CustomHooks/useAxiosBase';
import ProductCard from './ProductCard';

const Products = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedBrand, setSelectedBrand] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [priceRange, setPriceRange] = useState('');
    const [sortOption, setSortOption] = useState('');
    const axiosBase = useAxiosBase();

    const { data, isLoading, isError } = useQuery({
        queryKey: ['products', currentPage, searchQuery, selectedBrand, selectedCategory, priceRange, sortOption],
        queryFn: async () => {
            const params = new URLSearchParams({
                page: currentPage,
                limit: 15,
                // search: searchQuery,
                // brand: selectedBrand,
                // category: selectedCategory,
                // priceRange,
                // sort: sortOption
            }).toString();
            const response = await axiosBase.get(`/products?${params}`);
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

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        const searchValue = e.target.search.value;
        setSearchQuery(searchValue);
        setCurrentPage(1); 
    };

    const handleBrandChange = (e) => {
        setSelectedBrand(e.target.value);
        setCurrentPage(1); // Reset to the first page on filter
    };

    const handleCategoryChange = (e) => {
        setSelectedCategory(e.target.value);
        setCurrentPage(1); // Reset to the first page on filter
    };

    const handlePriceRangeChange = (e) => {
        setPriceRange(e.target.value);
        setCurrentPage(1); // Reset to the first page on filter
    };

    const handleSortChange = (e) => {
        setSortOption(e.target.value);
        setCurrentPage(1); // Reset to the first page on sort
    };

    if (isLoading) {
        return <p>Loading...</p>;
    }

    if (isError) {
        return <p>Error loading products.</p>;
    }

    return (
        <div>
            {/* Search Field */}
            <form onSubmit={handleSearchSubmit}>
                <div className="flex flex-col md:flex-row justify-between items-center mx-6 my-4 gap-4">
                    <div className="flex w-full">
                        <input
                            type="text"
                            placeholder="Search by product name..."
                            name="search"
                            className="flex-grow px-4 py-2 border rounded-l-lg"
                        />
                        <button
                            type="submit"
                            className="px-6 py-2 bg-blue-500 text-white rounded-r-lg hover:bg-blue-600"
                        >
                            Search
                        </button>
                    </div>
                </div>
            </form>

            {/* Filter and Sort Options */}
            <div className="flex flex-col md:flex-row justify-between items-center mx-6 my-4 gap-4">
                <select value={selectedBrand} onChange={handleBrandChange} className="px-4 py-2 border rounded-lg w-full md:w-auto">
                    <option value="">All Brands</option>
                    <option value="TechPro">TechPro</option>
                    <option value="SoundMaster">SoundMaster</option>
                    <option value="PowerGear">PowerGear</option>
                    <option value="FitTrack">FitTrack</option>
                    <option value="HomeSmart">HomeSmart</option>
                    <option value="EcoStyle">EcoStyle</option>
                    <option value="HealthCare">HealthCare</option>
                    <option value="ComfortHome">ComfortHome</option>
                    <option value="KitchEase">KitchEase</option>
                    <option value="CleanSweep">CleanSweep</option>
                    <option value="ChillZone">ChillZone</option>
                    <option value="NatureAir">NatureAir</option>
                </select>
                <select value={selectedCategory} onChange={handleCategoryChange} className="px-4 py-2 border rounded-lg w-full md:w-auto">
                    <option value="">All Categories</option>
                    <option value="Electronics">Electronics</option>
                    <option value="Wearables">Wearables</option>
                    <option value="Footwear">Footwear</option>
                    <option value="Health & Beauty">Health & Beauty</option>
                    <option value="Fitness">Fitness</option>
                    <option value="Home & Office">Home & Office</option>
                    <option value="Bags & Luggage">Bags & Luggage</option>
                    <option value="Accessories">Accessories</option>
                    <option value="Kitchen Appliances">Kitchen Appliances</option>
                    <option value="Home Appliances">Home Appliances</option>
                    <option value="Home & Living">Home & Living</option>
                    <option value="Outdoor & Garden">Outdoor & Garden</option>
                </select>
                <select value={priceRange} onChange={handlePriceRangeChange} className="px-4 py-2 border rounded-lg w-full md:w-auto">
                    <option value="">All Price Ranges</option>
                    <option value="0-50">$0 - $50</option>
                    <option value="50-100">$50 - $100</option>
                    <option value="100-200">$100 - $200</option>
                    <option value="200-500">$200 - $500</option>
                    <option value="500+">$500+</option>
                </select>
                <select value={sortOption} onChange={handleSortChange} className="px-4 py-2 border rounded-lg w-full md:w-auto">
                    <option value="">Sort By</option>
                    <option value="priceAsc">Price: Low to High</option>
                    <option value="priceDesc">Price: High to Low</option>
                    <option value="dateDesc">Date Added: Newest First</option>
                </select>
            </div>


            {/* Product Grid */}
            <div className="grid grid-cols-3 gap-6 mx-6 my-10">
                {data.products.map((product) => (
                    <ProductCard product={product} key={product._id} />
                ))}
            </div>

            {/* Pagination */}
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

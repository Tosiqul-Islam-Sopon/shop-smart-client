import PropTypes from 'prop-types';

const ProductCard = ({ product }) => {
    const { productName, productImage, description, price, category, ratings, creationDateTime, brand } = product;

    return (
        <div className="bg-white shadow-lg rounded-lg overflow-hidden hover:scale-105 transform transition duration-300 max-w-full sm:max-w-xs md:max-w-sm">
            <img 
                className="w-full h-40 sm:h-48 md:h-56 object-cover" 
                src={productImage} 
                alt={productName} 
            />
            <div className="p-4">
                <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-800">{productName}</h2>
                <p className="text-xs sm:text-sm text-gray-500 mt-1">{category}</p>
                <p className="text-xs sm:text-sm text-gray-600 mt-1 font-black">Brand: {brand}</p>
                <p className="text-sm text-gray-600 mt-2 line-clamp-2">{description}</p>
                <div className="mt-4 flex items-center justify-between">
                    <span className="text-lg sm:text-xl font-bold text-orange-500">${price.toFixed(2)}</span>
                    <div className="flex">
                        {[...Array(5)].map((_, i) => (
                            <span key={i} className={i < ratings ? "text-yellow-400" : "text-gray-300"}>
                                ★
                            </span>
                        ))}
                    </div>
                </div>
                <p className="text-xs sm:text-sm text-gray-500 mt-2">Added on: {new Date(creationDateTime).toLocaleDateString()}</p>
                <button className="mt-4 w-full bg-orange-500 text-white py-2 rounded-lg hover:bg-orange-600 transition duration-300 text-sm sm:text-base">
                    Buy Now
                </button>
            </div>
        </div>
    );
}

// PropTypes validation
ProductCard.propTypes = {
    product: PropTypes.object.isRequired,
};

export default ProductCard;

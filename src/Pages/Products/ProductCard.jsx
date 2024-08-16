import PropTypes from 'prop-types';

const ProductCard = ({ product }) => {
    const { productName, productImage, description, price, category, ratings, creationDateTime, brand } = product;

    return (
        <div className="max-w-sm bg-white shadow-lg rounded-lg overflow-hidden hover:scale-105 transform transition duration-300">
            <img className="w-full h-48 object-cover" src={productImage} alt={productName} />
            <div className="p-4">
                <h2 className="text-2xl font-semibold text-gray-800">{productName}</h2>
                <p className="text-sm text-gray-500 mt-1">{category}</p>
                <p className="text-sm text-gray-600 mt-1 font-black">Brand: {brand}</p>
                <p className="text-gray-600 mt-2">{description}</p>
                <div className="mt-4 flex items-center justify-between">
                    <span className="text-xl font-bold text-orange-500">${price.toFixed(2)}</span>
                    <div className="flex">
                        {[...Array(5)].map((_, i) => (
                            <span key={i} className={i < ratings ? "text-yellow-400" : "text-gray-300"}>
                                ★
                            </span>
                        ))}
                    </div>
                </div>
                <p className="text-sm text-gray-500 mt-2">Added on: {new Date(creationDateTime).toLocaleDateString()}</p>
                <button className="mt-4 w-full bg-orange-500 text-white py-2 rounded-lg hover:bg-orange-600 transition duration-300">
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

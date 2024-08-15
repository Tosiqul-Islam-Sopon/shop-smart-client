import { useQuery } from "@tanstack/react-query";
import useAxiosBase from "../../CustomHooks/useAxiosBase";
import ProductCard from "./ProductCard";

const Products = () => {

    const axiosBase = useAxiosBase();
    const {data: products = null, isLoading} = useQuery({
        queryKey: ['products'],
        queryFn: async () => {
            const response = await axiosBase.get('/products');
            return response.data;
        }
    })

    if (isLoading){
        return <p>Loading...</p>;
    }

    return (
        <div>
            <div className="grid grid-cols-3 gap-4 mx-4 my-10">
                {products?.map((product) => (
                    <ProductCard product={product} key={product._id}></ProductCard>
                ))}
            </div>
        </div>
    );
};

export default Products;
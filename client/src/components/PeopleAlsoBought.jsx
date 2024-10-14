import { useEffect, useState } from "react";
import axios from "../lib/axios";
import toast from "react-hot-toast";
import ProductCard from "./ProductCard";
import LoadingSpinner from "./LoadingSpinner";

const PeopleAlsoBought = () => {
  const [
    recommendations,
    setRecommendations
  ] = useState([]);
	const [
    isLoading,
    setIsLoading
  ] = useState(true);

	useEffect(() => {
		const fetchRecommendations = async () => {
			try {
				const res = await axios.get("/products/recommendations");

				setRecommendations(res.data);
			} catch (error) {
				toast.error(error.response.data.message || "An error occurred while fetching recommendations");
			} finally {
				setIsLoading(false);
			}
		};

		fetchRecommendations()
	}, []);

	if (isLoading) return <LoadingSpinner />;

	return (
		<div className="mt-8">
			<h3 className="font-semibold text-2xl text-emerald-400">
        People also bought
      </h3>
			<div className="gap-4 grid grid-cols-1 lg:grid-col-3 mt-6 sm:grid-cols-2 ">
				{
          recommendations.map((product) => (
            <ProductCard
              key={product._id}
              product={product}
            />
          ))
        }
			</div>
		</div>
	);
};

export default PeopleAlsoBought;

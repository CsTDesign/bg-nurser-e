import { useEffect } from "react";
import CategoryItem from "../components/CategoryItem";
import { useProductStore } from "../stores/useProductStore";
import FeaturedProducts from "../components/FeaturedProducts";

const categories = [
  {
    href: "/trees",
    name: "Trees",
    imageUrl: "autumn-tree-from.jpg"
  },
  {
    href: "/shrubs",
    name: "Shrubs",
    imageUrl: "woman-near-many-flowers-growing-green-twigs.jpg"
  },
  {
    href: "/perennials",
    name: "Perennials",
    imageUrl: "close-up-white-daisy-chamomile-bouquet-flowers.jpg"
  },
  {
    href: "/annuals",
    name: "Annuals & Groundcover",
    imageUrl: "ivy-near-tree-trunk.jpg"
  },
  {
    href: "/drygoods",
    name: "Dry Goods",
    imageUrl: "elevated-view-dill-grown-peat-pots-wooden-desk.jpg"
  },
  {
    href: "/decorative",
    name: "Decorative",
    imageUrl: "different-plants-cactus.jpg"
  },
  {
    href: "/irrigation",
    name: "Irrigation",
    imageUrl: "delicate-grass-with-water-drops.jpg"
  },
  {
    href: "/maintenance",
    name: "Maintenance",
    imageUrl: "man-using-shovel-dig-hole-planting-tree.jpg"
  }
];

const HomePage = () => {
  const {
    fetchFeaturedProducts,
    products,
    isLoading
  } = useProductStore();

  useEffect(() => {
    fetchFeaturedProducts();
  }, [fetchFeaturedProducts]);
  
  return (
    <div className="min-h-screen overflow-hidden relative">
      <div className="lg:px-8 max-w-7xl mx-auto px-4 py-16 relative sm:px-6 z-10">
        <h1 className="font-bold mb-4 sm:text-6xl text-5xl text-center text-emerald-400">
          Baxter Gardens Nurser-E
        </h1>
        <p className="mb-12 text-center text-xl">
          View details of our nursery stock or purchase online from our garden center
        </p>

        <div className="gap-4 grid grid-cols-1 lg:grid-cols-3 sm:grid-cols-2">
          {
            categories.map((category) => (
              <CategoryItem
                category={category}
                key={category.name}
              />
            ))
          }
        </div>

        {
          !isLoading && products.length > 0 && <FeaturedProducts featuredProducts={products} />
        }
      </div>
    </div>
  );
};

export default HomePage;

import { Link } from "react-router-dom";

const CategoryItem = ({ category }) => {
  return (
    <div className="group h-96 overflow-hidden relative rounded-lg w-full">
      <Link to={"/category" + category.href}>
        <div className="cursor-pointer h-full w-full">
          <div className="absolute bg-gradient-to-b from-transparent inset-0 opacity-90 to-gray-900 z-10">
            <img
              alt={category.name}
              className="duration-500 ease-out group-hover:scale-110 h-full object-cover transition-transform w-full"
              loading="lazy"
              src={category.imageUrl}
            />
            <div className="absolute bg-white/40 bottom-0 left-0 p-4 right-0 z-20">
              <h3 className="font-bold mb-2 text-2xl">
                {category.name}
              </h3>
              <p className="text-sm">
                Explore {category.name}
              </p>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default CategoryItem;

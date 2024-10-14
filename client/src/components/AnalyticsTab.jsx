import { motion } from "framer-motion";
import {
  useEffect,
  useState
} from "react";
import axios from "../lib/axios";
import {
  DollarSign,
  Package,
  ShoppingCart,
  Users2
} from "lucide-react";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from "recharts";

const AnalyticsTab = () => {
  const [
    analyticsData,
    setAnalyticsData
  ] = useState({
    users: 0,
    products: 0,
    totalSales: 0,
    totalRevenue: 0
  });

  const [
    isLoading,
    setIsLoading
  ] = useState(true);

  const [
    dailySalesData,
    setDailySalesData
  ] = useState([]);

  useEffect(() => {
    const fetchAnalyticsData = async () => {
      try {
        const response = await axios.get("/analytics");

        setAnalyticsData(response.data.analyticsData);
        setDailySalesData(response.data.dailySalesData);
      } catch (error) {
        console.error("Error fetching analytics data:", error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchAnalyticsData();
  }, []);

  if (isLoading) {
    return <div>Loading... Please wait</div>
  }
  
  return (
    <div className="lg:px-8 max-w-7xl mx-auto px-4 sm:px-6">
      <div className="gap-6 grid grid-cols-1 lg:grid-cols-4 mb-8 sm:grid-cols-2">
        <AnalyticsCard
          color="from-emerald-500 to-teal-100"
          icon={Package}
          title="Total Products"
          value={analyticsData.products.toLocaleString()}
        />

        <AnalyticsCard
          color="from-emerald-500 to-teal-100"
          icon={DollarSign}
          title="Total Revenue"
          value={`$${analyticsData.totalRevenue.toLocaleString()}`}
        />

        <AnalyticsCard
          color="from-emerald-500 to-cyan-100"
          icon={ShoppingCart}
          title="Total Sales"
          value={analyticsData.totalSales.toLocaleString()}
        />

        <AnalyticsCard
          color="from-emerald-500 to-lime-100"
          icon={Users2}
          title="Total Users"
          value={analyticsData.users.toLocaleString()}
        />
      </div>

      <motion.div
        animate={{
          opacity: 1,
          y: 0
        }}
        className="bg-white/60 p-6 rounded-lh shadow-lg"
        initial={{
          opacity: 0,
          y: 20
        }}
        transition={{
          delay: 0.25,
          duration: 0.5
        }}
      >
        <ResponsiveContainer
          height={400}
          width="100%"
        >
          <LineChart data={dailySalesData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="name"
              stroke="#555555"
            />
            <YAxis
              stroke="#555555"
              yAxisId="left"
            />
            <YAxis
              orientation="right"
              stroke="#555555"
              yAxisId="right"
            />
            <Tooltip />
            <Legend />
            <Line
              activeDot={{ r: 8 }}
              dataKey="revenue"
              name="Revenue"
              stroke="#3B82F6"
              type="monotone"
              yAxisId="right"
            />
            <Line
              activeDot={{ r: 8 }}
              dataKey="sales"
              name="Sales"
              stroke="#10B981"
              type="monotone"
              yAxisId="left"
            />
          </LineChart>
        </ResponsiveContainer>
      </motion.div>
    </div>
  );
};

export default AnalyticsTab;

const AnalyticsCard = ({
  title,
  value,
  icon: Icon,
  color
}) => (
  <motion.div
    animate={{
      opacity: 1,
      y: 0
    }}
    className={
      `bg-white ${color} overflow-hidden p-6 relative rounded-lg shadow-lg`
    }
    initial={{
      opacity: 0,
      y: 20
    }}
    transition={{ duration: 0.5 }}
  >
    <div className="flex items-center justify-between">
      <div className="z-10">
        <p className="font-semibold mb-1 text-emerald-400 text-sm">
          {title}
        </p>

        <h3 className="font-bold text-xl">
          {value}
        </h3>
      </div>
    </div>

    <div className="absolute bg-gradient-to-br from-emerald-600 inset-0 opacity-30 to-emerald-300" />

    <div className="absolute -bottom-4 opacity-50 -right-4 text-emerald-800">
      <Icon className="h-32 w-32" />
    </div>
  </motion.div>
);

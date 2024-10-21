import { useEffect, useMemo, useState } from "react";
import "./DatabaseTable.css";
import { useNavigate } from "react-router-dom";
import { CaretDownOutlined, CaretUpOutlined } from "@ant-design/icons";
import { Dropdown, Menu, message } from "antd";
import 'react-medium-image-zoom/dist/styles.css';
import { useLocation } from "react-router-dom";
import ItemsDetails from "./ItemsDetails";
import { useFetchLeadsQuery, useRefreshAsinMutation, useRefreshDataMutation, useCheckAsinsMutation } from "../../../redux/api/leadsApi/leadsApi";
import TopBar from "../../../components/topBar/TopBar";
import Loading from "../../../components/loading/Loading";
import Paginations from "../../../components/pagination/Paginations";
import { isLoggedIn } from "../../../services/auth.service";
import ConfirmModal from "../../../components/modal/ConfirmModal";
import LeadLoading from "../../../components/leadlist-Loading/LeadLoading";

const DatabaseTable = () => {
  const [sortingType, setSortingType] = useState('asc');
  const [columnName, setColumnName] = useState('estimated_sales_rank');
  const [limit, setLimit] = useState(4);
  const [currentPage, setCurrentPage] = useState(() => parseInt(localStorage.getItem('currentPage')) || 1);
  const [selectedAsin, setSelectedAsin] = useState(null);
  const [isPageLoading, setIsPageLoading] = useState(false);
  const [refreshedAsins, setRefreshedAsins] = useState([]); 
  const [disabledAsins, setDisabledAsins] = useState([]); 
  const [loadingAsins, setLoadingAsins] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const categoryId = query.get('category_id') || 12;
  const navigate = useNavigate()
  const { data, error, isLoading, refetch } = useFetchLeadsQuery({
    categoryId,
    columnName,
    sortingType,
    limit,
    offset: (currentPage - 1) * limit,
  });

  const [refreshData, { isLoading: isRefreshing }] = useRefreshDataMutation();
  const [refreshAsin] = useRefreshAsinMutation();
  const [checkAsins] = useCheckAsinsMutation();

  const items = [
    { key: 'amazon_fba_estimated_fees', label: 'Amazon FBA Est. fees' },
    { key: 'estimated_monthly_sales', label: 'Est. Monthly Sales' },
    { key: 'estimated_sales_rank', label: 'Est. Sales Rank' },
  ];

  const menu = (
    <Menu>
      {items.map((item) => (
        <Menu.Item
          className="hover:text-white"
          key={item.key}
          onClick={() => setColumnName(item.key)}
        >
          {item.label}
        </Menu.Item>
      ))}
    </Menu>
  );

  const handleLimitChange = (newLimit, newPage) => {
    if (isLoggedIn()) {
      setIsPageLoading(true);
      setLimit(newLimit);
      setCurrentPage(newPage);
    } else {
      setIsModalOpen(true); // Show modal if user is not logged in
    }
  };


  const handlePageChange = (page, pageSize) => {
    if (isLoggedIn()) {
      setIsPageLoading(true);
      setCurrentPage(page);
      setLimit(pageSize);
    } else {
      setIsModalOpen(true); // Show modal if user is not logged in
    }
  };

  const fetchRefreshedAsins = async () => {
    if (!data?.results?.data) return;
  
    const currentAsins = data.results.data.map(item => item.asin); 
    console.log("Current items per page:", currentAsins); 
  
    try {
      const response = await checkAsins(currentAsins);
      console.log("Check ASINs Response:", response); 
  
      if (response?.data?.data) {
        const refreshedAsins = Array.isArray(response.data.data) ? response.data.data : [];
        setRefreshedAsins(refreshedAsins);

        setDisabledAsins(currentAsins.filter(asin => refreshedAsins.includes(asin)));
  
   
        if (refreshedAsins.length === 0) {
          console.log("No items on this page have been refreshed");
        }
      } else {
    
        console.log("No data returned from checkAsins, but no error occurred.");
      }
    } catch (error) {

      if (error.response) {
        console.error("Error fetching refreshed ASINs:", error);
        message.error("Error fetching refreshed ASINs.");
      } else {
        console.log("Request completed but no ASINs were refreshed.");
      }
    }
  };
  
  
  const handleRefresh = async (asin) => {
    if (isLoggedIn()) {
      if (!asin) return;
  
      setLoadingAsins((prev) => ({ ...prev, [asin]: true })); // Set loading for the specific ASIN
      setSelectedAsin(asin);
      
      try {
        await refreshData({ asin, categoryId });
        const refreshAsinResponse = await refreshAsin(asin);
    
        if (refreshAsinResponse?.data?.status_code === 201) {
          message.success(refreshAsinResponse?.data?.message || "Product refreshed successfully");
          const refreshedAsinsFromLocalStorage = Array.isArray(JSON.parse(localStorage.getItem('refreshedAsins'))) 
  ? JSON.parse(localStorage.getItem('refreshedAsins')) 
  : [];

          const updatedRefreshedAsins = [...refreshedAsinsFromLocalStorage, asin];
          localStorage.setItem('refreshedAsins', JSON.stringify(updatedRefreshedAsins));
          setRefreshedAsins(updatedRefreshedAsins);

        } else if (refreshAsinResponse?.data?.status_code === 200) {
          message.warning(refreshAsinResponse?.data?.message || "Product can only be refreshed once per day");
          const refreshedAsinsFromLocalStorage = Array.isArray(JSON.parse(localStorage.getItem('refreshedAsins'))) 
  ? JSON.parse(localStorage.getItem('refreshedAsins')) 
  : [];

        const updatedRefreshedAsins = [...refreshedAsinsFromLocalStorage, asin];
        localStorage.setItem('refreshedAsins', JSON.stringify(updatedRefreshedAsins));
        setRefreshedAsins(updatedRefreshedAsins);

        } else {
          message.error(`Unexpected error refreshing ASIN ${asin}: ${refreshAsinResponse?.data?.message || 'No additional information available.'}`);
        }
      } catch (error) {
        console.error("Failed to refresh ASIN:", error);
        message.error(`Failed to refresh ASIN ${asin}.`);
      } finally {
        setLoadingAsins((prev) => ({ ...prev, [asin]: false })); 
      }
    } else {
      setIsModalOpen(true); 
    }
    
  };
  const handleModalConfirm = () => {
    setIsModalOpen(false);
    navigate("/login"); 
   
  };

  const handleModalCancel = () => {
    setIsModalOpen(false);
  };
  

  useEffect(() => {
    localStorage.setItem('currentPage', currentPage);
    refetch().finally(() => setIsPageLoading(false));
  }, [currentPage, limit, columnName, sortingType, refetch]);

  useEffect(() => {
    if (data?.results?.data) {
      fetchRefreshedAsins();
    }
    const refreshedAsinsFromLocalStorage = Array.isArray(JSON.parse(localStorage.getItem('refreshedAsins'))) 
    ? JSON.parse(localStorage.getItem('refreshedAsins')) 
    : [];
  setRefreshedAsins(refreshedAsinsFromLocalStorage);
  }, [data]);

  return (
    <div>
      <TopBar />
      <div className="px-6 mt-[80px]">
        <div className="flex items-center justify-end mb-5 gap-2 pr-5 mt-32 lg:mt-0">
          <Dropdown overlay={menu} placement="bottomLeft">
            <button className="flex items-center cursor-pointer bg-white hover:bg-slate-100 shadow-lg text-black text-[16px] rounded-lg border-none font-sans p-2">
              <span className="px-2">Sort by</span>
              <CaretDownOutlined style={{ fontSize: "25px", paddingTop: "3px" }} />
            </button>
          </Dropdown>

          <button
            className={`bg-white shadow-lg text-black p-2 rounded-lg border-none cursor-pointer ${sortingType === "asc" ? "bg-gray-300 text-gray-500 cursor-not-allowed" : "hover:bg-slate-200"}`}
            onClick={() => setSortingType("asc")}
            disabled={sortingType === "asc"}
          >
            <CaretUpOutlined style={{ fontSize: "25px" }} />
          </button>

          <button
            className={`bg-white shadow-lg text-black p-2 rounded-lg border-none cursor-pointer ${sortingType === "desc" ? "bg-gray-300 text-gray-500 cursor-not-allowed" : "hover:bg-slate-200"}`}
            onClick={() => setSortingType("desc")}
            disabled={sortingType === "desc"}
          >
            <CaretDownOutlined style={{ fontSize: "25px" }} />
          </button>

          <div>
            <button className="bg-white shadow-lg text-black p-2 text-lg rounded-lg hover:bg-slate-200 border-none cursor-pointer">
              {data?.count} items
            </button>
          </div>
        </div>

        {isLoading || isPageLoading  ? (
          <div className="flex justify-center items-center h-64">
            <Loading size="large" />
          </div>
        ) : (
          <>
            <div className="grid gap-8">
            {data?.results?.data?.map((item) => (
  <div key={item.asin} className="relative">
    {loadingAsins[item.asin] && (
      <div className="absolute inset-0 flex justify-center items-center bg-transparent">
        <LeadLoading size="small" />
      </div>
    )}
    <div
      className={`transition-opacity duration-300 ${loadingAsins[item.asin] ? 'opacity-10' : 'opacity-100'}`}
    >
      <ItemsDetails
        item={item}
        onClick={() => handleRefresh(item.asin)}
        refreshedAsins={refreshedAsins}
        isLoading={loadingAsins[item.asin]}
        isDisabled={disabledAsins.includes(item.asin)}
      />
    </div>
  </div>
))}

            </div>
            <div className="flex justify-center mt-4">
              <Paginations
                currentPage={currentPage}
                limit={limit}
                totalItems={data?.count || 0}
                handlePageChange={handlePageChange}
                handleLimitChange={handleLimitChange}
              />
            </div>
          </>
        )}
          <ConfirmModal
          isOpen={isModalOpen}
          onConfirm={handleModalConfirm}
          onCancel={handleModalCancel}
          msg="You need to log in to continue."
          btnMsg="Go to Login"
        />
      </div>
    </div>
  );
};

export default DatabaseTable;

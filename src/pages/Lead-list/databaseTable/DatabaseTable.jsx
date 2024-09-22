import { useEffect, useState } from "react";

import "./DatabaseTable.css";
import { useNavigate } from "react-router-dom";

import { CaretDownOutlined, CaretUpOutlined } from "@ant-design/icons";
import { Dropdown, Menu } from "antd";

import 'react-medium-image-zoom/dist/styles.css';
import { useLocation } from "react-router-dom";
import ItemsDetails from "./ItemsDetails";
import { useFetchLeadsQuery, useRefreshDataMutation,useRefreshAsinQuery, useCheckAsinsMutation  } from "../../../redux/api/leadsApi/leadsApi";
import TopBar from "../../../components/topBar/TopBar";
import Loading from "../../../components/loading/Loading";
import Paginations from "../../../components/pagination/Paginations";




const DatabaseTable = () => {
  const [sortingType, setSortingType] = useState('asc');
  const [columnName, setColumnName] = useState('estimated_sales_rank');
  const [limit, setLimit] = useState(4);
  const [currentPage, setCurrentPage] = useState(() => {
    return parseInt(localStorage.getItem('currentPage')) || 1;
  });
  const [selectedAsin, setSelectedAsin] = useState(null);
  const [isPageLoading, setIsPageLoading] = useState(false);

  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const categoryId = query.get('category_id') || 12;
  const navigate = useNavigate();

  const offset = (currentPage - 1) * limit;

  const { data, error, isLoading, refetch } = useFetchLeadsQuery({
    categoryId,
    columnName,
    sortingType,
    limit,
    offset,
  });

  const [refreshData, { isLoading: isRefreshing }] = useRefreshDataMutation();

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
    setIsPageLoading(true);
    setLimit(newLimit);
    setCurrentPage(newPage);
  };

  const handlePageChange = (page, pageSize) => {
    setIsPageLoading(true);
    setCurrentPage(page);
    setLimit(pageSize);
  };

  const handleRefresh = async () => {
    if (!selectedAsin) return;
    setIsPageLoading(true);
    await refreshData({ asin: selectedAsin, categoryId });
    await refetch(); 
    setIsPageLoading(false);
  };
  

  // useEffect(() => {
  //   localStorage.setItem('currentPage', currentPage);
  // }, [currentPage]);

  useEffect(() => {
    localStorage.setItem('currentPage', currentPage);
    refetch().finally(() => setIsPageLoading(false));
  }, [currentPage, limit, columnName, sortingType]);



  return (
    <div className="">
      <div>
        <TopBar />
      </div>

      <div className="px-6 mt-[80px]">
        <div className="flex items-center justify-end mb-5 gap-2 pr-5 mt-32 lg:mt-0">
          <Dropdown overlay={menu} placement="bottomLeft">
            <button className="flex items-center cursor-pointer bg-white hover:bg-slate-100 shadow-lg text-black text-[16px] rounded-lg border-none font-sans p-2">
              <span className="px-2">Sort by</span>
              <CaretDownOutlined style={{ fontSize: "25px", paddingTop: "3px" }} />
            </button>
          </Dropdown>

          <button
            className={`bg-white shadow-lg text-black p-2 rounded-lg border-none cursor-pointer ${
              sortingType === "asc" ? "bg-gray-300 text-gray-500 cursor-not-allowed" : "hover:bg-slate-200"
            }`}
            onClick={() => {
              setSortingType("asc");
            }}
            disabled={sortingType === "asc"}
          >
            <CaretUpOutlined style={{ fontSize: "25px" }} />
          </button>

          <button
            className={`bg-white shadow-lg text-black p-2 rounded-lg border-none cursor-pointer ${
              sortingType === "desc" ? "bg-gray-300 text-gray-500 cursor-not-allowed" : "hover:bg-slate-200"
            }`}
            onClick={() => {
              setSortingType("desc");
            }}
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

        {isLoading || isPageLoading || isRefreshing ? (
          <div className="flex justify-center items-center h-64">
            <Loading size="large" />
          </div>
        ) : (
          <>
          <div className="grid gap-8">
            {data?.results?.data?.map((item) => (
              <ItemsDetails key={item.asin} item={item} onClick={() => handleRefresh()} setSelectedAsin={setSelectedAsin} />
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

       
      </div>
    </div>
  );
};

export default DatabaseTable;

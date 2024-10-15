import { Link } from "react-router-dom";
import Zoom from 'react-medium-image-zoom'
import { IoMdRefreshCircle } from "react-icons/io";
import { LinkOutlined} from "@ant-design/icons";
import { useState } from "react";


const ItemsDetails = ({item, onClick,refreshedAsins , isDisabled }) => {

  const [showWarning, setShowWarning] = useState(false);

  const handleClick = () => {
    if (!isDisabled) {
      onClick(item.asin); // Call onClick only if not refreshed
    } else {
      setShowWarning(true); // Show the warning if refreshed
      setTimeout(() => setShowWarning(false), 5000); // Hide message after 5 seconds
    }
  };

  const textStyle = (value) => {
    if (value === 0) {
      return "text-black";
    } else if (value < 0) {
      return "text-red-500";
    } else {
      return "text-green-600";
    }
  };

  return (
    <>
           <div
              style={{
                borderRadius: "2.5rem",
                boxShadow: " 2px 2px 2px 1.47px rgba(89, 89, 89, 0.33)",
              }}
            //   key={i}
              className="flex xl:flex-row flex-col items-center bg-white font-sans 
              w-[100%]
              xl:h-[140px] hover:bg-[#F9F9F9] gap-8 xl:gap-0 py-4 xl:py-0"
            >
              {/*circle, product and ASIN */}
              <div className="flex lg:flex-row flex-col items-center">
                {/* circle */}
                <div className="circle flex items-center justify-center">
                {/* <SideBySideMagnifier
    className="w-20 custom-magnifier"
    imageSrc={item.product_image_url}
    imageAlt={item.product_name}
    largeImageSrc={item.product_image_url}
    fillGapLeft={10} // Adjust as needed
    fillGapTop={10} // Adjust as needed
    // switchSides
  /> */}
  <Zoom className='w-20'>
    <img
      alt="That Wanaka Tree, New Zealand by Laura Smetsers"
      src={item.product_image_url}
      width="80"
    />
  </Zoom>

                </div>
                {/* product and ASIN */}
                <div className="lg:ml-4 lg:w-52 px-8 lg:px-0">
                  <div className="text-sm font-bold mb-2 my-6 lg:my-0 text-center lg:text-left">
                  {item.product_name}
                  </div>
                  <div className="text-sm text-center lg:text-left">
                  {item.asin}
                  </div>
                </div>
              </div>

              {/* middle items */}
              <div className="flex lg:flex-row md:flex-row flex-col lg:items-center lg:justify-center text-[13px]  lg:gap-10 gap-5  mx-auto px-8">
                {/* 1st col */}
                <div className="flex flex-col gap-1">
                  <div className="flex justify-between">
                    <div className="font-medium">Amazon FBA Est. fees:</div>
                    <div className="ml-2 text-red-500">
                    ${item.amazon_fba_estimated_fees 
    ? parseFloat(item.amazon_fba_estimated_fees).toFixed(2) 
    : 'N/A'}
                    </div>
                  </div>
                  <div className="flex justify-between">
                    <div className="font-medium"> Est. Monthly Sales:</div>
                    <div>    {item.estimated_monthly_sales}</div>
                  </div>
                  <div className="flex justify-between">
                    <div className="font-medium">Est. Sales Rank:</div>
                    <div>     {item.estimated_sales_rank}</div>
                  </div>
                  <div className="flex justify-between">
                    <div className="font-medium">Sales Rank (30 days):</div>
                    <div>  {item.sales_rank_30_days}</div>
                  </div>
                  <div className="flex justify-between">
                    <div className="font-medium">Sales Rank (90 days):</div>
                    <div>     {item.sales_rank_90_days}</div>
                  </div>
                </div>

                {/* 2nd col */}
                <div className="flex flex-col gap-1">
                  <div className="flex justify-between">
                    <div className="font-medium mr-2">Est. Gross Profit:</div>
                    <div
                      className={textStyle(Number(item.estimated_gross_profit))}

                    >
                      ${item.estimated_gross_profit 
    ? parseFloat(item.estimated_gross_profit).toFixed(2) 
    : 'N/A'}
                        
                      {/* $ {Number(item["Estimated Gross Profit $"]).toFixed(2)} */}33
                    </div>
                  </div>
                  <div className="flex justify-between">
                    <div className="font-medium mr-2">
                      Est. Gross Profit Margin:
                    </div>
                    <div
                       className={textStyle(Number(item.estimated_gross_profit_margin))}
                    >
                      {/* {(
                        Number(item["Estimated Gross Profit Margin %"]) * 100
                      ).toFixed(2)}{" "} */}
                        {item.estimated_gross_profit_margin}
                      %
                    </div>
                  </div>
                  <div className="flex justify-between">
                    <div className="font-medium mr-2">Est. Net Profit: </div>
                    <div
                    className={textStyle(Number(item.estimated_net_profit))}
                    >
                      {/* $ {Number(item["Estimated Net Profit $"]).toFixed(2)} */}
                      ${item.estimated_net_profit
    ? parseFloat(item.estimated_net_profit).toFixed(2) 
    : 'N/A'}
                
                    
                    </div>
                  </div>
                  <div className="flex justify-between">
                    <div className="font-medium mr-2">
                      Est. Net Profit Margin:
                    </div>
                    <div
                      // className={textStyle(
                      //   Number(item["Estimated Net Profit Margin %"])
                      // )}
                      className={textStyle(Number(item.estimated_net_profit_margin))}
                    >
                      {/* {(
                        Number(item["Estimated Net Profit Margin %"]) * 100
                      ).toFixed(2)}{" "} */}
                        {item.estimated_net_profit_margin}
                      %
                    </div>
                  </div>
                </div>
                {/* 3rd col */}
                <div className="flex flex-col gap-1">
                  <div className="flex justify-between">
                    <div className="font-medium mr-2">Amazon on Listing: </div>
                    <div>  {item.amazon_on_listing}</div>
                  </div>
                  <div className="flex justify-between">
                    <div className="font-medium mr-2">No. of sellers:</div>
                    <div>  {item.number_of_sellers_on_listing}</div>
                  </div>
                  <div className="flex justify-between">
                    <div className="font-medium mr-2">No. of Reviews: </div>
                    <div>  {item.number_of_reviews}</div>
                  </div>
                </div>
              </div>
              {/* links */}
              <div className="flex gap-5 lg:pr-5">
                <div className="flex flex-col  text-[14px]">
                  <div className=" hover-effect shadow-none mb-2">
                    <Link
                        to={`${item.amazon_url}`}

                      target="_blank"
                      rel="noopener noreferrer"
                      className=" no-underline text-black flex items-center"
                    >
                      <LinkOutlined
                        className="icon-img text-[15px] mr-2 font-bold"
                        rotate={155}
                      />
                      <span className="mr-1">Amazon Price: </span>
                      <span> $ {item.amazon_price}</span>
                    </Link>{" "}
                  </div>

                  <div className=" hover-effect border-none shadow-none">
                    <Link
                      className="no-underline text-black flex items-center "
                      to={`${item.sourcing_url}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <LinkOutlined
                        className="icon-img text-[15px] mr-2 font-bold"
                        rotate={155}
                      />
                      <span className="mr-1"> Sourcing Price: </span>{" "}
                      <span>$ {item.sourcing_price}</span>
                    </Link>{" "}
                  </div>
                </div>
                <div className="relative">
                <IoMdRefreshCircle
        onClick={handleClick}
        className={`w-10 h-10 text-gray-400 ${
          isDisabled
            ? "cursor-not-allowed text-gray-100"
            : "hover:animate-spin hover:text-gray-600 cursor-pointer"
        }`}
        title={isDisabled ? "Product can only be refreshed once per day" : "Refresh this ASIN"}
      />
   
      {/* Render other item details */}
    </div>
              </div>
            </div>
    </>
  )
}

export default ItemsDetails
import { Pagination } from "antd";

const Paginations = ({ currentPage, limit, totalItems, handlePageChange, handleLimitChange }) => {
  return (
    <div className="flex items-center justify-center gap-4">
      <Pagination
        current={currentPage} // Current page from state
        pageSize={limit} // Limit (page size) from state
        total={totalItems} // Total items from API response
        onChange={(page, pageSize) => handlePageChange(page, pageSize)} // Handle page change
        showLessItems
        showQuickJumper
        showSizeChanger
        pageSizeOptions={['4', '8', '12', '16']} // Options for page size
        onShowSizeChange={(current, size) => handleLimitChange(size, current)} // Handle limit change
      />
    </div>
  );
};

export default Paginations;

import { useNavigate, Outlet } from "react-router-dom";

export default function SubscriptionInformation() {
  const navigate = useNavigate();

  return (
    <div className="flex justify-center items-center h-screen gap-x-6">
      {/* Upgrade Button */}
      <button
        onClick={() => navigate('/upgrade')}
        style={{ boxShadow: "1px 4px 2px rgba(26, 25, 25, 0.25)" }}
        className="rounded-full text-gray-600 bg-white hover:bg-gray-600 hover:text-white border-none
           font-semibold text-[16px] flex items-center justify-between py-3 px-8 cursor-pointer"
      >
        <span className="px-5">Upgrade</span>
      </button>

      <button
        onClick={() => navigate('/subscription-cancel')}
        style={{ boxShadow: "1px 4px 2px rgba(26, 25, 25, 0.25)" }}
        className="rounded-full text-gray-600 bg-white hover:bg-gray-600 hover:text-white border-none
           font-semibold text-[16px] flex items-center justify-between py-3 px-8 cursor-pointer"
      >
        <span className="px-5">Cancel</span>
      </button>

    <Outlet/>
    </div>
  );
}

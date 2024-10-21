import './LeadLoading.css'; 

export default function LeadLoading() {
  return (
    <div className="flex items-center justify-center h-screen">
      {/* Loading dots */}
      <div className="loading">
        <span className="AnimatedDot"></span>
        <span className="AnimatedDot"></span>
        <span className="AnimatedDot "></span>  
    </div>
    </div>
  );
}

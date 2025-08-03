// import React from 'react';
// import { Link } from 'react-router-dom';
// import { FaArrowRight } from 'react-icons/fa';

// const UserStatCard = ({ title, value, icon, bgColor, linkText, linkUrl }) => {
//   return (
//     <div className={`rounded-xl shadow-sm overflow-hidden ${bgColor}`}>
//       <div className="p-6 text-white">
//         <div className="flex justify-between items-start">
//           <div>
//             <h3 className="text-sm font-medium text-white opacity-90">{title}</h3>
//             <p className="text-3xl font-bold mt-1">{value}</p>
//           </div>
//           <div className="bg-white bg-opacity-20 p-3 rounded-lg">
//             {icon}
//           </div>
//         </div>
        
//         {linkText && linkUrl && (
//           <Link 
//             to={linkUrl}
//             className="inline-flex items-center gap-1 mt-4 text-sm font-medium text-white hover:underline"
//           >
//             {linkText} <FaArrowRight size={12} />
//           </Link>
//         )}
//       </div>
//       <div className="h-1 bg-white bg-opacity-20"></div>
//     </div>
//   );
// };

// export default UserStatCard;
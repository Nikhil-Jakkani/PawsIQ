// import React from 'react';
// import { useNavigate } from 'react-router-dom';
// import { FaDog, FaCat, FaCalendarAlt } from 'react-icons/fa';

// // Get current and upcoming dates
// const today = new Date();
// const tomorrow = new Date(today);
// tomorrow.setDate(tomorrow.getDate() + 1);
// const dayAfter = new Date(today);
// dayAfter.setDate(dayAfter.getDate() + 2);

// const appointments = [
//   {
//     id: 1,
//     petName: 'Max',
//     petType: 'dog',
//     ownerName: 'John Smith',
//     service: 'Grooming',
//     date: today.toLocaleDateString(),
//     time: '10:00 AM',
//     status: 'confirmed',
//   },
//   {
//     id: 2,
//     petName: 'Luna',
//     petType: 'cat',
//     ownerName: 'Sarah Johnson',
//     service: 'Vaccination',
//     date: today.toLocaleDateString(),
//     time: '11:30 AM',
//     status: 'confirmed',
//   },
//   {
//     id: 3,
//     petName: 'Buddy',
//     petType: 'dog',
//     ownerName: 'Michael Brown',
//     service: 'Check-up',
//     date: tomorrow.toLocaleDateString(),
//     time: '2:00 PM',
//     status: 'pending',
//   },
//   {
//     id: 4,
//     petName: 'Whiskers',
//     petType: 'cat',
//     ownerName: 'Emily Wilson',
//     service: 'Dental Cleaning',
//     date: dayAfter.toLocaleDateString(),
//     time: '9:15 AM',
//     status: 'confirmed',
//   },
// ];

// const UpcomingAppointments = () => {
//   const navigate = useNavigate();

//   const handleAppointmentClick = (appointment) => {
//     alert(`Appointment Details:\n\nPet: ${appointment.petName} (${appointment.petType})\nOwner: ${appointment.ownerName}\nService: ${appointment.service}\nDate: ${appointment.date}\nTime: ${appointment.time}\nStatus: ${appointment.status}`);
//   };

//   return (
//     <div className="bg-white rounded-lg shadow-md p-6">
//       <div className="flex justify-between items-center mb-6">
//         <h3 className="text-lg font-semibold text-gray-800">Upcoming Appointments</h3>
//         <button 
//           className="text-indigo-600 hover:text-indigo-800 text-sm font-medium flex items-center"
//           onClick={() => {
//             // Navigate to the appointments overview page
//             navigate('/appointments/overview');
//           }}
//         >
//           <FaCalendarAlt className="mr-1" /> View Calendar
//         </button>
//       </div>
      
//       <div className="overflow-x-auto">
//         <table className="min-w-full divide-y divide-gray-200">
//           <thead>
//             <tr>
//               <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                 Pet
//               </th>
//               <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                 Owner
//               </th>
//               <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                 Service
//               </th>
//               <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                 Date & Time
//               </th>
//               <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                 Status
//               </th>
//             </tr>
//           </thead>
//           <tbody className="bg-white divide-y divide-gray-200">
//             {appointments.map((appointment) => (
//               <tr 
//                 key={appointment.id} 
//                 className="hover:bg-gray-50 cursor-pointer"
//                 onClick={() => handleAppointmentClick(appointment)}
//               >
//                 <td className="px-4 py-3 whitespace-nowrap">
//                   <div className="flex items-center">
//                     <div className="flex-shrink-0 h-8 w-8 rounded-full bg-indigo-100 flex items-center justify-center">
//                       {appointment.petType === 'dog' ? (
//                         <FaDog className="text-indigo-600" />
//                       ) : (
//                         <FaCat className="text-indigo-600" />
//                       )}
//                     </div>
//                     <div className="ml-3">
//                       <div className="text-sm font-medium text-gray-900">{appointment.petName}</div>
//                       <div className="text-xs text-gray-500 capitalize">{appointment.petType}</div>
//                     </div>
//                   </div>
//                 </td>
//                 <td className="px-4 py-3 whitespace-nowrap">
//                   <div className="text-sm text-gray-900">{appointment.ownerName}</div>
//                 </td>
//                 <td className="px-4 py-3 whitespace-nowrap">
//                   <div className="text-sm text-gray-900">{appointment.service}</div>
//                 </td>
//                 <td className="px-4 py-3 whitespace-nowrap">
//                   <div className="text-sm text-gray-900">{appointment.date}</div>
//                   <div className="text-xs text-gray-500">{appointment.time}</div>
//                 </td>
//                 <td className="px-4 py-3 whitespace-nowrap">
//                   <span
//                     className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
//                       appointment.status === 'confirmed'
//                         ? 'bg-green-100 text-green-800'
//                         : 'bg-yellow-100 text-yellow-800'
//                     }`}
//                   >
//                     {appointment.status}
//                   </span>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
      
//       <div className="mt-4 text-center">
//         <button 
//           className="text-indigo-600 hover:text-indigo-800 text-sm font-medium"
//           onClick={() => {
//             // Navigate to the appointments page
//             navigate('/appointments');
//           }}
//         >
//           View All Appointments
//         </button>
//       </div>
//     </div>
//   );
// };

// export default UpcomingAppointments;
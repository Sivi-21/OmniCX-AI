// import React from 'react';
// import { MOCK_CUSTOMERS } from '../constants';
// import { motion } from 'motion/react';
// import { 
//   Users, 
//   Search, 
//   Filter, 
//   MoreVertical, 
//   Mail, 
//   Phone, 
//   MapPin, 
//   Calendar,
//   Star,
//   ExternalLink,
//   Sparkles,
//   ArrowUpRight
// } from 'lucide-react';

// interface CustomerListProps {
//   onCreateTicket?: (customerId: string) => void;
// }

// const CustomerList: React.FC<CustomerListProps> = ({ onCreateTicket }) => {
//   return (
//     <div className="space-y-12 pb-20 transition-colors">
//       <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
//         <div>
//           <h1 className="text-4xl font-black text-slate-900 dark:text-white tracking-tighter mb-2">Customer Intelligence</h1>
//           <div className="flex items-center gap-2">
//             <Sparkles className="w-4 h-4 text-indigo-500" />
//             <p className="text-xs font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em]">Unified 360° view of your enterprise relationships</p>
//           </div>
//         </div>
//         <div className="flex items-center gap-4">
//           <div className="relative group">
//             <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-indigo-500 transition-colors" />
//             <input 
//               type="text" 
//               placeholder="Search customers..."
//               className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl py-3.5 pl-12 pr-4 text-[10px] font-black uppercase tracking-widest focus:ring-2 focus:ring-indigo-500 outline-none transition-all dark:text-slate-200 w-64 shadow-sm"
//             />
//           </div>
//           <button className="p-3.5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all shadow-sm">
//             <Filter className="w-5 h-5" />
//           </button>
//         </div>
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
//         {MOCK_CUSTOMERS.map((customer, index) => (
//           <motion.div
//             key={customer.id}
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: index * 0.1 }}
//             className="bg-white dark:bg-slate-900 rounded-[3rem] border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden group hover:border-indigo-500/30 transition-all hover:shadow-2xl hover:shadow-indigo-500/5 flex flex-col"
//           >
//             <div className="p-10 flex-1">
//               <div className="flex justify-between items-start mb-8">
//                 <div className="w-20 h-20 rounded-3xl bg-indigo-50 dark:bg-indigo-500/10 flex items-center justify-center text-indigo-600 dark:text-indigo-400 font-black text-2xl border border-indigo-100 dark:border-indigo-500/20 group-hover:scale-110 transition-transform shadow-sm">
//                   {customer.name.split(' ').map(n => n[0]).join('')}
//                 </div>
//                 <div className="flex flex-col items-end">
//                   <span className={`text-[9px] font-black px-3 py-1.5 rounded-full uppercase tracking-[0.2em] mb-3 shadow-sm ${
//                     customer.tier === 'Enterprise' ? 'bg-indigo-600 text-white' :
//                     customer.tier === 'Premium' ? 'bg-amber-500 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
//                   }`}>
//                     {customer.tier}
//                   </span>
//                   <div className="flex items-center gap-1">
//                     {[...Array(5)].map((_, i) => (
//                       <Star key={i} className={`w-3.5 h-3.5 ${i < 4 ? 'text-amber-400 fill-current' : 'text-slate-200 dark:text-slate-700'}`} />
//                     ))}
//                   </div>
//                 </div>
//               </div>

//               <div className="mb-8">
//                 <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors leading-none">{customer.name}</h3>
//                 <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">{customer.company}</p>
//               </div>

//               <div className="space-y-4 mb-10">
//                 <div className="flex items-center gap-4 text-xs font-bold text-slate-500 dark:text-slate-400 group/item cursor-pointer hover:text-indigo-500 transition-colors">
//                   <div className="w-8 h-8 rounded-xl bg-slate-50 dark:bg-slate-800 flex items-center justify-center border border-slate-100 dark:border-slate-700 group-hover/item:border-indigo-500/30">
//                     <Mail className="w-4 h-4" />
//                   </div>
//                   {customer.email}
//                 </div>
//                 <div className="flex items-center gap-4 text-xs font-bold text-slate-500 dark:text-slate-400 group/item cursor-pointer hover:text-indigo-500 transition-colors">
//                   <div className="w-8 h-8 rounded-xl bg-slate-50 dark:bg-slate-800 flex items-center justify-center border border-slate-100 dark:border-slate-700 group-hover/item:border-indigo-500/30">
//                     <Phone className="w-4 h-4" />
//                   </div>
//                   +1 (555) 000-0000
//                 </div>
//               </div>

//               <div className="grid grid-cols-2 gap-6 pt-8 border-t border-slate-100 dark:border-slate-800">
//                 <div>
//                   <p className="text-[9px] font-black text-slate-400 uppercase tracking-[0.3em] mb-2">Lifetime Value</p>
//                   <p className="text-xl font-black text-slate-900 dark:text-white">{customer.lifetimeValue}</p>
//                 </div>
//                 <div>
//                   <p className="text-[9px] font-black text-slate-400 uppercase tracking-[0.3em] mb-2">Total Tickets</p>
//                   <p className="text-xl font-black text-slate-900 dark:text-white">{customer.totalTickets}</p>
//                 </div>
//               </div>
//             </div>

//             <div className="px-10 py-6 bg-slate-50 dark:bg-slate-800/30 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between group/footer">
//               <button 
//                 onClick={() => onCreateTicket?.(customer.id)}
//                 className="text-indigo-600 dark:text-indigo-400 font-black text-[10px] uppercase tracking-[0.2em] flex items-center gap-2 hover:gap-3 transition-all"
//               >
//                 Create Ticket <Plus className="w-4 h-4" />
//               </button>
//               <button className="text-slate-400 dark:text-slate-500 font-black text-[10px] uppercase tracking-[0.2em] flex items-center gap-2 hover:text-indigo-600 transition-all">
//                 Full Profile <ArrowUpRight className="w-4 h-4" />
//               </button>
//             </div>
//           </motion.div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default CustomerList;


import React from 'react';
import { MOCK_CUSTOMERS } from '../constants';
import { motion } from 'motion/react';
import { 
  Users, 
  Search, 
  Filter, 
  MoreVertical, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar,
  Star,
  ExternalLink,
  Sparkles,
  ArrowUpRight,
  Plus
} from 'lucide-react';

interface CustomerListProps {
  onCreateTicket?: (customerId: string) => void;
}

const CustomerList: React.FC<CustomerListProps> = ({ onCreateTicket }) => {
  return (
    <div className="space-y-12 pb-20 transition-colors">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-4xl font-black text-slate-900 dark:text-white tracking-tighter mb-2">Customer Intelligence</h1>
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-indigo-500" />
            <p className="text-xs font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em]">Unified 360° view of your enterprise relationships</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-indigo-500 transition-colors" />
            <input 
              type="text" 
              placeholder="Search customers..."
              className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl py-3.5 pl-12 pr-4 text-[10px] font-black uppercase tracking-widest focus:ring-2 focus:ring-indigo-500 outline-none transition-all dark:text-slate-200 w-64 shadow-sm"
            />
          </div>
          <button className="p-3.5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all shadow-sm">
            <Filter className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {MOCK_CUSTOMERS.map((customer, index) => (
          <motion.div
            key={customer.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white dark:bg-slate-900 rounded-[3rem] border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden group hover:border-indigo-500/30 transition-all hover:shadow-2xl hover:shadow-indigo-500/5 flex flex-col"
          >
            <div className="p-10 flex-1">
              <div className="flex justify-between items-start mb-8">
                <div className="w-20 h-20 rounded-3xl bg-indigo-50 dark:bg-indigo-500/10 flex items-center justify-center text-indigo-600 dark:text-indigo-400 font-black text-2xl border border-indigo-100 dark:border-indigo-500/20 group-hover:scale-110 transition-transform shadow-sm">
                  {customer.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div className="flex flex-col items-end">
                  <span className={`text-[9px] font-black px-3 py-1.5 rounded-full uppercase tracking-[0.2em] mb-3 shadow-sm ${
                    customer.tier === 'Enterprise' ? 'bg-indigo-600 text-white' :
                    customer.tier === 'Premium' ? 'bg-amber-500 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                  }`}>
                    {customer.tier}
                  </span>
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className={`w-3.5 h-3.5 ${i < 4 ? 'text-amber-400 fill-current' : 'text-slate-200 dark:text-slate-700'}`} />
                    ))}
                  </div>
                </div>
              </div>

              <div className="mb-8">
                <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors leading-none">{customer.name}</h3>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">{customer.company}</p>
              </div>

              <div className="space-y-4 mb-10">
                <div className="flex items-center gap-4 text-xs font-bold text-slate-500 dark:text-slate-400 group/item cursor-pointer hover:text-indigo-500 transition-colors">
                  <div className="w-8 h-8 rounded-xl bg-slate-50 dark:bg-slate-800 flex items-center justify-center border border-slate-100 dark:border-slate-700 group-hover/item:border-indigo-500/30">
                    <Mail className="w-4 h-4" />
                  </div>
                  {customer.email}
                </div>
                <div className="flex items-center gap-4 text-xs font-bold text-slate-500 dark:text-slate-400 group/item cursor-pointer hover:text-indigo-500 transition-colors">
                  <div className="w-8 h-8 rounded-xl bg-slate-50 dark:bg-slate-800 flex items-center justify-center border border-slate-100 dark:border-slate-700 group-hover/item:border-indigo-500/30">
                    <Phone className="w-4 h-4" />
                  </div>
                  +1 (555) 000-0000
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6 pt-8 border-t border-slate-100 dark:border-slate-800">
                <div>
                  <p className="text-[9px] font-black text-slate-400 uppercase tracking-[0.3em] mb-2">Lifetime Value</p>
                  <p className="text-xl font-black text-slate-900 dark:text-white">{customer.lifetimeValue}</p>
                </div>
                <div>
                  <p className="text-[9px] font-black text-slate-400 uppercase tracking-[0.3em] mb-2">Total Tickets</p>
                  <p className="text-xl font-black text-slate-900 dark:text-white">{customer.totalTickets}</p>
                </div>
              </div>
            </div>

            <div className="px-10 py-6 bg-slate-50 dark:bg-slate-800/30 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between group/footer">
              <button 
                onClick={() => onCreateTicket?.(customer.id)}
                className="text-indigo-600 dark:text-indigo-400 font-black text-[10px] uppercase tracking-[0.2em] flex items-center gap-2 hover:gap-3 transition-all"
              >
                Create Ticket <Plus className="w-4 h-4" />
              </button>
              <button className="text-slate-400 dark:text-slate-500 font-black text-[10px] uppercase tracking-[0.2em] flex items-center gap-2 hover:text-indigo-600 transition-all">
                Full Profile <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default CustomerList;
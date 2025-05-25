import { CalendarDays, Trash2 } from 'lucide-react';
const EachGrievanceCard = ({ grievance, handleDelete }) => {
    return (
        <div
            key={grievance._id}
            className="relative bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition border border-gray-200"
        >
            <div className="flex items-center gap-2 text-gray-500 text-sm mb-3">
                <CalendarDays className="w-4 h-4" />
                <span>{new Date(grievance.submittedAt).toLocaleString()}</span>
            </div>

            <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {grievance.name}
            </h3>

            <div className="mb-2">
                <span
                    className={`inline-block px-3 py-1 text-sm font-medium rounded-full 
                    ${grievance.status
                            ? 'bg-green-100 text-green-800'
                            : 'bg-red-100 text-red-800'}`}
                >
                    {grievance.status ? 'Resolved' : 'Pending'}
                </span>
            </div>

            <p className="text-gray-800 text-base leading-relaxed">
                {grievance.grievance}
            </p>

            {/* Delete Button */}
            <button
                onClick={() => handleDelete(grievance._id)}
                className="absolute top-4 right-4 text-red-500 hover:text-red-700 transition"
                title="Delete Grievance"
            >
                <Trash2 className="w-5 h-5" />
            </button>
        </div>
    )
}

export default EachGrievanceCard

import React, { useState } from 'react';
import { FaMotorcycle, FaCar, FaTrash, FaEdit, FaPlus } from 'react-icons/fa';

const statusColors = {
  available: 'bg-green-500',
  occupied: 'bg-red-500',
  out_of_order: 'bg-gray-400',
};

const typeIcons = {
  two_wheeler: <FaMotorcycle className="inline mr-1" />,
  four_wheeler: <FaCar className="inline mr-1" />,
};

const statusLabels = {
  available: 'Available',
  occupied: 'Occupied',
  out_of_order: 'Out of Order',
};

const typeLabels = {
  two_wheeler: '2-Wheeler',
  four_wheeler: '4-Wheeler',
};

const SlotEditor = ({ slots, onStatusChange, onTypeChange, onDelete, onAdd }) => {
  const [addType, setAddType] = useState('two_wheeler');
  const [addQty, setAddQty] = useState(1);

  return (
    <div>
      {/* Add Slot Controls */}
      <div className="flex items-center gap-2 mb-4">
        <select
          className="p-2 rounded text-black"
          value={addType}
          onChange={e => setAddType(e.target.value)}
        >
          <option value="two_wheeler">2-Wheeler</option>
          <option value="four_wheeler">4-Wheeler</option>
        </select>
        <input
          type="number"
          min={1}
          value={addQty}
          onChange={e => setAddQty(Math.max(1, parseInt(e.target.value) || 1))}
          className="w-16 p-2 rounded text-black"
        />
        <button
          className="bg-primaryGreen text-black px-3 py-2 rounded flex items-center gap-1 hover:bg-teal-400"
          onClick={() => onAdd(addType, addQty)}
        >
          <FaPlus /> Add Slot
        </button>
      </div>
      {/* Slot Pills */}
      <div className="flex flex-wrap gap-3">
        {slots.map((slot, i) => (
          <div
            key={i}
            className={`flex items-center gap-2 px-4 py-2 rounded-full shadow ${statusColors[slot.status] || 'bg-gray-300'} text-white relative`}
            style={{ minWidth: 120 }}
          >
            <span className="text-lg">{typeIcons[slot.slot_type]}</span>
            <span className="font-semibold">{typeLabels[slot.slot_type]}</span>
            <span className="ml-2 text-xs">{statusLabels[slot.status]}</span>
            {/* Edit Type */}
            <select
              className="ml-2 p-1 rounded text-black text-xs"
              value={slot.slot_type}
              onChange={e => onTypeChange(i, e.target.value)}
              style={{ width: 90 }}
            >
              <option value="two_wheeler">2-Wheeler</option>
              <option value="four_wheeler">4-Wheeler</option>
            </select>
            {/* Edit Status */}
            <select
              className="ml-2 p-1 rounded text-black text-xs"
              value={slot.status}
              onChange={e => onStatusChange(i, e.target.value)}
              style={{ width: 90 }}
            >
              <option value="available">Available</option>
              <option value="occupied">Occupied</option>
              <option value="out_of_order">Out of Order</option>
            </select>
            {/* Delete Slot */}
            <button
              className="ml-2 text-white hover:text-red-300"
              onClick={() => onDelete(i)}
              title="Delete Slot"
            >
              <FaTrash />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SlotEditor;
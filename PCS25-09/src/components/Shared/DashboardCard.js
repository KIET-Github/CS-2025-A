import React from 'react';

const DashboardCard = ({ image, title, location, price, availability, role, onClick, cardWidth = 'max-w-xs', children }) => {
  return (
    <div className={`bg-primaryBlue rounded-2xl shadow-md overflow-hidden flex flex-col justify-between transition hover:shadow-lg w-full ${cardWidth} mx-auto`}>
      <div className="bg-primaryGreen w-full h-56 flex items-center justify-center">
        {image ? (
          <img
            src={image}
            alt={title}
            className="w-full h-56 object-cover rounded-t-2xl"
          />
        ) : (
          <div className="flex flex-col items-center justify-center w-full h-full text-primaryDark">
            <svg width="48" height="48" fill="none" viewBox="0 0 24 24"><rect width="24" height="24" rx="12" fill="#b2f5ea"/><path d="M7 17l3.5-4.5 2.5 3 3.5-4.5L21 17H3z" fill="#319795"/><circle cx="9" cy="9" r="2" fill="#319795"/></svg>
          </div>
        )}
      </div>
      <div className="p-4 flex-1">
        <h3 className="text-lg font-bold mb-1 text-white">{title}</h3>
        <div className="text-sm text-textLight mb-1"><span className="font-semibold">Location:</span> {location}</div>
        <div className="text-sm text-textLight mb-1"><span className="font-semibold">Price:</span> ₹{price}/hour</div>
        <div className="text-sm text-textLight"><span className="font-semibold">Availability:</span> {availability}</div>
        {children}
      </div>
      <div className="px-4 pb-4">
        <button
          onClick={onClick}
          className="w-full bg-primaryGreen hover:bg-teal-400 text-black text-sm py-2 rounded-lg transition font-semibold"
        >
          {role === 'parking_owner' ? 'EDIT' : 'BookNow'}
        </button>
      </div>
    </div>
  );
};

export default DashboardCard;

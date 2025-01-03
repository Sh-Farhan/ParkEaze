
import React from 'react';

const ParkingSpotVisualization = ({ totalSpots, availableSpots, onSpotSelect, selectedSpot }) => {
  // Generate mock data for parking spots
  const parkingSpots = Array.from({ length: totalSpots }, (_, index) => ({
    id: index + 1,
    isAvailable: index < availableSpots,
  }));

  return (
    <div className="mt-4">
      <h3 className="text-lg font-semibold mb-2">Parking Spot Availability</h3>
      <div className="grid grid-cols-10 gap-1">
        {parkingSpots.map((spot) => (
          <div
            key={spot.id}
            className={`w-6 h-6 rounded-sm ${
              spot.isAvailable 
                ? selectedSpot === spot.id
                  ? 'bg-blue-500'
                  : 'bg-green-500 hover:bg-blue-300 cursor-pointer'
                : 'bg-red-500'
            } flex items-center justify-center text-xs text-white font-bold`}
            title={`Spot ${spot.id}: ${spot.isAvailable ? 'Available' : 'Occupied'}`}
            onClick={() => spot.isAvailable && onSpotSelect(spot.id)}
          >
            {spot.id}
          </div>
        ))}
      </div>
      <div className="mt-2 text-sm text-gray-400">
        <span className="inline-block w-3 h-3 bg-green-500 mr-1"></span> Available
        <span className="inline-block w-3 h-3 bg-red-500 ml-4 mr-1"></span> Occupied
        <span className="inline-block w-3 h-3 bg-blue-500 ml-4 mr-1"></span> Selected
      </div>
    </div>
  );
};

export default ParkingSpotVisualization;




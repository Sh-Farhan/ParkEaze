'use client'

import React, { useState, useMemo } from 'react'
import { Search, MapPin, Clock, CreditCard } from 'lucide-react'
import ParkingSpotVisualization from './ParkVisualization'

export const parks = [
  { id: 1, name: "Central Park", location: "Downtown", totalSpots: 100, availableSpots: 50, pricePerHour: 5 },
  { id: 2, name: "Riverside Park", location: "Westside", totalSpots: 80, availableSpots: 30, pricePerHour: 4 },
  { id: 3, name: "Prospect Park", location: "Brooklyn", totalSpots: 120, availableSpots: 40, pricePerHour: 3.5 },
  { id: 4, name: "Flushing Meadows Corona Park", location: "Queens", totalSpots: 150, availableSpots: 60, pricePerHour: 3 },
  { id: 5, name: "Van Cortlandt Park", location: "Bronx", totalSpots: 90, availableSpots: 35, pricePerHour: 2.5 },
  { id: 6, name: "Pelham Bay Park", location: "Bronx", totalSpots: 110, availableSpots: 45, pricePerHour: 3 },
  { id: 7, name: "Brooklyn Bridge Park", location: "Brooklyn", totalSpots: 70, availableSpots: 25, pricePerHour: 6 },
  { id: 8, name: "Hudson River Park", location: "Manhattan", totalSpots: 60, availableSpots: 20, pricePerHour: 5.5 },
  { id: 9, name: "Washington Square Park", location: "Greenwich Village", totalSpots: 40, availableSpots: 15, pricePerHour: 7 },
  { id: 10, name: "Battery Park", location: "Lower Manhattan", totalSpots: 50, availableSpots: 10, pricePerHour: 6.5 },
];

export function ParkSearch() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedPark, setSelectedPark] = useState(null)
  const [selectedSpot, setSelectedSpot] = useState(null)
  const [bookingHours, setBookingHours] = useState(1)
  const [paymentMethod, setPaymentMethod] = useState('credit_card')

  const filteredParks = useMemo(() => {
    return parks.filter(park => 
      park.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      park.location.toLowerCase().includes(searchTerm.toLowerCase())
    )
  }, [searchTerm])

  const handleParkSelect = (park) => {
    setSelectedPark(park)
    setSelectedSpot(null)
    setSearchTerm('')
    setBookingHours(1)
  }

  const handleSpotSelect = (spotId) => {
    setSelectedSpot(spotId)
  }

  const handleBooking = () => {
    if (!selectedSpot) {
      alert('Please select a parking spot before booking.')
      return
    }
    const totalCost = selectedPark.pricePerHour * bookingHours
    alert(`Booking confirmed at ${selectedPark.name} for spot ${selectedSpot} for ${bookingHours} hours. Total cost: $${totalCost.toFixed(2)}. Payment method: ${paymentMethod}`)
  }

  return (
    <div className="max-w-md mx-auto p-4 space-y-4">
      <h1 className="text-2xl font-bold text-white">Find and Book a Parking Spot</h1>
      
      <div className="relative">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search for a park..."
          className="w-full p-2 pl-10 rounded-md bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
      </div>

      {searchTerm && (
        <ul className="bg-gray-800 rounded-md overflow-hidden">
          {filteredParks.map(park => (
            <li 
              key={park.id}
              onClick={() => handleParkSelect(park)}
              className="p-2 hover:bg-gray-700 cursor-pointer text-white"
            >
              {park.name} - {park.location} ({park.availableSpots} spots available)
            </li>
          ))}
        </ul>
      )}

      {selectedPark && (
        <div className="bg-gray-800 p-4 rounded-md text-white">
          <h2 className="text-xl font-semibold mb-2">{selectedPark.name}</h2>
          <p className="flex items-center text-sm text-gray-400 mb-2">
            <MapPin className="mr-2 h-4 w-4" />
            {selectedPark.location}
          </p>
          <p className="text-lg mb-2">
            Available Parking Spots: {selectedPark.availableSpots} / {selectedPark.totalSpots}
          </p>
          <ParkingSpotVisualization
            totalSpots={selectedPark.totalSpots}
            availableSpots={selectedPark.availableSpots}
            onSpotSelect={handleSpotSelect}
            selectedSpot={selectedSpot}
          />
          {selectedSpot && (
            <p className="text-lg mt-2 text-blue-300">
              Selected Spot: {selectedSpot}
            </p>
          )}
          <p className="text-lg mb-4">
            Price: ${selectedPark.pricePerHour.toFixed(2)} per hour
          </p>

          <div className="mb-4 mt-4">
            <label htmlFor="hours" className="block text-sm font-medium text-gray-400 mb-1">
              Booking Duration (hours)
            </label>
            <div className="flex items-center">
              <input
                type="number"
                id="hours"
                min="1"
                max="24"
                value={bookingHours}
                onChange={(e) => setBookingHours(Math.max(1, Math.min(24, parseInt(e.target.value) || 1)))}
                className="w-20 p-2 rounded-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <Clock className="ml-2 h-5 w-5 text-gray-400" />
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-400 mb-1">
              Payment Method
            </label>
            <div className="space-y-2">
              <label className="flex items-center">
                <input
                  type="radio"
                  value="credit_card"
                  checked={paymentMethod === 'credit_card'}
                  onChange={() => setPaymentMethod('credit_card')}
                  className="mr-2"
                />
                <CreditCard className="mr-2 h-5 w-5" />
                Credit Card
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  value="digital_wallet"
                  checked={paymentMethod === 'digital_wallet'}
                  onChange={() => setPaymentMethod('digital_wallet')}
                  className="mr-2"
                />
                <CreditCard className="mr-2 h-5 w-5" />
                Digital Wallet
              </label>
            </div>
          </div>

          <p className="text-lg font-semibold mb-4">
            Total Cost: ${(selectedPark.pricePerHour * bookingHours).toFixed(2)}
          </p>

          <button
            onClick={handleBooking}
            className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            Book and Pay
          </button>
        </div>
      )}
    </div>
  )
}
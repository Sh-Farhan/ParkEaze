import React from 'react'
import Link from 'next/link'
import { Car, CreditCard } from 'lucide-react'
import { Button } from "@/components/ui/button"

const Header = () => {
  return (
    <header className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-12 md:py-20">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center text-center">
          <div className="mb-6 relative">
            <Car className="h-24 w-24 md:h-32 md:w-32 text-white" />
            <CreditCard className="h-12 w-12 md:h-16 md:w-16 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-blue-300" />
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            ParkEaze
          </h1>
          <p className="text-xl md:text-2xl mb-8">
            Simplifying Parking Payments for You
          </p>
          <Link href="/find-parking" passHref>
            <Button size="lg" variant="secondary" className="bg-white text-blue-600 hover:bg-blue-100">
              Get Started
            </Button>
          </Link>
        </div>
      </div>
    </header>
  )
}

export default Header

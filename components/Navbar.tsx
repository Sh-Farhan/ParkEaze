'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Car, CreditCard, Home, Menu, Ticket, User, X } from 'lucide-react'
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const navItems = [
  { name: 'Home', href: '/', icon: Home },
  { name: 'Find Parking', href: '/parking', icon: Car },
  { name: 'Register', href: '/register', icon: Ticket },
  { name: 'Login', href: '/login', icon: CreditCard },
]

export function NavBar2() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0">
              <span className="text-2xl font-bold text-blue-600">ParkEase</span>
            </Link>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`px-3 py-2 rounded-md text-sm font-medium ${
                    pathname === item.href
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-700 hover:bg-blue-100 hover:text-blue-600'
                  }`}
                >
                  <item.icon className="inline-block w-5 h-5 mr-1" />
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
          <div className="hidden md:block">
            <UserDropdown />
          </div>
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`block px-3 py-2 rounded-md text-base font-medium ${
                  pathname === item.href
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-700 hover:bg-blue-100 hover:text-blue-600'
                }`}
                onClick={() => setIsOpen(false)}
              >
                <item.icon className="inline-block w-5 h-5 mr-2" />
                {item.name}
              </Link>
            ))}
          </div>
          <div className="pt-4 pb-3 border-t border-gray-200">
            <UserDropdown mobile />
          </div>
        </div>
      )}
    </nav>
  )
}

function UserDropdown({ mobile = false }: { mobile?: boolean }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant={mobile ? "ghost" : "outline"} className={mobile ? "w-full justify-start" : ""}>
          <User className="mr-2 h-4 w-4" />
          <span>Rohan Shah</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">John Doe</p>
            <p className="text-xs leading-none text-muted-foreground">
              john.doe@example.com
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          Profile
        </DropdownMenuItem>
        <DropdownMenuItem>
          Settings
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}


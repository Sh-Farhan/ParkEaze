import React from 'react';
import Link from 'next/link';
import { Facebook, Twitter, Instagram, Mail, Phone } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">ParkEaze</h3>
            <p className="text-gray-400">Simplifying parking payments for you.</p>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link href="/find-parking" className="hover:text-blue-400 transition-colors">Find Parking</Link></li>
              <li><Link href="/how-it-works" className="hover:text-blue-400 transition-colors">How It Works</Link></li>
              <li><Link href="/pricing" className="hover:text-blue-400 transition-colors">Pricing</Link></li>
              <li><Link href="/faq" className="hover:text-blue-400 transition-colors">FAQ</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
            <ul className="space-y-2">
              <li className="flex items-center">
                <Mail className="w-5 h-5 mr-2" />
                <a href="mailto:support@parkeaze.com" className="hover:text-blue-400 transition-colors">support@parkeaze.com</a>
              </li>
              <li className="flex items-center">
                <Phone className="w-5 h-5 mr-2" />
                <a href="tel:+1234567890" className="hover:text-blue-400 transition-colors">+1 (234) 567-890</a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Follow Us</h4>
            <div className="flex space-x-4">
              <a href="https://facebook.com/parkeaze" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition-colors">
                <Facebook className="w-6 h-6" />
              </a>
              <a href="https://twitter.com/parkeaze" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition-colors">
                <Twitter className="w-6 h-6" />
              </a>
              <a href="https://instagram.com/parkeaze" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition-colors">
                <Instagram className="w-6 h-6" />
              </a>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-800 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} ParkEaze. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

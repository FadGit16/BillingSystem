import React from 'react';

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      {/* Navbar */}
      <header className="bg-blue-600 text-white py-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">Billing System</h1>
          <nav>
            <ul className="flex space-x-6">
              <li><a href="#dashboard" className="hover:text-gray-200">Dashboard</a></li>
              <li><a href="#invoices" className="hover:text-gray-200">Invoices</a></li>
              <li><a href="#settings" className="hover:text-gray-200">Settings</a></li>
            </ul>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="text-center py-16 bg-blue-100">
        <div className="container mx-auto">
          <h2 className="text-4xl font-semibold text-blue-700">Manage Your Billing Efficiently</h2>
          <p className="mt-4 text-lg text-blue-600">Create and track invoices with ease, and streamline your billing process.</p>
          <div className="mt-6">
            <button className="bg-blue-600 text-white px-6 py-3 rounded-full hover:bg-blue-700 transition">
              Start New Bill
            </button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 bg-gray-200">
        <div className="container mx-auto text-center">
          <h3 className="text-3xl font-semibold text-gray-800">Features</h3>
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h4 className="text-xl font-semibold text-blue-600">Create Invoices</h4>
              <p className="mt-4 text-gray-600">Quickly generate invoices with customizable fields for products and services.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h4 className="text-xl font-semibold text-blue-600">Track Payments</h4>
              <p className="mt-4 text-gray-600">Easily track the status of payments for all your invoices.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h4 className="text-xl font-semibold text-blue-600">Generate Reports</h4>
              <p className="mt-4 text-gray-600">Get detailed reports on your invoicing history and finances.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-blue-600 text-white py-4 mt-12">
        <div className="container mx-auto text-center">
          <p>&copy; 2024 Billing System. All Rights Reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default Home;

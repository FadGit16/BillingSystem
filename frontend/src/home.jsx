import React, { useState } from 'react';
import axios from 'axios';

const Home = () => {
  // State to manage new invoice form data
  const [newInvoice, setNewInvoice] = useState({
    customer_name: '',
    total: 0,
  });
  const [invoices, setInvoices] = useState([]);

  // Fetch invoices on component mount
  React.useEffect(() => {
    axios
      .get('http://127.0.0.1:5000/api/invoices')
      .then((response) => setInvoices(response.data))
      .catch((error) => console.error('Error fetching invoices:', error));
  }, []);

  // Handle change in the new invoice form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewInvoice({
      ...newInvoice,
      [name]: value,
    });
  };

  // Handle adding a new invoice
  const handleAddInvoice = () => {
    axios
      .post('http://127.0.0.1:5000/api/invoices', newInvoice)
      .then((response) => {
        setInvoices([...invoices, response.data]); // Update invoices list
        setNewInvoice({ customer_name: '', total: 0 }); // Reset the form
      })
      .catch((error) => console.error('Error adding invoice:', error));
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      {/* Navbar */}
      <header className="bg-blue-600 text-white py-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">Billing System</h1>
          <nav>
            <ul className="flex space-x-6">
              <li>
                <a href="#dashboard" className="hover:text-gray-200">
                  Dashboard
                </a>
              </li>
              <li>
                <a href="#invoices" className="hover:text-gray-200">
                  Invoices
                </a>
              </li>
              <li>
                <a href="#settings" className="hover:text-gray-200">
                  Settings
                </a>
              </li>
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
            <button
              onClick={() => document.getElementById('newInvoiceModal').classList.remove('hidden')}
              className="bg-blue-600 text-white px-6 py-3 rounded-full hover:bg-blue-700 transition"
            >
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

      {/* Invoices List Section */}
      <section id="invoices" className="py-12">
        <div className="container mx-auto text-center">
          <h3 className="text-3xl font-semibold text-gray-800">Recent Invoices</h3>
          <div className="mt-6">
            {invoices.length > 0 ? (
              <ul>
                {invoices.map((invoice) => (
                  <li key={invoice.id} className="border p-4 mb-4 bg-white rounded-lg shadow-md">
                    <h4 className="font-semibold text-blue-600">{invoice.customer_name}</h4>
                    <p className="text-gray-600">Total: ${invoice.total}</p>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-600">No invoices yet.</p>
            )}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-blue-600 text-white py-4 mt-12">
        <div className="container mx-auto text-center">
          <p>&copy; 2024 Billing System. All Rights Reserved.</p>
        </div>
      </footer>

      {/* New Invoice Modal */}
      <div id="newInvoiceModal" className="fixed inset-0 bg-gray-800 bg-opacity-50 hidden">
        <div className="flex justify-center items-center min-h-screen">
          <div className="bg-white p-8 rounded-lg shadow-lg w-96">
            <h3 className="text-xl font-semibold mb-4">Create New Invoice</h3>
            <div className="mb-4">
              <input
                type="text"
                name="customer_name"
                value={newInvoice.customer_name}
                onChange={handleInputChange}
                placeholder="Customer Name"
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            <div className="mb-4">
              <input
                type="number"
                name="total"
                value={newInvoice.total}
                onChange={handleInputChange}
                placeholder="Total Amount"
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            <div className="flex justify-between">
              <button
                onClick={() => document.getElementById('newInvoiceModal').classList.add('hidden')}
                className="bg-gray-600 text-white px-4 py-2 rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleAddInvoice}
                className="bg-blue-600 text-white px-4 py-2 rounded"
              >
                Add Invoice
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;

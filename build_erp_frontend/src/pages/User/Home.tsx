import { useEffect, useState } from "react";
import { Link } from "react-router-dom"; // Assuming React Router for navigation

function Home() {
  const [exist, setExist] = useState(false)
  useEffect(() => {
    if (localStorage.getItem("accessToken")) {
      setExist(true)
    }
  })
  return (
    <div className="min-h-screen bg-gray-900 text-gray-200">
      {/* Hero Section */}
      <section className="relative bg-gray-800/90 backdrop-blur-sm border-b border-gray-700/50 py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-100 mb-4">
            Streamline Your Construction Projects{exist ? "hai" : "not"}
          </h1>
          <p className="text-lg sm:text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
            Manage projects, site assignments, materials, and categories with our powerful Construction ERP solution.
          </p>
          <Link
            to="/dashboard"
            className="bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white px-6 py-3 rounded-lg shadow-md hover:shadow-xl transition-all duration-200 font-semibold text-sm"
            aria-label="Get started with Construction ERP"
          >
            Get Started
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-100 text-center mb-12">
            Why Choose Our ERP Solution?
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Feature Card 1: Project Management */}
            <div className="bg-gray-800/90 backdrop-blur-sm rounded-xl shadow-2xl p-6 border border-gray-700/50 hover:bg-gray-700/50 transition-colors duration-200">
              <h3 className="text-xl font-semibold text-gray-100 mb-3">
                Project Management
              </h3>
              <p className="text-gray-300 text-sm">
                Track and manage all your construction projects with real-time updates and detailed insights.
              </p>
            </div>
            {/* Feature Card 2: Site Assignments */}
            <div className="bg-gray-800/90 backdrop-blur-sm rounded-xl shadow-2xl p-6 border border-gray-700/50 hover:bg-gray-700/50 transition-colors duration-200">
              <h3 className="text-xl font-semibold text-gray-100 mb-3">
                Site Assignments
              </h3>
              <p className="text-gray-300 text-sm">
                Assign site managers to projects efficiently and monitor their progress seamlessly.
              </p>
            </div>
            {/* Feature Card 3: Material Tracking */}
            <div className="bg-gray-800/90 backdrop-blur-sm rounded-xl shadow-2xl p-6 border border-gray-700/50 hover:bg-gray-700/50 transition-colors duration-200">
              <h3 className="text-xl font-semibold text-gray-100 mb-3">
                Material Tracking
              </h3>
              <p className="text-gray-300 text-sm">
                Manage materials, categories, and inventory with precision to avoid delays and cost overruns.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call-to-Action Section */}
      <section className="bg-gray-800/90 border-t border-gray-700/50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-100 mb-4">
            Ready to Transform Your Workflow?
          </h2>
          <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
            Join thousands of construction professionals using our ERP solution to streamline operations.
          </p>
          <Link
            to="/signup"
            className="bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white px-6 py-3 rounded-lg shadow-md hover:shadow-xl transition-all duration-200 font-semibold text-sm"
            aria-label="Sign up for Construction ERP"
          >
            Sign Up Now
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 border-t border-gray-700/50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-400 text-sm">
            &copy; {new Date().getFullYear()} Construction ERP. All rights reserved.
          </p>
          <div className="mt-4 flex justify-center gap-6">
            <Link to="/about" className="text-gray-300 hover:text-teal-400 text-sm transition-colors duration-200">
              About
            </Link>
            <Link to="/contact" className="text-gray-300 hover:text-teal-400 text-sm transition-colors duration-200">
              Contact
            </Link>
            <Link to="/privacy" className="text-gray-300 hover:text-teal-400 text-sm transition-colors duration-200">
              Privacy Policy
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Home;
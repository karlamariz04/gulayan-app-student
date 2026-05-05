import { useState } from "react";
import { Outlet, Link, useLocation, Navigate } from "react-router-dom";
import { FaHome, FaClipboardList, FaCog, FaTimes, FaSignOutAlt, FaBars } from "react-icons/fa";
export default function AuthenticatedUserLayout() {
  const location = useLocation();
  // const navigate = useNavigate();

  const [sidebarOpen, setSidebarOpen] = useState(false);

  // ensure that user is authenticated, if not redirect to login page
  //const isAuthenticated = localStorage.getItem('token') != null;
  //if (!isAuthenticated) {
  //  return <Navigate to="/login" replace />;
  //}

  const menuItems = [
    { id: 'dashboard', path: '/', name: 'Dashboard', icon: FaHome },
    { id: 'my-plants', path: '/my-plants', name: 'My Plants', icon: FaClipboardList },
    { id: 'settings', path: '/settings', name: 'Settings', icon: FaCog }
  ]

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className={`
        fixed lg:static inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200 transform 
        transition-transform duration-300 ease-in-out
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        {/* Logo Section */}
        <div className="h-16 flex items-center justify-between px-6 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round"
                  strokeWidth={2} d="M3 21l5-5m0 0l5 5m-5-5V3m7 0l5 5m-5-5v18" />
              </svg>
            </div>
            <span className="text-xl font-bold text-green-800">Gulayan</span>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden text-gray-600 hover:text-gray-800"
          >
            <FaTimes size={20} />
          </button>
        </div>

        {/* Menu Items */}
        <nav className="flex-1 px-4 py-6 space-y-2">
          {menuItems.map((item) => (
            <Link
              key={`sidebar-menuitem-${item.id}`}
              to={item.path}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg 
                                transition duration-200 ${location.pathname === item.path
                  ? 'bg-green-600 text-white'
                  : 'text-gray-700 hover:bg-green-50'
                }`}
            >
              <item.icon size={20} />
              <span className="font-medium">{item.name}</span>
            </Link>
          ))}
        </nav>

        {/* Logout Button */}
        <div className="px-4 py-4 border-t border-gray-200">
          <Link
            to="/login"
            className="w-full flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg transition duration-200"
          >
            <FaSignOutAlt size={20} />
            <span className="font-medium">Logout</span>
          </Link>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6">
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden text-gray-600 hover:text-gray-800"
          >
            <FaBars size={24} />
          </button>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-sm font-medium text-gray-800">Juan Dela Cruz</p>
              <p className="text-xs text-gray-600">Admin</p>
            </div>
            <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center text-white font-semibold">
              JD
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
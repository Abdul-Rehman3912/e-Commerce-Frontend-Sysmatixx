import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Menu, X, MessageCircle, Bell, LogOut } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore.js";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const { logout, authUser } = useAuthStore();

  const userRole = authUser?.role;

  const handleLogout = async () => {
    const success = await logout();
    if (success) {
      navigate("/");
    }
  };

  const navItems = {
    user: [{ name: "Home", path: "/" }],
    admin: [
      { name: "Home", path: "/" },
      { name: "Add Product", path: "/addproductitems" },
    ],
  };

  const getNavItems = () => {
    if (userRole === "Admin") {
      return navItems.admin;
    }
    return navItems.user;
  };

  const currentNavItems = getNavItems();

  return (
    <div className="fixed top-0 left-0 right-0 border-b bg-white z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-3 h-16">
        <div
          className="flex items-center gap-2 cursor-pointer shrink-0"
          onClick={() => navigate("/")}
        >
          <div className="bg-black text-white px-2.5 py-1 rounded font-bold text-sm tracking-wider">
            A
          </div>
          <h1 className="font-bold text-lg tracking-tight text-gray-900">OnlineStore</h1>
        </div>

        <div className="hidden md:block flex-1 max-w-md mx-8">
          <input
            type="text"
            placeholder="Search Products..."
            className="w-full bg-gray-50 border border-gray-200 rounded-full px-4 py-2 text-sm outline-none transition-all focus:bg-white focus:border-black focus:ring-1 focus:ring-black"
          />
        </div>

        <div className="hidden md:flex items-center gap-6 shrink-0">
          {currentNavItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`text-sm font-medium transition-colors hover:text-black ${
                item.name === "Home" ? "text-black" : "text-gray-500"
              }`}
            >
              {item.name}
            </Link>
          ))}

          <div className="flex items-center gap-4 text-gray-600 border-l pl-4 border-gray-200">
            <MessageCircle
              size={20}
              className="cursor-pointer hover:text-black transition-colors"
            />
            <Bell
              size={20}
              className="cursor-pointer hover:text-black transition-colors"
            />
          </div>

          {authUser && (
            <button
              onClick={handleLogout}
              className="bg-red-600 hover:bg-red-700 text-white font-medium text-sm px-4 py-2 rounded-xl flex items-center gap-2 transition-colors shadow-sm"
            >
              <LogOut size={16} />
              <span>Logout</span>
            </button>
          )}
        </div>

        <button 
          className="md:hidden p-1.5 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors" 
          onClick={() => setOpen(!open)}
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {open && (
        <div className="md:hidden border-t bg-white absolute top-16 left-0 right-0 shadow-lg px-4 py-5 space-y-5 animate-in fade-in slide-in-from-top-2 duration-200">
          <div>
            <input
              type="text"
              placeholder="Search Products..."
              className="w-full bg-gray-50 border border-gray-200 rounded-full px-4 py-2.5 text-sm outline-none focus:bg-white focus:border-black"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            {currentNavItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`text-base font-medium py-2 px-3 rounded-lg hover:bg-gray-50 ${
                  item.name === "Home" ? "text-black bg-gray-50" : "text-gray-600"
                }`}
                onClick={() => setOpen(false)}
              >
                {item.name}
              </Link>
            ))}
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-gray-100">
            <div className="flex items-center gap-5 text-gray-600 px-2">
              <MessageCircle size={22} className="cursor-pointer hover:text-black" />
              <Bell size={22} className="cursor-pointer hover:text-black" />
            </div>

            {authUser && (
              <button
                onClick={handleLogout}
                className="bg-red-600 hover:bg-red-700 text-white font-medium text-sm px-5 py-2.5 rounded-xl flex items-center gap-2 transition-colors"
              >
                <LogOut size={16} />
                <span>Logout</span>
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
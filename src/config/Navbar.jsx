// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { useQuizAuth } from "./QuizAuthContext";

// const Navbar = () => {
//   const [menuOpen, setMenuOpen] = useState(false);
//   const { user, logout } = useQuizAuth(); // ✅ use context instead of localStorage
//   const navigate = useNavigate();

//   const toggleMenu = () => setMenuOpen(!menuOpen);

//   const handleLogout = () => {
//     logout(); // ✅ context logout clears user & localStorage
//     navigate("/login");
//   };

//   return (
//     <nav className="bg-white shadow-md sticky top-0 z-50">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex justify-between h-16 items-center">
//           {/* Brand */}
//           <div
//             className="flex-shrink-0 flex items-center text-indigo-700 font-extrabold text-xl tracking-wide cursor-pointer"
//             onClick={() => navigate("/")}
//           >
//             TechQuiz
//           </div>

//           {/* Mobile Menu Toggle */}
//           <div className="flex sm:hidden">
//             <button
//               onClick={toggleMenu}
//               className="inline-flex items-center justify-center p-2 rounded-md text-indigo-700 hover:text-white hover:bg-indigo-700 focus:outline-none"
//             >
//               <svg
//                 className="h-6 w-6"
//                 stroke="currentColor"
//                 fill="none"
//                 viewBox="0 0 24 24"
//               >
//                 {menuOpen ? (
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth="2"
//                     d="M6 18L18 6M6 6l12 12"
//                   />
//                 ) : (
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth="2"
//                     d="M4 6h16M4 12h16M4 18h16"
//                   />
//                 )}
//               </svg>
//             </button>
//           </div>

//           {/* Links */}
//           <div
//             className={`sm:flex sm:items-center sm:space-x-8 ${
//               menuOpen ? "block" : "hidden"
//             } sm:block`}
//           >
//             <a
//               href="/"
//               className="text-indigo-700 hover:text-indigo-900 px-3 py-2 rounded-md text-sm"
//             >
//               Home
//             </a>

//             {user ? (
//               <>
//                 <a
//                   href="/reports"
//                   className="text-indigo-700 hover:text-indigo-900 px-3 py-2 rounded-md text-sm"
//                 >
//                   Reports
//                 </a>
//                 <button
//                   onClick={handleLogout}
//                   className="text-red-600 hover:text-red-800 px-3 py-2 rounded-md text-sm"
//                 >
//                   Logout
//                 </button>
//               </>
//             ) : (
//               <>
//                 <a
//                   href="/login"
//                   className="text-indigo-700 hover:text-indigo-900 px-3 py-2 rounded-md text-sm"
//                 >
//                   Login
//                 </a>
//                 <a
//                   href="/register"
//                   className="text-indigo-700 hover:text-indigo-900 px-3 py-2 rounded-md text-sm"
//                 >
//                   Register
//                 </a>
//               </>
//             )}
//           </div>
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQuizAuth } from "./QuizAuthContext";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, logout } = useQuizAuth();
  const navigate = useNavigate();

  const toggleMenu = () => setMenuOpen(!menuOpen);

  const handleLogout = () => {
    console.log("Navbar: Logging out, clearing user state");
    logout();
    navigate("/login");
  };

  // Check if user is an admin
  const isAdmin = user?.roles?.includes("ROLE_ADMIN");

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Brand */}
          <div
            className="flex-shrink-0 flex items-center text-indigo-700 font-extrabold text-xl tracking-wide cursor-pointer"
            onClick={() => navigate(isAdmin ? "/admin" : "/")}
          >
            TechQuiz
          </div>

          {/* Mobile Menu Toggle */}
          <div className="flex sm:hidden">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-indigo-700 hover:text-white hover:bg-indigo-700 focus:outline-none"
            >
              <svg
                className="h-6 w-6"
                stroke="currentColor"
                fill="none"
                viewBox="0 0 24 24"
              >
                {menuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>

          {/* Links */}
          <div
            className={`sm:flex sm:items-center sm:space-x-8 ${
              menuOpen ? "block" : "hidden"
            } sm:block`}
          >
            {user ? (
              isAdmin ? (
                <>
                  <a
                    href="/admin/quizzes"
                    className="text-indigo-700 hover:text-indigo-900 px-3 py-2 rounded-md text-sm"
                  >
                    Manage Quizzes
                  </a>
                  <a
                    href="/admin/users"
                    className="text-indigo-700 hover:text-indigo-900 px-3 py-2 rounded-md text-sm"
                  >
                    Manage Users
                  </a>
                  <a
                    href="/admin/reports"
                    className="text-indigo-700 hover:text-indigo-900 px-3 py-2 rounded-md text-sm"
                  >
                    View Reports
                  </a>
                  <button
                    onClick={handleLogout}
                    className="text-red-600 hover:text-red-800 px-3 py-2 rounded-md text-sm"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <a
                    href="/"
                    className="text-indigo-700 hover:text-indigo-900 px-3 py-2 rounded-md text-sm"
                  >
                    Home
                  </a>
                  <a
                    href="/reports"
                    className="text-indigo-700 hover:text-indigo-900 px-3 py-2 rounded-md text-sm"
                  >
                    Reports
                  </a>
                  <button
                    onClick={handleLogout}
                    className="text-red-600 hover:text-red-800 px-3 py-2 rounded-md text-sm"
                  >
                    Logout
                  </button>
                </>
              )
            ) : (
              <>
                <a
                  href="/login"
                  className="text-indigo-700 hover:text-indigo-900 px-3 py-2 rounded-md text-sm"
                >
                  Login
                </a>
                <a
                  href="/register"
                  className="text-indigo-700 hover:text-indigo-900 px-3 py-2 rounded-md text-sm"
                >
                  Register
                </a>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

function Layout({ children }) {
  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,#fff7ed,transparent_35%),radial-gradient(circle_at_bottom_right,#fde68a40,transparent_35%),#f8fafc] flex">

      <Sidebar />

      <main className="flex-1 px-16 py-10 overflow-y-auto">

        <Navbar />

        <div className="mt-8">
          {children}
        </div>

      </main>

    </div>
  );
}

export default Layout;
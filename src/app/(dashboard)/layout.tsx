
import { SidebarProvider } from "@/components/ui/sidebar";
import DashboardNavbar from "@/modules/dashboard/ui/components/dashboard-navbar";
import { DashboardSidebar } from "@/modules/dashboard/ui/components/dashboard-sidebar";


interface Props{
    children:React.ReactNode;
}

const Layout = ({ children }: Props) => {
  return (
    <SidebarProvider>
      <div className="flex h-screen w-screen">
        <DashboardSidebar />

        <div className="flex flex-col flex-1">
          <DashboardNavbar />

          <main className="flex-1 overflow-auto p-4">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

 
export default Layout;
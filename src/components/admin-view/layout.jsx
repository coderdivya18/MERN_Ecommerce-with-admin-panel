import React from 'react';
import AdminHeader from "@/components/admin-view/header.jsx";
import AdminSidebar from "@/components/admin-view/sidebar.jsx";
import {Outlet} from "react-router-dom";

const AdminLayout = () => {
    return (
        <div className="min-h-screen w-full flex">
            {/*admin sidebar*/}
            <AdminSidebar/>
            <div className="flex flex-1 flex-col">
                {/*admin header*/}
                <AdminHeader/>
                <main className="flex-1 flex bg-muted-40 p-4 md:p-6">
                    <Outlet/>
                </main>
            </div>
        </div>
    );
};

export default AdminLayout;
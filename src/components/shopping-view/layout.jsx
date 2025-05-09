import React from 'react';
import ShoppingHeader from "@/components/shopping-view/header.jsx";
import {Outlet} from "react-router-dom";

const ShoppingLayout = () => {
    return (
        <div className="flex flex-col bg-white overflow-hidden">
            {/*Common Header*/}
            <ShoppingHeader/>
            <main className="flex flex-col w-full">
                <Outlet/>
            </main>
        </div>
    );
};

export default ShoppingLayout;
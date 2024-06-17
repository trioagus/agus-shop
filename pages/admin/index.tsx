import React from "react";
import Head from "next/head";
import AdminLayout from "@/layouts/AdminLayout";

export default function Admin() {
    return  (
        <>
            <Head>
                <title>Admin | Agus Shop</title>
                <meta name="description" content="Admin Page" />
            </Head>
            <AdminLayout pageTitle="Admin Page">
               <div className="pt-20">
                    <h1>Admin Page</h1>
               </div>
            </AdminLayout>
        </>
    )
} 
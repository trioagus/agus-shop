import React from "react";
import Head from "next/head";
import AdminLayout from "@/layouts/AdminLayout";
import CategoryTable from "@/components/admin/category/CategoryTable";

export default function Category() {
    return (
        <>
            <Head>
                <title>Admin | Category</title>
            </Head>
            <AdminLayout pageTitle="Category">
                <div className="pt-8">
                    <CategoryTable />
                </div>
            </AdminLayout>
        </>
    );
}
import React from "react";
import Head from "next/head";
import Link from "next/link";

export default function Custom404() {
    return (
        <>
            <Head>
                <title>404 - Page Not Found</title>
            </Head>
            <main className="flex flex-col items-center justify-center min-h-screen">
                <div className="text-center">
                    <h1 className="text-4xl font-bold">404 - Page Not Found</h1>
                </div>
                <div className="text-center">
                    <p className="text-lg">The page you are looking for does not exist.</p>
                </div>
                <div className="text-center">
                    <Link href="/">
                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                            Go Back Home
                        </button>
                    </Link>
                </div>
            </main>

        </>
    );
}
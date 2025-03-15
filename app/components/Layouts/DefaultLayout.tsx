"use client";
import React, { useState, ReactNode } from "react";
import Header from "../Header";

export default function DefaultLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  
  return (
    <>
      <div className="flex bg-blue-100 min-h-screen w-full">
        <div className="relative flex flex-1 flex-col lg:ml-72.5">
          <Header/>
          <main>
            <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10 ">
              {children}
            </div>
          </main>
        </div>
      </div>
    </>
  );
}

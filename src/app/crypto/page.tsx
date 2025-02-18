"use client"
import React,{ Suspense, JSX } from "react";
import CryptoList from "../../../components/CryptoList";


export default function Cryto(): JSX.Element {
       

    return (
        <Suspense fallback={<p>Loading...</p>}>
           <CryptoList />
        </Suspense>
    )
};

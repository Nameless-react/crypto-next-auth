"use client"
import { Suspense } from "react";
import CryptoList from "../../components/CryptoList";


export default function Cryto() {
    



    


   

    return (
        <Suspense fallback={<p>Loading...</p>}>
           <CryptoList />
        </Suspense>
    )
};

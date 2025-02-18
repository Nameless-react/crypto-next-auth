"use client"
import React, { JSX } from "react";
import Image from "next/image";
import Link from "next/link";
import { type Item } from "../types/types";



export default function Item ({ image, name, symbol, id, index }: Item): JSX.Element {
    return (
        <li className="SearchMatch" key={index + 1}> 
            <Image src={image} alt={name} />
            <Link href={`/crypto/${id}`}>
                <Link href="#">{name} <span>{symbol}</span></Link>
            </Link>
        </li>
    )
}

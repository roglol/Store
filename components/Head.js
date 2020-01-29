import React from "react";
import Link from 'next/link'

const Head = () =>{
    return <>
        <Link href='/about' as='/about'>
            <a>About</a>
        </Link>
    </>
}

export default Head;

'use client'
import React from 'react'
import Image from 'next/image'
import sq from './sq.jpg'
import wq from './wq.jpg'

const imag= () => {
    
    return (
        <>
    <div id='sq1'></div>
        <div id='tet'><p>I enjoy using photography to record the beautiful moments I see in life. 
            Here are some of the photos I take. Technology used are generally Adobe Lightroom and Iphone 14 Pro. </p></div>
            <Image src={sq} alt='Nanjing Third Bridge' className='gallery'></Image>
            <Image src={wq} alt='Nanjing Fifth Bridge' className='gallery'></Image>




            </> 
    )
}
export default imag;
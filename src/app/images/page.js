'use client'
import React, { useContext } from 'react';
import LikeButton from "../../components/likebot";
import { AuthContext } from '../profile/authenti';
import Image from 'next/image';
import sq from './sq.jpg'
import wq from './wq.jpg'
const ImagesPage = () => {
    const { user } = useContext(AuthContext);
    // Define userId if the user exists, otherwise it could be null or a guest id
    const userId = user ? user.uid : null;
  
    // Example image data (adjust this according to your actual data)
    const image = {
      id: 'some-image-id',
      url: '/path/to/image.jpg',
      title: 'Sample Image'
    };
  
    return (
        <>
    <div id='sq1'></div>
        <div id='tet'><p>I enjoy using photography to record the beautiful moments I see in life. 
            Here are some of the photos I take. Technology used are generally Adobe Lightroom and Iphone 14 Pro. </p></div>
            <Image src={sq} alt='Nanjing Third Bridge' className='gallery' />
<LikeButton userId={userId} imageId="abc" />


            <Image src={wq} alt='Nanjing Fifth Bridge' className='gallery'></Image>

<LikeButton userId={userId} imageId="abc" />

            <div>
    </div>


            </> 
    )
}
export default ImagesPage;
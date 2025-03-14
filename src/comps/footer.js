import Link from 'next/link'
const Footer =()=>{
    return( 
<><p id='cpy'>&copy; 2024 Sherlock Dong. All Rights Reserved.</p>
<div id="upper"><div className='column'>
    <Link href='./projects'><h3>Projects</h3></Link>
    <Link href='./images'><h3>Images</h3></Link>
    <Link href='./stories'><h3>Stories</h3></Link>
    <Link href='./books'><h3>Books</h3></Link>
</div>
<div className='column'><Link href="https://github.com/sherlockdong/dyk" target="_blank"><h3>Recent Updates</h3></Link></div></div>
<div id='cont'>
        <p id='Footer'>
            <Link href="https://www.instagram.com/sherlock.dong/" target="_blank"><i className="fab fa-instagram" alt='instagram'></i></Link> 
            
            <Link href="https://github.com/sherlockdong"  target="_blank"><i className="fab fa-github"></i></Link>

            <Link href="mailto:sherlockdong2007@gmail.com"><i className="fas fa-envelope"></i></Link>
    
    </p></div></>
)
}
export default Footer;
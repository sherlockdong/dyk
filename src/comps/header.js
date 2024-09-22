import Link from 'next/link';
const Header =()=>{
    return(
       <div id = "header">
        <Link href="/">Sherlock Dong</Link>
            <nav id="right">
                <Link href="/projects" > <h2>Projects <span>-&gt;</span></h2></Link>    
                <Link href="/images" > <h2>Images <span>-&gt;</span></h2></Link>    
                <Link href="/stories" > <h2>Stories <span>-&gt;</span></h2></Link> 
                <Link href="/books" > <h2>Books <span>-&gt;</span></h2></Link> 
            </nav>
       </div>
    )
}
export default Header;

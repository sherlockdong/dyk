  import Link from 'next/link';
const Header =()=>{
    return(
       <div id = "header">
        <Link href="/">Sherlock Dong</Link>
            <nav id="right">
                <Link href="/project" > <h2>Project <span>-&gt;</span></h2></Link>    
                <h2>Images <span>-&gt;</span></h2>
                <h2>Stories <span>-&gt;</span></h2>
                <h2>Books I read <span>-&gt;</span></h2>
            </nav>
       </div>
    )
}
export default Header;
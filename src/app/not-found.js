import Link from 'next/link';
const  NotFound = ()=>{
    return (<p id="NF"> Page not Found.

    <br />Back to main Page <Link href="/" id='nfl'>Home </Link>
    </p>)
}
export default NotFound;
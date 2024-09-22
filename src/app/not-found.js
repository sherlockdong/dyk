import Link from 'next/link';
const  NotFound = ()=>{
    return (<p id="NF"> Page not Found. Most likely, this page is under development.

    <br />Back to main Page <Link href="/">Home</Link>
    </p>)
}
export default NotFound;
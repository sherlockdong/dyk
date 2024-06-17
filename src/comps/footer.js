import Link from 'next/link'

const Footer =()=>{
    return(

        <p id='Footer'>
            Get in touch with me :
            <Link href="https://www.instagram.com/sherlock.dong/">Instagram</Link>
            / 
            <Link href="https://github.com/sherlockdong">Github</Link>

            /<Link href="https://codeforces.com/profile/infantd">Codeforces</Link>/
            <Link href="mailto:sherlockdong2007@gmail.com">Gmail</Link>
    </p>
)
}
export default Footer;
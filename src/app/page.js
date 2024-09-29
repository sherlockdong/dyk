'use client';
import styles from "./page.module.css";
import Link from 'next/link';
export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <h3> Welcome to my Personal website: Sherlcok Dong.</h3>
      </div>
<div className={styles.mid}>
  <p id="mid">Hi there. I am a sophomore in Highschool. I am from Nanjing, China, and I am currently going to school in the United States. I went to Nanjing JinLin High School Hexi Branch for elementary school for Grade 1-5, NFLS Xianlin for Grade 6, NFLS for 
    middle school, and Berkshire School for High School. <br />
  </p>
  <p className={styles.chn}> <br /> 欢迎来到我的个人主页。</p>
</div>

      <div className={styles.grid}>
         <Link href='/projects' className={styles.card}> <h2>
            Projects <span>-&gt;</span>
          </h2>
          <p>Take a look at my passion, and read some projects I do.</p></Link>

          <Link href='/projects' className={styles.card}> <h2>
            Images <span>-&gt;</span>
          </h2>
          <p>I enjoy taking photos of the nature. Take a look at the images I took.</p></Link>

          <Link href='/stories' className={styles.card}> <h2>
            Stories <span>-&gt;</span>
          </h2>
          <p>Read my stories, my blogs, my experiences.</p></Link>

          <Link href='/books' className={styles.card}> <h2>
            Books I read<span>-&gt;</span>
          </h2>
          <p> I enjoy reading books, and I write reviews for some of my favorite books.</p></Link>
      </div>
      <div className={styles.lag}>
      <h2>Language Spoken</h2>
      <p>below are the archives of the artiles I wrote in the following languages.</p></div>
      <div className={styles.sec1}>
<div className={styles.frn}>
<Link href='/fra'>
  <h3>French</h3>
  <p>I started learning French at the age of 15.</p>
</Link></div>

<Link href='/chn' className={styles.mad}>
  <h3>Chinese</h3>
  <p>This is my first language, and I continue to use this language as well.</p>
</Link>

<Link href='/eng' className={styles.eng}>
  <h3>English</h3>
  <p>I started to speak English at 4, and now it is the language I use the most.</p>
</Link>
      </div>
  
      <div className={styles.lag}>
      <h2>Education</h2>
      <h3>Elementary School</h3>
      <h4><Link href='http://www.jzhx.net/xxb/' target='_blank'>2014-2019: Nanjing Jinlin Highschool Hexi Campus '2020</Link></h4>
      <h4><Link href='http://www.nflsxl.com/7/list.htm' target='_blank'>2019-2020: Nanjing Foreign Language School Xianlin Campus '2020</Link></h4>
      <h3>Middle School</h3>
      <h4><Link href='http://www.nfls.com.cn/' target='_blank'>2020-2023: Nanjing Foreign Language School '2023</Link></h4>
      <h3>High School</h3>
      <h4><Link href='https://www.berkshireschool.org/' target='_blank'>2023-2027: Berkshire School '2027</Link></h4>
      </div>


    </main>
  );
}


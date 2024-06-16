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
    </main>
  );
}

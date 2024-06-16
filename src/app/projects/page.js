'use client';
import styles from '../page.module.css'
export default function proj() {
    return(
        <a
          href="https://pho-guide.com"
          className={styles.card}
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2>
           PHO-Guide<span>-&gt;</span>
          </h2>
          <p>Proudly present my project - PHO- GUIDE.</p>
        </a>
    )
}
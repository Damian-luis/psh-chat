import Image from "next/image";
import styles from './index.module.css';
import { useRouter } from 'next/router'
export default function Home() {
  const router = useRouter()

  const handleRedirect=() =>{
    router.push("/chats")
  }
  return (
    <main
    className={styles.container}
    >

      <div className={styles.containerMiddle}>
        <div>
        <img className={styles.logo} src="/logopsh.svg" alt="Descripción del SVG" />
        </div>
        <div>
           <button className={styles.button} onClick={handleRedirect}>Ir a chats</button>
        </div>
      </div>
      

    </main>
  );
}

'use client'; 
import Link from 'next/link';
import styles from './Header.module.css';
import Image from 'next/image';
import { useState } from 'react';

export default function Header() {
    const menu = ['/', '/sobre', '/contato'];
    const [srcMenu, setSrcMenu] = useState('/icons/open.svg');

    const toggleMenu = () => {
        setSrcMenu(prev => prev === '/icons/open.svg' ? '/icons/close.svg' : '/icons/open.svg');
    };

    const isOpen = srcMenu === '/icons/close.svg';

    return (
        /* A classe .header (azul) só será aplicada se isOpen for verdadeiro */
        <header className={isOpen ? styles.header : styles.headerClosed}>
            <button type='button' onClick={toggleMenu} className={styles.menuButton}>
                <Image src={srcMenu} width={30} height={30} alt='Menu' priority />
            </button>

            {isOpen && (
                <nav className={styles.nav}>
                    <ul>
                        <li><Link href={menu[0]}>Home</Link></li>
                        <li><Link href={menu[1]}>Sobre</Link></li>
                        <li><Link href={menu[2]}>Contato</Link></li>
                    </ul>
                </nav>
            )}
        </header>
    );
}

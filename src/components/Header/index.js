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
        <div className={styles.container}>
            {/* O botão fica aqui em cima, sempre visível e fora da caixa azul */}
            <button type='button' onClick={toggleMenu} className={styles.menuButton}>
                <Image src={srcMenu} width={30} height={30} alt='Menu' priority />
            </button>

            {/* O header azul agora só renderiza e envolve a lista quando o menu abre */}
            {isOpen && (
                <header className={styles.header}>
                    <nav className={styles.nav}>
                        <ul>
                            <li><Link href={menu[0]}>Home</Link></li>
                            <li><Link href={menu[1]}>Sobre</Link></li>
                            <li><Link href={menu[2]}>Contato</Link></li>
                        </ul>
                    </nav>
                </header>
            )}
        </div>
    );
}

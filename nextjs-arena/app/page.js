'use client';


import Image from "next/image";
import styles from "./page.module.css";
import { useState, useEffect } from 'react';

export default function Home() {

  const [money, setMoney] = useState(100);

  return (
    <>
      <p>test</p>
      <button style={{ height: '500px', width: '200px' }} onClick={() => console.log(Math.random() * 54 - 33)}>
        Click Me!
      </button>

      {/* This Link automatically navigates to your new dashboard! */}
      <div style={{ marginTop: '30px' }}>
        <a 
          href="/dashboard"
          style={{ padding: '10px 20px', backgroundColor: 'blue', color: 'white', textDecoration: 'none', borderRadius: '5px' }}
        >
          Go to the Dashboard Strategy Page! {'>'}
        </a>
      </div>
    </>
  );
}

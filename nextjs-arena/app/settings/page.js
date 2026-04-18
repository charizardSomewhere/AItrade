'use client';
import { useState } from 'react';

export default function setting() {

    const [isDarkMode, setIsDarkMode] = useState(false);

    return (
        <div style={{ padding: '50px' }}>
            <h1 style={{ display: 'flex', justifyContent: 'center', marginTop: '5px' }}>Settings ⚙️</h1>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <button onClick={() => {
                    if (isDarkMode) {
                        document.documentElement.style.setProperty('--background', '#ffffff');
                        document.documentElement.style.setProperty('--foreground', '#000000'); // Make text black!
                        setIsDarkMode(false);
                    }
                    else {
                        document.documentElement.style.setProperty('--background', '#000000');
                        document.documentElement.style.setProperty('--foreground', '#ffffff'); // Make text white!
                        setIsDarkMode(true);
                    }
                }
                }>Toggle Theme</button>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '5px' }}>
                <label for="RR" style={{ marginRight: '10px' }}>Refresh Rate</label>
                <select name="RR" id="RR">
                    <option value="1">1 Seconds</option>
                    <option value="2">2 Seconds</option>
                    <option value="5">5 Seconds</option>
                </select>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '5px' }}>
                <label for="currency" style={{ marginRight: '10px' }}>Currency</label>
                <select name="currency" id="currency">
                    <option value="USD">USD</option>
                    <option value="CAD">CAD</option>
                    <option value="EUR">EUR</option>
                    <option value="JPY">JPY</option>
                    <option value="GBP">GBP</option>
                </select>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '5px' }}>
                <p style={{ marginRight: '10px' }}>Price Alert</p>
                <input placeholder='Notify at ___%'></input>
            </div>
        </div >
    );
}

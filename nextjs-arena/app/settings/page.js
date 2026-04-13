export default function setting() {
    return (
        <div style={{ padding: '50px' }}>
            <h1 style={{ display: 'flex', justifyContent: 'center' }}>Settings ⚙️</h1>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <button>Toggle Theme</button>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <label for="RR" style={{ marginRight: '10px' }}>Refresh Rate</label>
                <select name="RR" id="RR">
                    <option value="1">1 Seconds</option>
                    <option value="2">2 Seconds</option>
                    <option value="5">5 Seconds</option>
                </select>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <label for="currency" style={{ marginRight: '10px' }}>Currency</label>
                <select name="currency" id="currency">
                    <option value="USD">USD</option>
                    <option value="CAD">CAD</option>
                    <option value="EUR">EUR</option>
                    <option value="JPY">JPY</option>
                    <option value="GBP">GBP</option>
                </select>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <p style={{ marginRight: '10px' }}>Price Alert</p>
                <input placeholder='Notify at ___%'></input>
            </div>
        </div>
    );
}

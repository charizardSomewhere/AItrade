export default function Dashboard() {
  return (
    <div style={{ padding: '50px' }}>
      <h1>Welcome to the Dashboard! 🚀</h1>
      <p>You have successfully used Next.js File-Based Routing to create a brand new page!</p>
      
      <a 
        href="/" 
        style={{ 
          display: 'inline-block', 
          marginTop: '20px', 
          padding: '10px 20px', 
          backgroundColor: '#333', 
          color: 'white', 
          textDecoration: 'none',
          borderRadius: '5px'
        }}
      >
        Go back to Homepage
      </a>
    </div>
  );
}

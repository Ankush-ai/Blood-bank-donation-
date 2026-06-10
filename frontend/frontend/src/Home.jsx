const Home = () => {
  return (
    <div className="page-wrapper" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
      <div className="glass-card" style={{ maxWidth: '600px', textAlign: 'center' }}>
        <h1 style={{ fontSize: '2.5rem', color: 'var(--primary-color)' }}>Welcome to BloodBank</h1>
        <p style={{ fontSize: '1.2rem', marginTop: '1rem' }}>
          Save a life, donate blood. If you are a hospital, you can manage your blood inventory here. If you are a receiver, you can request the blood samples you need.
        </p>
      </div>
    </div>
  );
};

export default Home;
import { Link } from 'react-router-dom'

function NotFound() {
    return (
        <div style={{
            height: '80vh',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'center',
            backgroundColor: '#111',
            color: 'white'
        }}>
            <h1 style={{ fontSize: '6rem', color: '#FBD403', margin: 0 }}>404</h1>
            <h2 style={{ fontSize: '2rem', marginBottom: '2rem' }}>ROBOT NOT FOUND</h2>
            <p style={{ maxWidth: '400px', marginBottom: '3rem', color: '#ccc' }}>
                The page you are looking for might have been moved or does not exist.
            </p>
            <Link to="/" className="cta-button secondary" style={{ textDecoration: 'none', display: 'inline-block' }}>
                RETURN TO BASE
            </Link>
        </div>
    )
}

export default NotFound

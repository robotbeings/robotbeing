import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'

function Login({ setAuth }) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        setError('')

        try {
            const response = await fetch('http://localhost:5000/api/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            })

            const data = await response.json()

            if (response.ok) {
                localStorage.setItem('adminToken', data.token)
                localStorage.setItem('adminEmail', data.admin.email)
                setAuth(true)
                navigate('/admin')
            } else {
                setError(data.error || 'Login failed')
            }
        } catch (err) {
            setError('Failed to connect to server')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="login-page">
            <div className="login-card">
                <header>
                    <h2>Admin Login</h2>
                    <p>Enter your credentials to access the fleet.</p>
                </header>

                {error && <div className="login-error">{error}</div>}

                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Email Address</label>
                        <input
                            type="email"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            placeholder="name@example.com"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            placeholder="••••••••"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={loading}
                        className="btn-solid-primary"
                        style={{ width: '100%', padding: '1.2rem', borderRadius: '10px' }}
                    >
                        {loading ? 'AUTHENTICATING...' : 'ACCESS DASHBOARD'}
                    </button>
                </form>

                <div style={{ marginTop: '2rem' }}>
                    <Link to="/" className="text-link" style={{ fontSize: '0.9rem', fontWeight: '700' }}>&larr; BACK TO WEBSITE</Link>
                </div>
            </div>
        </div>
    )
}

export default Login

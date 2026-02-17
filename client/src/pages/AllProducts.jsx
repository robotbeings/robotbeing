import { useState, useEffect } from 'react'

import { Link, useLocation } from 'react-router-dom'

function AllProducts() {
    const [robots, setRobots] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [filteredRobots, setFilteredRobots] = useState([])
    const location = useLocation()

    useEffect(() => {
        window.scrollTo(0, 0)
        fetch(`${import.meta.env.VITE_API_URL}/api/robots`)
            .then(res => {
                if (!res.ok) throw new Error('Failed to fetch robots')
                return res.json()
            })
            .then(data => {
                if (Array.isArray(data)) {
                    setRobots(data)
                } else {
                    console.error('API returned non-array:', data)
                    setRobots([])
                }
                setLoading(false)
            })
            .catch(err => {
                console.error('Error fetching robots:', err)
                setError(err.message)
                setLoading(false)
            })
    }, [])

    useEffect(() => {
        const params = new URLSearchParams(location.search)
        const category = params.get('category')

        if (category && robots.length > 0) {
            // Case-insensitive filtering and handling partial matches if needed
            const filtered = robots.filter(robot =>
                robot.type && robot.type.toLowerCase().includes(category.toLowerCase()) ||
                robot.sub_category && robot.sub_category.toLowerCase().includes(category.toLowerCase())
            )
            setFilteredRobots(filtered)
        } else {
            setFilteredRobots(robots)
        }
    }, [location.search, robots])

    if (loading) return (
        <div style={{ padding: '4rem', textAlign: 'center', minHeight: '60vh' }}>
            <div style={{ fontSize: '1.5rem', color: '#666' }}>Loading products...</div>
        </div>
    )

    if (error) return (
        <div style={{ padding: '4rem', textAlign: 'center', minHeight: '60vh' }}>
            <div style={{ fontSize: '1.5rem', color: '#dc3545' }}>Error loading products: {error}</div>
        </div>
    )

    return (
        <div style={{ paddingTop: '80px', minHeight: '100vh', background: '#f8f9fa' }}>
            {/* Hero Section */}
            <div style={{
                background: 'linear-gradient(135deg, #0062cc 0%, #0096ff 100%)',
                padding: '4rem 2rem',
                textAlign: 'center',
                color: 'white',
                marginBottom: '4rem'
            }}>
                <h1 style={{
                    fontSize: '3rem',
                    fontWeight: '800',
                    marginBottom: '1rem',
                    textShadow: '0 2px 4px rgba(0,0,0,0.2)'
                }}>
                    Our Robot Fleet
                </h1>
                <p style={{ fontSize: '1.2rem', opacity: 0.9, maxWidth: '600px', margin: '0 auto' }}>
                    Explore our comprehensive range of advanced robotic solutions designed for every industry.
                </p>
            </div>

            {/* Products Grid */}
            <div className="container" style={{ paddingBottom: '6rem' }}>
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                    gap: '2.5rem'
                }}>
                    {filteredRobots.length > 0 ? (
                        filteredRobots.map(robot => (
                            <Link to="/pages/contact" key={robot.id} style={{ textDecoration: 'none', color: 'inherit' }}>
                                <div style={{
                                    background: 'white',
                                    borderRadius: '16px',
                                    overflow: 'hidden',
                                    boxShadow: '0 10px 30px rgba(0,0,0,0.05)',
                                    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                                    height: '100%',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    cursor: 'pointer'
                                }}
                                    onMouseEnter={e => {
                                        e.currentTarget.style.transform = 'translateY(-10px)'
                                        e.currentTarget.style.boxShadow = '0 20px 40px rgba(0,0,0,0.1)'
                                    }}
                                    onMouseLeave={e => {
                                        e.currentTarget.style.transform = 'translateY(0)'
                                        e.currentTarget.style.boxShadow = '0 10px 30px rgba(0,0,0,0.05)'
                                    }}
                                >
                                    <div style={{
                                        position: 'relative',
                                        height: '240px',
                                        overflow: 'hidden',
                                        background: '#f1f3f5'
                                    }}>
                                        {robot.image_url ? (
                                            <img
                                                src={robot.image_url}
                                                alt={robot.name}
                                                style={{
                                                    width: '100%',
                                                    height: '100%',
                                                    objectFit: 'cover',
                                                    transition: 'transform 0.5s ease'
                                                }}
                                            />
                                        ) : (
                                            <div style={{
                                                width: '100%',
                                                height: '100%',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                color: '#bbb',
                                                fontSize: '3rem'
                                            }}>
                                                🤖
                                            </div>
                                        )}
                                        <div style={{
                                            position: 'absolute',
                                            top: '1rem',
                                            right: '1rem',
                                            background: 'rgba(255,255,255,0.9)',
                                            padding: '4px 12px',
                                            borderRadius: '20px',
                                            fontSize: '0.8rem',
                                            fontWeight: '700',
                                            color: '#0062cc',
                                            boxShadow: '0 4px 10px rgba(0,0,0,0.1)'
                                        }}>
                                            {robot.type}
                                        </div>
                                    </div>

                                    <div style={{ padding: '1.5rem', flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                                        <h3 style={{
                                            fontSize: '1.4rem',
                                            fontWeight: '700',
                                            marginBottom: '0.5rem',
                                            color: '#1a1a1a'
                                        }}>
                                            {robot.name}
                                        </h3>
                                        <p style={{
                                            fontSize: '0.9rem',
                                            color: '#666',
                                            marginBottom: '1.5rem',
                                            lineHeight: '1.6',
                                            display: '-webkit-box',
                                            WebkitLineClamp: '3',
                                            WebkitBoxOrient: 'vertical',
                                            overflow: 'hidden'
                                        }}>
                                            {robot.description}
                                        </p>
                                        <div style={{ marginTop: 'auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                            <span style={{
                                                fontSize: '0.85rem',
                                                fontWeight: '600',
                                                color: '#888',
                                                background: '#f8f9fa',
                                                padding: '6px 12px',
                                                borderRadius: '6px'
                                            }}>
                                                {robot.sub_category}
                                            </span>
                                            <span style={{
                                                color: '#0062cc',
                                                fontWeight: '700',
                                                fontSize: '0.9rem'
                                            }}>
                                                CONTACT FOR DETAILS &rarr;
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))
                    ) : (
                        <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '4rem', color: '#666' }}>
                            <p style={{ fontSize: '1.2rem' }}>No robots found in the fleet.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default AllProducts

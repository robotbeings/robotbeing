import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'

function ProductDetails() {
    const { id } = useParams()
    const [robot, setRobot] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetch(`${import.meta.env.VITE_API_URL}/api/robots/${id}`)
            .then(res => res.json())
            .then(data => {
                setRobot(data)
                setLoading(false)
            })
            .catch(err => {
                console.error("Failed to fetch robot:", err)
                setLoading(false)
            })
    }, [id])

    if (loading) return <div className="loading-screen">Loading details...</div>
    if (!robot) return <div className="error-screen">Robot not found.</div>

    return (
        <div className="product-details-page">
            <div className="product-hero">
                <div className="product-hero-inner">
                    <div className="product-hero-content">
                        <span className="product-type">{robot.type}</span>
                        <h1>{robot.name.toUpperCase()}</h1>
                        <p>{robot.description}</p>
                    </div>
                    <div className="product-hero-image">
                        {(robot.image_url || robot.imageUrl) ? (
                            <img src={robot.image_url || robot.imageUrl} alt={robot.name} />
                        ) : (
                            <div className="placeholder-large">{robot.name[0]}</div>
                        )}
                    </div>
                </div>
            </div>

            {/* Specs section removed as per user request */}

            <div style={{ textAlign: 'center', margin: '2rem 0' }}>
                <Link to="/pages/contact" className="cta-button primary" style={{ textDecoration: 'none', display: 'inline-block', padding: '12px 24px', fontSize: '1.1rem' }}>CONTACT FOR DETAILS</Link>
            </div>

            <div className="back-nav">
                <Link to="/" className="text-link">&larr; BACK TO FLEET</Link>
            </div>
        </div>
    )
}

export default ProductDetails

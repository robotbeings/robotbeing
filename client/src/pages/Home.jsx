import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

function Home() {
    const [robots, setRobots] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetch(`${import.meta.env.VITE_API_URL}/api/robots`)
            .then(res => res.json())
            .then(data => {
                // Filter to show only 'Rental' items as requested
                const rentalRobots = Array.isArray(data)
                    ? data.filter(robot => robot.sub_category === 'Rental')
                    : [];
                setRobots(rentalRobots)
                setLoading(false)
            })
            .catch(err => {
                console.error("Failed to fetch robots:", err)
                setLoading(false)
            })
    }, [])

    return (
        <div className="home-container">
            <section className="hero">
                <div className="hero-content">
                    <h1>CHANGING YOUR IDEA<br />OF WHAT ROBOTS CAN DO.</h1>
                    <p className="hero-subtitle">Advanced mobility, dexterity, and intelligence.</p>
                    <div className="hero-actions">

                        <Link to="/pages/contact" className="cta-button secondary" style={{ textDecoration: 'none' }}>CONTACT FOR DETAILS</Link>
                    </div>
                </div>
            </section>

            <section id="robots" className="products-section">
                <div className="container">
                    <div className="section-header">
                        <h2>OUR ROBOTS</h2>
                        <div className="yellow-bar"></div>
                    </div>

                    {loading ? (
                        <div className="loading">Loading fleet data...</div>
                    ) : (
                        <div className="products-grid">
                            {robots.map(robot => (
                                <div key={robot.id} className="robot-card" onClick={() => window.location.href = `/robots/${robot.id}`}>
                                    <div className="card-image-container">
                                        {(robot.image_url || robot.imageUrl) ? (
                                            <img
                                                src={robot.image_url || robot.imageUrl}
                                                alt={robot.name}
                                                loading="lazy"
                                            />
                                        ) : (
                                            <div className="card-image-placeholder">
                                                <span>{robot.name.toUpperCase()}</span>
                                            </div>
                                        )}
                                    </div>
                                    <div className="card-content">
                                        <h3>{robot.name}</h3>
                                        <div className="tags">
                                            <span className="tag">{robot.type}</span>
                                        </div>
                                        <p>{robot.description}</p>
                                        <Link to="/pages/contact" className="text-link">CONTACT FOR DETAILS &rarr;</Link>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </section>

            <section className="solutions-section">
                <div className="container">
                    <div className="section-header white">
                        <h2>SOLUTIONS</h2>
                        <div className="yellow-bar"></div>
                    </div>
                    <div className="solutions-grid">
                        <div className="solution-card">
                            <div className="solution-image-container">
                                <img src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80" alt="Inspection" />
                            </div>
                            <h3>Inspection & Monitoring</h3>
                            <Link to="/pages/inspection" className="arrow-link">Learn More &rarr;</Link>
                        </div>
                        <div className="solution-card">
                            <div className="solution-image-container">
                                <img src="https://images.unsplash.com/photo-1581090464777-f3220bbe1b8b?auto=format&fit=crop&w=800&q=80" alt="Digital Twin" />
                            </div>
                            <h3>Digital Simulation (Digital Twin)</h3>
                            <Link to="/pages/construction" className="arrow-link">Learn More &rarr;</Link>
                        </div>
                        <div className="solution-card">
                            <div className="solution-image-container">
                                <img src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=80" alt="Warehouse Automation" />
                            </div>
                            <h3>Automated Warehousing Systems</h3>
                            <Link to="/pages/logistics" className="arrow-link">Learn More &rarr;</Link>
                        </div>
                    </div>
                </div>
            </section>

            <section className="news-section">
                <div className="container">
                    <div className="section-header">
                        <h2>IN THE NEWS</h2>
                        <div className="yellow-bar"></div>
                    </div>
                    <div className="news-grid">
                        <div className="news-item">
                            <div className="news-image news-1"></div>
                            <div className="news-content">
                                <span className="news-date">OCTOBER 15, 2025</span>
                                <h3>Next-Gen Humanoids</h3>
                                <p>Our latest humanoid models are setting new records in bipedal agility and manual dexterity.</p>
                                <a href="#" className="read-more">READ STORY &rarr;</a>
                            </div>
                        </div>
                        <div className="news-item">
                            <div className="news-image news-2"></div>
                            <div className="news-content">
                                <span className="news-date">SEPTEMBER 28, 2025</span>
                                <h3>Aerial Inspection Breakthroughs</h3>
                                <p>Advanced drone sensors now allow for sub-millimeter Crack detection in critical infrastructure.</p>
                                <a href="#" className="read-more">READ STORY &rarr;</a>
                            </div>
                        </div>
                        <div className="news-item">
                            <div className="news-image news-3"></div>
                            <div className="news-content">
                                <span className="news-date">AUGUST 10, 2025</span>
                                <h3>Smart Home Ecosystem Growth</h3>
                                <p>Celebrating a milestone of 10,000 integrated AI security systems deployed in residential areas.</p>
                                <a href="#" className="read-more">READ STORY &rarr;</a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>


        </div>
    )
}

export default Home

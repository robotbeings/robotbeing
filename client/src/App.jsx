import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom'
import Home from './pages/Home'
import ProductDetails from './pages/ProductDetails'
import Admin from './pages/Admin'
import GenericPage from './pages/GenericPage'
import Contact from './pages/Contact'
import Login from './pages/Login'
import NotFound from './pages/NotFound'
import { Navigate } from 'react-router-dom'
import SearchModal from './components/SearchModal'
import AllProducts from './pages/AllProducts'
// import logo from './assets/logo.jpg'; // Make sure to save the image as logo.jpg in the assets folder
const logo = "https://static.vecteezy.com/system/resources/previews/012/111/017/non_2x/robot-icon-illustration-free-vector.jpg";

const navData = {
    Products: {
        items: [
            {
                name: 'Humanoid Robots',
                path: '/all-products?category=Humanoid',
                desc: 'Advanced bipedal robots for multi-purpose applications',
                features: [
                    { title: 'Rental', desc: 'Flexible robot rental solutions for various durations', path: '/pages/humanoid-rental' },
                    { title: 'Expos', desc: 'Engaging robots for exhibitions and trade shows', path: '/pages/humanoid-expos' },
                    { title: 'Events', desc: 'Interactive solutions for corporate and private events', path: '/pages/humanoid-events' },
                    { title: 'Agriculture', desc: 'Autonomous robotics for precision farming', path: '/pages/humanoid-agriculture' }
                ]
            },
            {
                name: 'Driverless Car',
                path: '/pages/driverless',
                desc: 'Autonomous vehicles for safe and efficient transportation',
                features: [
                    { title: 'Rental', desc: 'Flexible autonomous vehicle rental solutions', path: '/pages/driverless-rental' }
                ]
            },
            {
                name: 'Electronics Gadgets',
                path: '/all-products?category=Electronics',
                desc: 'Latest electronic devices for personal and professional use',
                features: [
                    { title: 'Mobile', desc: 'Latest smartphones and accessories', path: '/pages/mobile' },
                    { title: 'Laptop', desc: 'High-performance laptops for work and play', path: '/pages/laptop' }
                ]
            },
            {
                name: 'Essential',
                path: '/all-products?category=Essential',
                desc: 'Smart home robots for everyday convenience',
                features: [
                    { title: 'Robot Vacuum Cleaner', desc: 'Automated floor cleaning', path: '/pages/robot-vacuum' },
                    { title: 'Robot Mop', desc: 'Efficient automated mopping', path: '/pages/robot-mop' },
                    { title: 'Kitchen Cooking Robot', desc: 'Automated meal preparation', path: '/pages/kitchen-robot' }
                ]
            },
            {
                name: 'Security Gadgets',
                path: '/all-products?category=Security',
                desc: 'Smart security solutions for home and enterprise',
                features: [
                    { title: 'AI Powered Cameras', desc: 'High-definition surveillance with real-time object recognition', path: '/pages/security-cameras' },
                    { title: 'Autonomous Threat Detection', desc: 'Predictive analytics to identify and alert on security risks', path: '/pages/security-threat-detection' },
                    { title: 'Agentic & Specialized AI Security', desc: 'Advanced AI agents for proactive site protection', path: '/pages/security-agentic' }
                ]
            },
            {
                name: 'Drones',
                path: '/all-products?category=Drone',
                desc: 'High-performance aerial vehicles for surveillance and inspection',
                features: [
                    { title: 'Agriculture', desc: 'Crop monitoring and aerial spraying solutions', path: '/pages/drone-agriculture' },
                    { title: 'Land Survey', desc: 'Precise topographical mapping and site analysis', path: '/pages/drone-survey' },
                    { title: 'Education', desc: 'Educational kits and platforms for future pilots', path: '/pages/drone-education' },
                    { title: 'Media', desc: 'Cinema-grade aerial photography and videography', path: '/pages/drone-media' }
                ]
            }
        ],
        action: "Explore All Products",
        actionLink: "/all-products"
    },
    Solutions: {
        items: [
            {
                name: 'Inspection & Monitoring',
                path: '/pages/inspection',
                desc: 'Automate industrial inspection',
                features: [
                    { title: 'Thermal', desc: 'Detect hotspots and thermal anomalies' },
                    { title: 'Visual', desc: 'Perform visual inspections and integrate computer vision' },
                    { title: 'Acoustic', desc: 'Listen for air leaks and other noise anomalies' },
                    { title: 'Perimeter', desc: 'Automate routine health and safety checks' }
                ]
            },
            { name: 'Safety Management & Emergency Response', path: '/pages/safety-response', desc: 'Remove people from dangerous environments' },
            { name: 'Digital Simulation (Digital Twin)', path: '/pages/construction', desc: 'Create and maintain digital models of physical assets' },
            { name: 'Automated Warehousing Systems', path: '/pages/logistics', desc: 'Streamline box moving operations' },
            { name: 'Research & Innovation', path: '/pages/research', desc: 'Advance robotics research' }
        ],
        action: "Explore All Solutions"
    },
    Industries: {
        type: 'grid',
        items: [
            { name: 'Hotel', path: '/pages/hotel', desc: 'Enhance guest experiences with service robots' },
            { name: 'Construction', path: '/pages/construction', desc: 'Power comprehensive job site visibility' },
            { name: 'Education', path: '/pages/academia', desc: 'Explore innovations and opportunities for robotics' },
            { name: 'Logistics', path: '/pages/logistics', desc: 'Automate inbound warehouse tasks' }
        ],
        action: "Industries Overview"
    },

    Company: {
        items: [
            { name: 'Careers', path: '/pages/careers', desc: 'Join our team' },
            { name: 'Code of Conduct', path: '/pages/ethics', desc: 'Our commitment to responsible robotics' },
            { name: 'Latest Updates', path: '/pages/news', desc: 'Latest updates and press releases' },
            { name: 'Our Collaborators', path: '/pages/partners', desc: 'Our partner ecosystem' }
        ],
        action: "Learn More"
    },
    Resources: {
        type: 'grid',
        items: [
            { name: 'Blogs', path: '/pages/news', desc: 'Stay up-to-date on the latest robotics trends and industry insights' },
            { name: 'Videos', path: '/pages/videos', desc: 'Watch Robot Being robots in action' }
        ],
        action: "Resources Overview"
    }
}

function Layout() {
    const location = useLocation()
    const isCleanPage = location.pathname.startsWith('/admin') || location.pathname === '/login'

    const [activeMenu, setActiveMenu] = useState(null)
    const [activeSubItem, setActiveSubItem] = useState(0)
    const [activeSubMenu, setActiveSubMenu] = useState(null) // For 3rd level mobile menu
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const [searchOpen, setSearchOpen] = useState(false)
    const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('adminToken'))

    const handleLogout = () => {
        localStorage.removeItem('adminToken');
        localStorage.removeItem('adminEmail');
        setIsAuthenticated(false);
    };

    const handleMenuHover = (menu) => {
        if (activeMenu !== menu) {
            setActiveMenu(menu)
            setActiveSubItem(0) // Reset sub-selection only when switching main categories
        }
    }

    const handleMouseLeave = () => {
        setActiveMenu(null)
    }

    return (
        <div className="app-container">
            {!isCleanPage && (
                <header className="main-header" onMouseLeave={handleMouseLeave}>
                    <div className="container header-content">
                        <div className="header-left">
                            <Link to="/" className="logo">
                                <img src={logo} alt="Robot Being" />
                                <span className="logo-text">Robot Being</span>
                            </Link>
                            <nav className="main-nav">
                                {Object.keys(navData).map(key => (
                                    <Link
                                        key={key}
                                        to={`/pages/${key.toLowerCase()}`}
                                        className={activeMenu === key ? 'active' : ''}
                                        onMouseEnter={() => handleMenuHover(key)}
                                    >
                                        {key}
                                    </Link>
                                ))}
                            </nav>
                        </div>
                        <div className="header-right">
                            <nav className="utility-nav">
                                <button className="search-icon" onClick={() => setSearchOpen(true)} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '1.2rem' }}>🔍</button>
                                <Link to="/pages/contact" className="nav-cta">Contact</Link>

                            </nav>
                        </div>
                    </div>

                    {/* Mega Menu Overlay */}
                    {activeMenu && navData[activeMenu] && (
                        <div className="mega-menu" onMouseEnter={() => setActiveMenu(activeMenu)}>
                            <div className="mega-menu-content">
                                {navData[activeMenu].type === 'grid' ? (
                                    /* Grid Layout (Industries) */
                                    <div className="menu-grid-layout">
                                        <div className="grid-header">
                                            <h3>{activeMenu}</h3>
                                            <Link to={navData[activeMenu].actionLink || `/pages/${activeMenu.toLowerCase()}`} className="view-all-link" onClick={() => setActiveMenu(null)}>{navData[activeMenu].action} &rarr;</Link>
                                        </div>
                                        <div className="grid-items">
                                            {navData[activeMenu].items.map((item, idx) => (
                                                <div key={idx} className="grid-item">
                                                    <h4><Link to={item.path || '#'} style={{ color: 'inherit', textDecoration: 'none' }}>{item.name}</Link></h4>
                                                    <p>{item.desc}</p>
                                                    <Link to={item.path || '#'} className="read-more" onClick={() => setActiveMenu(null)}>Read More &rarr;</Link>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                ) : (
                                    /* Split Layout (Products, Solutions, etc) */
                                    <div className="menu-split-layout">
                                        <div className="menu-sidebar">
                                            <ul>
                                                {navData[activeMenu].items.map((item, idx) => (
                                                    <li
                                                        key={idx}
                                                        onMouseEnter={() => setActiveSubItem(idx)}
                                                        className={activeSubItem === idx ? 'active' : ''}
                                                    >
                                                        <Link to={item.path || '#'} style={{ color: 'inherit', textDecoration: 'none', width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }} onClick={() => setActiveMenu(null)}>
                                                            {item.name}
                                                            <span className="arrow">{activeSubItem === idx ? '›' : '→'}</span>
                                                        </Link>
                                                    </li>
                                                ))}
                                            </ul>
                                            <div className="sidebar-footer">
                                                <Link to={navData[activeMenu].actionLink || `/pages/${activeMenu.toLowerCase()}`} className="view-button" onClick={() => setActiveMenu(null)}>{navData[activeMenu].action} &rarr;</Link>
                                            </div>
                                        </div>
                                        <div className="menu-details">
                                            {navData[activeMenu].items[activeSubItem] && (
                                                <div className="details-content">
                                                    <h3>{navData[activeMenu].items[activeSubItem].name}</h3>
                                                    <p className="main-desc">{navData[activeMenu].items[activeSubItem].desc}</p>
                                                    <Link to={navData[activeMenu].items[activeSubItem].path || '#'} className="read-more-main" onClick={() => setActiveMenu(null)}>Read More &rarr;</Link>

                                                    {navData[activeMenu].items[activeSubItem].features && (
                                                        <div className="features-grid">
                                                            {navData[activeMenu].items[activeSubItem].features.map((feat, fIdx) => (
                                                                <div key={fIdx} className="feature-item">
                                                                    <h5>{feat.title}</h5>
                                                                    <p>{feat.desc}</p>
                                                                    <Link to={feat.path || navData[activeMenu].items[activeSubItem].path || '#'} className="read-more-small" onClick={() => setActiveMenu(null)}>Read More &rarr;</Link>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    )}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}

                    {/* Mobile Menu Toggle */}
                    <button className="mobile-menu-toggle" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                        <div className={`hamburger ${mobileMenuOpen ? 'open' : ''}`}>
                            <span></span>
                            <span></span>
                            <span></span>
                        </div>
                    </button>

                    {/* Mobile Menu Overlay */}
                    <div className={`mobile-menu ${mobileMenuOpen ? 'open' : ''}`}>
                        <nav className="mobile-nav">
                            {Object.keys(navData).map(key => (
                                <div key={key} className="mobile-nav-item">
                                    <div
                                        className="mobile-nav-header"
                                        onClick={() => {
                                            if (navData[key].items) {
                                                setActiveMenu(activeMenu === key ? null : key);
                                            } else {
                                                setMobileMenuOpen(false);
                                            }
                                        }}
                                    >
                                        <Link
                                            to={navData[key].items ? '#' : `/pages/${key.toLowerCase()}`}
                                            className="mobile-nav-link"
                                            onClick={(e) => {
                                                if (navData[key].items) {
                                                    e.preventDefault();
                                                }
                                            }}
                                        >
                                            {key}
                                        </Link>
                                        {navData[key].items && (
                                            <span className={`mobile-arrow ${activeMenu === key ? 'open' : ''}`}>&#9662;</span>
                                        )}
                                    </div>

                                    {/* Submenu for items with subcategories */}
                                    {navData[key].items && (
                                        <div className={`mobile-submenu ${activeMenu === key ? 'open' : ''}`}>
                                            {navData[key].items.map((item, idx) => (
                                                <div key={idx} className="mobile-sub-item">
                                                    <div
                                                        className="mobile-sub-header"
                                                        onClick={() => {
                                                            if (item.features) {
                                                                setActiveSubMenu(activeSubMenu === item.name ? null : item.name);
                                                            } else {
                                                                setMobileMenuOpen(false);
                                                                setActiveMenu(null);
                                                                setActiveSubMenu(null);
                                                            }
                                                        }}
                                                    >
                                                        <Link
                                                            to={item.features ? '#' : (item.path || '#')}
                                                            className="mobile-sub-link"
                                                            onClick={(e) => {
                                                                if (item.features) {
                                                                    e.preventDefault();
                                                                }
                                                            }}
                                                        >
                                                            {item.name}
                                                        </Link>
                                                        {item.features && (
                                                            <span className={`mobile-arrow-small ${activeSubMenu === item.name ? 'open' : ''}`}>&#9662;</span>
                                                        )}
                                                    </div>

                                                    {/* 3rd Level: Features */}
                                                    {item.features && (
                                                        <div className={`mobile-feature-menu ${activeSubMenu === item.name ? 'open' : ''}`}>
                                                            {item.features.map((feature, fIdx) => (
                                                                <Link
                                                                    key={fIdx}
                                                                    to={feature.path || item.path || '#'}
                                                                    className="mobile-feature-link"
                                                                    onClick={() => {
                                                                        setMobileMenuOpen(false);
                                                                        setActiveMenu(null);
                                                                        setActiveSubMenu(null);
                                                                    }}
                                                                >
                                                                    {feature.title}
                                                                </Link>
                                                            ))}
                                                        </div>
                                                    )}
                                                </div>
                                            ))}
                                            <Link
                                                to={navData[key].actionLink || `/pages/${key.toLowerCase()}`}
                                                className="mobile-sub-link view-all"
                                                onClick={() => {
                                                    setMobileMenuOpen(false);
                                                    setActiveMenu(null);
                                                    setActiveSubMenu(null);
                                                }}
                                            >
                                                {navData[key].action} &rarr;
                                            </Link>
                                        </div>
                                    )}
                                </div>
                            ))}
                            <div className="mobile-utility">
                                <Link to="/pages/contact" className="mobile-cta" onClick={() => setMobileMenuOpen(false)}>Contact</Link>
                            </div>
                        </nav>
                    </div>
                </header>
            )}

            <main>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login setAuth={setIsAuthenticated} />} />
                    <Route
                        path="/admin"
                        element={isAuthenticated ? <Admin onLogout={handleLogout} /> : <Navigate to="/login" />}
                    />
                    <Route path="/robots/:id" element={<ProductDetails />} />
                    <Route path="/all-products" element={<AllProducts />} />
                    <Route path="/pages/contact" element={<Contact />} />
                    <Route path="/pages/:slug" element={<GenericPage />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </main>

            {!isCleanPage && (
                <footer>
                    <div className="footer-content" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: '2rem' }}>
                        <div className="footer-col" style={{ alignItems: 'center' }}>
                            <h4 style={{ marginBottom: '1.5rem', color: '#999', fontSize: '1rem', letterSpacing: '2px' }}>CONTACT DETAILS</h4>
                            <div className="footer-contact-links" style={{ display: 'flex', gap: '2.5rem', flexWrap: 'wrap', justifyContent: 'center' }}>
                                <a href="mailto:robotbeings@gmail.com" style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', color: 'white', textDecoration: 'none', transition: 'color 0.3s' }} className="footer-contact-item">
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                                    robotbeings@gmail.com
                                </a>
                                <a href="tel:+919787935560" style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', color: 'white', textDecoration: 'none', transition: 'color 0.3s' }} className="footer-contact-item">
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                                    +91 9787935560
                                </a>
                                <a href="https://wa.me/919787935560" target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', color: 'white', textDecoration: 'none', transition: 'color 0.3s' }} className="footer-contact-item">
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.066 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" /></svg>
                                    WhatsApp
                                </a>
                            </div>


                        </div>
                        <div className="footer-col copyright" style={{ width: '100%', borderTop: '1px solid #333', paddingTop: '1.5rem' }}>
                            <p style={{ color: '#666', fontSize: '0.85rem' }}>&copy; 2026 Robot Being. All rights reserved.</p>
                        </div>
                    </div>
                </footer>
            )}

            {!isCleanPage && (
                <>
                    <a
                        href="https://wa.me/919787935560"
                        className="whatsapp-float"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="30"
                            height="30"
                            viewBox="0 0 24 24"
                            fill="white"
                        >
                            <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
                        </svg>
                    </a>

                    <a
                        href="tel:+919787935560"
                        className="enquire-now-float"
                    >
                        ENQUIRY
                    </a>
                </>
            )}
            <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
        </div>
    )
}

function App() {
    return (
        <Router>
            <Layout />
        </Router>
    )
}

export default App

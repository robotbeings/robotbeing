import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

function Admin({ onLogout }) {
    const token = localStorage.getItem('adminToken')

    // Tab state
    const [activeTab, setActiveTab] = useState('fleet') // 'fleet', 'content', 'contacts'

    // Fleet Management State
    const categories = [
        'Humanoid Robots',
        'Driverless Car',
        'Electronics Gadgets',
        'Essential',
        'Security Gadgets',
        'Drones'
    ]

    const categoryMapping = {
        'Humanoid Robots': ['General', 'Rental', 'Expos', 'Events', 'Agriculture'],
        'Driverless Car': ['General', 'Rental'],
        'Electronics Gadgets': ['General', 'Mobile', 'Laptop'],
        'Essential': ['General', 'Robot Vacuum Cleaner', 'Robot Mop', 'Kitchen Cooking Robot'],
        'Security Gadgets': ['General', 'AI Powered Cameras', 'Autonomous Threat Detection', 'Agentic & Specialized AI Security'],
        'Drones': ['General', 'Agriculture', 'Land Survey', 'Education', 'Media']
    }

    const [robots, setRobots] = useState([])
    const [robotForm, setRobotForm] = useState({
        name: '',
        type: categories[0],
        sub_category: categoryMapping[categories[0]][0],
        description: '',
        image_url: ''
    })

    // Messages
    const [msg, setMsg] = useState('')

    useEffect(() => {
        fetchRobots()
    }, [])

    // =====================================================
    // FLEET MANAGEMENT FUNCTIONS
    // =====================================================

    const fetchRobots = () => {
        fetch('http://localhost:5000/api/robots')
            .then(res => res.json())
            .then(data => {
                if (Array.isArray(data)) {
                    setRobots(data);
                } else {
                    console.error('API returned non-array:', data);
                    setMsg('Error loading robots: ' + (data.error || 'Unknown error'));
                }
            })
            .catch(err => console.error(err))
    }

    const handleDeleteRobot = (id) => {
        if (!window.confirm("Are you sure?")) return

        fetch(`http://localhost:5000/api/robots/${id}`, {
            method: 'DELETE',
            headers: { 'Authorization': `Bearer ${token}` }
        })
            .then(res => res.json())
            .then(() => {
                setMsg('Robot deleted.')
                fetchRobots()
            })
    }

    const handleRobotSubmit = (e) => {
        e.preventDefault()

        fetch('http://localhost:5000/api/robots', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(robotForm)
        })
            .then(async res => {
                const data = await res.json()
                if (!res.ok) {
                    throw new Error(data.error || 'Failed to add robot')
                }
                return data
            })
            .then(() => {
                setMsg('Robot added successfully')
                setRobotForm({
                    name: '',
                    type: categories[0],
                    sub_category: categoryMapping[categories[0]][0],
                    description: '',
                    image_url: ''
                })
                fetchRobots()
            })
            .catch(err => {
                console.error(err)
                setMsg(err.message)
            })
    }



    // =====================================================
    // RENDER FUNCTIONS
    // =====================================================

    const renderFleetTab = () => (
        <div>
            <h2 style={{ fontSize: '1.8rem', fontWeight: '800', marginBottom: '2rem', color: 'var(--color-black)' }}>
                ROBOT FLEET MANAGEMENT
            </h2>

            {/* Add Robot Form */}
            <div style={{
                background: '#f8f9fa',
                padding: '2rem',
                borderRadius: '12px',
                marginBottom: '3rem',
                border: '1px solid #e1e8f0'
            }}>
                <h3 style={{ fontSize: '1.2rem', fontWeight: '700', marginBottom: '1.5rem' }}>Add New Robot</h3>
                <form onSubmit={handleRobotSubmit}>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                        <div className="form-group">
                            <label>Name</label>
                            <input
                                type="text"
                                value={robotForm.name}
                                onChange={e => setRobotForm({ ...robotForm, name: e.target.value })}
                                required
                                style={{
                                    width: '100%',
                                    background: '#fbfcfe',
                                    border: '1px solid #e1e8f0',
                                    padding: '12px 18px',
                                    fontSize: '0.95rem',
                                    borderRadius: '8px',
                                    color: 'var(--color-black)'
                                }}
                            />
                        </div>
                        <div className="form-group">
                            <label>Type / Category</label>
                            <select
                                value={robotForm.type}
                                onChange={e => {
                                    const newType = e.target.value;
                                    const newSubCategories = categoryMapping[newType] || ['General'];
                                    setRobotForm({
                                        ...robotForm,
                                        type: newType,
                                        sub_category: newSubCategories[0]
                                    });
                                }}
                                required
                                style={{
                                    width: '100%',
                                    background: '#fbfcfe',
                                    border: '1px solid #e1e8f0',
                                    padding: '12px 18px',
                                    fontSize: '0.95rem',
                                    borderRadius: '8px',
                                    color: 'var(--color-black)'
                                }}
                            >
                                {categories.map(cat => (
                                    <option key={cat} value={cat}>{cat}</option>
                                ))}
                            </select>
                        </div>
                        <div className="form-group">
                            <label>Usage / Sub-Category</label>
                            <select
                                value={robotForm.sub_category}
                                onChange={e => setRobotForm({ ...robotForm, sub_category: e.target.value })}
                                required
                                style={{
                                    width: '100%',
                                    background: '#fbfcfe',
                                    border: '1px solid #e1e8f0',
                                    padding: '12px 18px',
                                    fontSize: '0.95rem',
                                    borderRadius: '8px',
                                    color: 'var(--color-black)'
                                }}
                            >
                                {(categoryMapping[robotForm.type] || ['General']).map(sub => (
                                    <option key={sub} value={sub}>{sub}</option>
                                ))}
                            </select>
                        </div>
                        <div className="form-group">
                            <label>Image URL</label>
                            <input
                                type="url"
                                value={robotForm.image_url}
                                onChange={e => setRobotForm({ ...robotForm, image_url: e.target.value })}
                                style={{
                                    width: '100%',
                                    background: '#fbfcfe',
                                    border: '1px solid #e1e8f0',
                                    padding: '12px 18px',
                                    fontSize: '0.95rem',
                                    borderRadius: '8px',
                                    color: 'var(--color-black)'
                                }}
                            />
                        </div>
                    </div>
                    <div className="form-group" style={{ marginTop: '1.5rem' }}>
                        <label>Description</label>
                        <textarea
                            value={robotForm.description}
                            onChange={e => setRobotForm({ ...robotForm, description: e.target.value })}
                            required
                            rows="3"
                            style={{
                                width: '100%',
                                background: '#fbfcfe',
                                border: '1px solid #e1e8f0',
                                padding: '12px 18px',
                                fontSize: '0.95rem',
                                borderRadius: '8px',
                                color: 'var(--color-black)',
                                fontFamily: 'inherit'
                            }}
                        />
                    </div>
                    <button type="submit" className="btn-primary" style={{
                        marginTop: '1rem',
                        background: 'var(--color-primary)',
                        color: 'white',
                        padding: '12px 32px',
                        border: 'none',
                        borderRadius: '8px',
                        fontWeight: '700',
                        cursor: 'pointer',
                        fontSize: '0.95rem',
                        textTransform: 'uppercase',
                        letterSpacing: '0.5px'
                    }}>
                        Add Robot
                    </button>
                </form>
            </div>

            {/* Robot List */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '2rem' }}>
                {robots.map(robot => (
                    <div key={robot.id} style={{
                        background: 'white',
                        borderRadius: '12px',
                        overflow: 'hidden',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                        border: '1px solid #e1e8f0'
                    }}>
                        {robot.image_url && (
                            <img src={robot.image_url} alt={robot.name} style={{
                                width: '100%',
                                height: '200px',
                                objectFit: 'cover'
                            }} />
                        )}
                        <div style={{ padding: '1.5rem' }}>
                            <h3 style={{ fontSize: '1.2rem', fontWeight: '700', marginBottom: '0.5rem' }}>{robot.name}</h3>
                            <p style={{ fontSize: '0.85rem', color: '#666', marginBottom: '0.5rem' }}>
                                <strong>Type:</strong> {robot.type}
                            </p>
                            <p style={{ fontSize: '0.85rem', color: '#666', marginBottom: '0.5rem' }}>
                                <strong>Usage:</strong> {robot.sub_category}
                            </p>
                            <p style={{ fontSize: '0.9rem', color: '#444', marginBottom: '1rem' }}>{robot.description}</p>
                            <button
                                onClick={() => handleDeleteRobot(robot.id)}
                                style={{
                                    background: '#dc3545',
                                    color: 'white',
                                    padding: '8px 20px',
                                    border: 'none',
                                    borderRadius: '6px',
                                    fontWeight: '600',
                                    cursor: 'pointer',
                                    fontSize: '0.85rem'
                                }}
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )



    return (
        <div style={{
            minHeight: '100vh',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            padding: '4rem 2rem'
        }}>
            <div style={{
                maxWidth: '1400px',
                margin: '0 auto',
                background: 'white',
                borderRadius: '16px',
                padding: '3rem',
                boxShadow: '0 20px 60px rgba(0,0,0,0.3)'
            }}>
                {/* Header */}
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '3rem',
                    paddingBottom: '2rem',
                    borderBottom: '2px solid #e1e8f0'
                }}>
                    <div>
                        <h1 style={{
                            fontSize: '2.5rem',
                            fontWeight: '900',
                            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            marginBottom: '0.5rem'
                        }}>
                            ADMIN PANEL
                        </h1>
                        <p style={{ color: '#666', fontSize: '0.95rem' }}>Manage your website content and robot fleet</p>
                    </div>
                    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                        <Link to="/" style={{
                            color: 'var(--color-primary)',
                            textDecoration: 'none',
                            fontWeight: '700',
                            fontSize: '0.9rem'
                        }}>
                            ← Back to Site
                        </Link>
                        <button onClick={onLogout} style={{
                            background: '#dc3545',
                            color: 'white',
                            padding: '10px 24px',
                            border: 'none',
                            borderRadius: '8px',
                            fontWeight: '700',
                            cursor: 'pointer',
                            fontSize: '0.9rem'
                        }}>
                            Logout
                        </button>
                    </div>
                </div>

                {/* Message */}
                {msg && (
                    <div style={{
                        background: '#d4edda',
                        color: '#155724',
                        padding: '1rem',
                        borderRadius: '8px',
                        marginBottom: '2rem',
                        border: '1px solid #c3e6cb'
                    }}>
                        {msg}
                    </div>
                )}

                {/* Tabs */}
                <div style={{
                    display: 'flex',
                    gap: '1rem',
                    marginBottom: '3rem',
                    borderBottom: '2px solid #e1e8f0'
                }}>
                    <button
                        onClick={() => setActiveTab('fleet')}
                        style={{
                            background: 'none',
                            border: 'none',
                            padding: '1rem 2rem',
                            fontSize: '1rem',
                            fontWeight: '700',
                            cursor: 'pointer',
                            color: activeTab === 'fleet' ? 'var(--color-primary)' : '#666',
                            borderBottom: activeTab === 'fleet' ? '3px solid var(--color-primary)' : 'none',
                            marginBottom: '-2px'
                        }}
                    >
                        ROBOT FLEET
                    </button>

                </div>

                {/* Tab Content */}
                {activeTab === 'fleet' && renderFleetTab()}

            </div>
        </div>
    )
}

export default Admin

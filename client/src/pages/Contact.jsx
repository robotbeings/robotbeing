import { useState } from 'react'
import './Contact.css'

function Contact() {
    const [form, setForm] = useState({
        firstName: '',
        lastName: '',
        email: '',
        company: '',
        industry: '',
        message: ''
    })

    const [submitted, setSubmitted] = useState(false)

    console.log('Contact component rendering');

    const handleChange = (e) => {

        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/contacts`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(form),
            });

            if (response.ok) {
                setSubmitted(true);
            } else {
                const errorData = await response.json();
                alert('Error submitting inquiry: ' + (errorData.error || 'Please try again.'));
            }
        } catch (error) {
            console.error('Submission error:', error);
            alert('Failed to connect to the server. Please ensure the backend is running.');
        }
    }

    return (
        <div className="contact-page">
            <div className="contact-hero">
                <div className="contact-hero-content">
                    <h1>Contact</h1>
                    <p>Living with AI beings</p>
                </div>
            </div>

            <div className="contact-container">
                <div className="contact-info">
                    <h3>Get in Touch</h3>
                    <p>Our team fits the world's most advanced mobile robots to your specific challenges.</p>

                    <div className="info-item">
                        <strong>General Inquiries</strong>
                        <p>info@robotbeing.com</p>
                    </div>
                    <div className="info-item">
                        <strong>Press</strong>
                        <p>media@robotbeing.com</p>
                    </div>
                    <div className="info-item">
                        <strong>Careers</strong>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <p style={{ margin: 0 }}>Direct contact for job vacancy</p>
                            <a href="https://mail.google.com/mail/?view=cm&fs=1&to=robotbeings@gmail.com" target="_blank" rel="noopener noreferrer" title="Send email via Gmail" style={{ display: 'flex', alignItems: 'center' }}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: '#EA4335' }}>
                                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                                    <polyline points="22,6 12,13 2,6"></polyline>
                                </svg>
                            </a>
                        </div>
                    </div>

                </div>

                <div className="contact-form-wrapper">
                    {submitted ? (
                        <div className="success-message">
                            <h3>Thank You!</h3>
                            <p>We have received your inquiry. A member of our sales team will contact you shortly.</p>
                            <button className="cta-button secondary" onClick={() => setSubmitted(false)}>Send Another Message</button>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="contact-form">
                            <div className="form-row">
                                <div className="form-group">
                                    <label>First Name</label>
                                    <input required type="text" name="firstName" value={form.firstName} onChange={handleChange} />
                                </div>
                                <div className="form-group">
                                    <label>Last Name</label>
                                    <input required type="text" name="lastName" value={form.lastName} onChange={handleChange} />
                                </div>
                            </div>

                            <div className="form-group">
                                <label>Work Email</label>
                                <input required type="email" name="email" value={form.email} onChange={handleChange} />
                            </div>

                            <div className="form-group">
                                <label>Company</label>
                                <input required type="text" name="company" value={form.company} onChange={handleChange} />
                            </div>

                            <div className="form-group">
                                <label>Industry</label>
                                <select name="industry" value={form.industry} onChange={handleChange} required>
                                    <option value="">Select Industry...</option>
                                    <option value="Manufacturing">Manufacturing</option>
                                    <option value="Energy">Energy & Utilities</option>
                                    <option value="Construction">Construction</option>
                                    <option value="Logistics">Logistics / Warehouse</option>
                                    <option value="Public Safety">Public Safety</option>
                                    <option value="Academia">Academia / Research</option>
                                    <option value="Other">Other</option>
                                </select>
                            </div>

                            <div className="form-group">
                                <label>Message</label>
                                <textarea required name="message" value={form.message} onChange={handleChange} rows="5"></textarea>
                            </div>

                            <button type="submit" className="cta-button secondary">SUBMIT INQUIRY</button>
                        </form>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Contact

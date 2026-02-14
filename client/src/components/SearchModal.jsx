import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import './SearchModal.css'

function SearchModal({ isOpen, onClose }) {
    const [query, setQuery] = useState('')
    const [results, setResults] = useState([])

    // Hardcoded search index for simplicity
    const suggestions = []

    useEffect(() => {
        if (query.trim() === '') {
            setResults([])
            return
        }
        const lowerQuery = query.toLowerCase()
        const filtered = suggestions.filter(item =>
            item.title.toLowerCase().includes(lowerQuery) ||
            item.desc.toLowerCase().includes(lowerQuery)
        )
        setResults(filtered)
    }, [query])

    if (!isOpen) return null

    return (
        <div className="search-modal-overlay" onClick={onClose}>
            <div className="search-modal-content" onClick={e => e.stopPropagation()}>
                <div className="search-header">
                    <input
                        type="text"
                        placeholder="Search robots, solutions, pages..."
                        autoFocus
                        value={query}
                        onChange={e => setQuery(e.target.value)}
                    />
                    <button className="close-btn" onClick={onClose}>&times;</button>
                </div>
                <div className="search-results">
                    {results.length > 0 ? (
                        results.map((res, idx) => (
                            <Link
                                key={idx}
                                to={res.url}
                                className="search-result-item"
                                onClick={onClose}
                            >
                                <span className="result-type">{res.type}</span>
                                <div className="result-info">
                                    <h4>{res.title}</h4>
                                    <p>{res.desc}</p>
                                </div>
                                <span className="result-arrow">&rarr;</span>
                            </Link>
                        ))
                    ) : (
                        query && <div className="no-results">No results found for "{query}"</div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default SearchModal

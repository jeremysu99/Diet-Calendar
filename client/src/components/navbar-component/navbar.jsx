import Link from "next/link";

export default function Navbar() {
    const frameStyle = {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#2f3e4d',
        padding: '0.5rem 2rem',
    }
    const homeStyle = {
        color: '#fff',
        fontWeight: 'bold',
        textDecoration: 'none',
    }
    const addEntryStyle = {
        color: '#000000',
        backgroundColor: '#fff',
        padding: '0.5rem',
        textDecoration: 'none',
    }
    return (
        <nav style={frameStyle}>
            <Link style={homeStyle} href={'/'}>Home</Link>
            <Link style={addEntryStyle} href={'/addEntry'}>Add Entry</Link>
        </nav>
    );
}
import { Link } from "react-router-dom";

function NavBar(){
        return (
            <nav className="bg-black px-6 py-4 flex justify-between items-center shadow">
                <div className="text-xl font-bold text-white">
                    <Link to="/">sudabest</Link>
                </div>

                <div className="flex items-center gap-6">
                    <Link to="/" className="text-base px-3 py-1 rounded hover:bg-white/10 text-white">Home</Link>
                    <Link to="/favorites" className="text-base px-3 py-1 rounded hover:bg-white/10 text-white">Favorites</Link>
                </div>
            </nav>
        )
}
export default NavBar;
import { forwardRef } from "react"
import "../css/Favorites.css"

function Favorites(){
    return <div className="favorites-empty">
        <h2>no favorit movies yet</h2>
        <p>start adding to favorites</p>
    </div>
}
export default Favorites
import { Link } from "react-router-dom"

const pages = [
    {
        page: "Join room",
        link: "/join"
    },
    {
        page: "Create room",
        link: "/admin"
    },
    {
        page: "Sets",
        link: "/sets"
    },
    {
        page: "Create set",
        link: "/CreateSet"
    }
]
export default function Navbar () {
    return <div className="flex justify-center gap-4 top-0 p-4 font-bold text-gray-100 max-w-2xl mx-auto">
        {pages.map((page) => <Link to={`${page.link}`}>
            {page.page}
        </Link>)}
    </div>
}
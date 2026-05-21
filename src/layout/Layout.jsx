import { Outlet } from 'react-router'
import Navbar from '../components/Navbar/Navbar'

const Layout = () => {
    return (
        <div className="w-full max-w-[1000px] lg:max-w-[1200px] mx-auto px-4 sm:px-6 pb-6 sm:pb-10">
            <Navbar />

            <main className="mt-4 sm:mt-0">
                <Outlet />
            </main>
        </div>
    )
}
export default Layout

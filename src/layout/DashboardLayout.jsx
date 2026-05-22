import { Outlet, Link, useLocation } from 'react-router'

const navItems = [
    { path: '/admin/dashboard/products', label: 'Productos', icon: '📦' },
]

const DashboardLayout = () => {
    const location = useLocation()
    const isActive = (path) => location.pathname.startsWith(path)

    return (
        <div className="drawer lg:drawer-open">
            <input id="dashboard-drawer" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content flex flex-col h-screen overflow-hidden">
                <div className="navbar bg-base-100 border-b border-base-200 lg:hidden">
                    <label htmlFor="dashboard-drawer" className="btn btn-ghost drawer-button">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
                        </svg>
                    </label>
                    <div className="flex-1 text-lg font-semibold">Dashboard</div>
                </div>
                <main className="flex-1 p-4 md:p-8 bg-base-200 flex flex-col min-h-0">
                    <Outlet />
                </main>
            </div>
            <div className="drawer-side">
                <label htmlFor="dashboard-drawer" className="drawer-overlay"></label>
                <aside className="bg-base-100 h-screen w-64 border-r border-base-200 flex flex-col sticky top-0">
                    <div className="p-6 border-b border-base-200">
                        <Link to="/admin/dashboard" className="text-xl font-bold tracking-tight">
                            Dashboard
                        </Link>
                        <p className="text-sm text-base-content/50 mt-1">Panel de administración</p>
                    </div>
                    <nav className="flex-1 p-4">
                        <ul className="menu gap-1">
                            {navItems.map((item) => (
                                <li key={item.path}>
                                    <Link
                                        to={item.path}
                                        className={`flex items-center gap-3 px-4 py-2.5 rounded-lg transition-colors ${
                                            isActive(item.path)
                                                ? 'bg-primary/10 text-primary font-medium'
                                                : 'text-base-content/70 hover:bg-base-200'
                                        }`}
                                    >
                                        <span>{item.icon}</span>
                                        {item.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </nav>
                    <div className="p-4 border-t border-base-200">
                        <Link to="/" className="btn btn-ghost btn-sm w-full justify-start gap-2">
                            ← Volver al sitio
                        </Link>
                    </div>
                </aside>
            </div>
        </div>
    )
}

export default DashboardLayout

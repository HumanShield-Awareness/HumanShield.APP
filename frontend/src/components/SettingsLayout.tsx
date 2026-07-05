import { ChevronRight, KeyRound, MailCheck, Network, Settings } from 'lucide-react'
import { NavLink, Outlet, useLocation } from 'react-router-dom'

// Einstellungsbereiche — neue Bereiche hier ergaenzen (Netbird-Stil:
// eigene zweite Sidebar-Spalte neben der Hauptnavigation).
const settingsNav = [
  { to: '/settings/ldap', label: 'LDAP', icon: Network },
  { to: '/settings/oidc', label: 'OIDC / SSO', icon: KeyRound },
  { to: '/settings/smtp', label: 'SMTP', icon: MailCheck },
]

const linkClass = ({ isActive }: { isActive: boolean }) =>
  `flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm transition-colors ${
    isActive
      ? 'bg-accent/12 font-medium text-accent'
      : 'text-text-secondary hover:bg-bg hover:text-text-primary'
  }`

export default function SettingsLayout() {
  const { pathname } = useLocation()
  const current = settingsNav.find((item) => pathname.startsWith(item.to))

  return (
    <div className="-m-6 flex min-h-full">
      <aside className="w-52 shrink-0 border-r border-border bg-surface px-3 py-5">
        <nav className="flex flex-col gap-1">
          {settingsNav.map(({ to, label, icon: Icon }) => (
            <NavLink key={to} to={to} className={linkClass}>
              <Icon size={16} />
              {label}
            </NavLink>
          ))}
        </nav>
      </aside>

      <div className="flex-1 p-6">
        <div className="mb-5 flex items-center gap-2 text-sm text-text-secondary">
          <Settings size={15} />
          <span>Einstellungen</span>
          {current && (
            <>
              <ChevronRight size={14} />
              <current.icon size={15} />
              <span className="text-text-primary">{current.label}</span>
            </>
          )}
        </div>
        <Outlet />
      </div>
    </div>
  )
}

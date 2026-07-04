import { FormEvent, useEffect, useState } from 'react'
import PageHeader from '../components/PageHeader'
import Toggle from '../components/Toggle'
import { api } from '../services/api'
import type { LdapConfig, OidcConfig } from '../types'

const fieldClass = 'rounded-md border border-border bg-surface px-3 py-2 text-text-primary'
const labelClass = 'flex flex-col gap-1 text-sm'

// Passwoerter/Secrets sind write-only: leeres Feld = unveraendert lassen.
type LdapForm = Omit<LdapConfig, 'has_bind_password'> & { bind_password: string }
type OidcForm = Omit<OidcConfig, 'has_client_secret'> & { client_secret: string }

export default function SettingsPage() {
  const [form, setForm] = useState<LdapForm | null>(null)
  const [hasPassword, setHasPassword] = useState(false)
  const [saving, setSaving] = useState(false)
  const [testing, setTesting] = useState(false)
  const [message, setMessage] = useState<{ kind: 'error' | 'info'; text: string } | null>(null)

  const [oidc, setOidc] = useState<OidcForm | null>(null)
  const [hasSecret, setHasSecret] = useState(false)
  const [savingOidc, setSavingOidc] = useState(false)

  useEffect(() => {
    api.get<LdapConfig>('/settings/ldap').then((res) => {
      const { has_bind_password, ...rest } = res.data
      setHasPassword(has_bind_password)
      setForm({ ...rest, bind_password: '' })
    })
    api.get<OidcConfig>('/settings/oidc').then((res) => {
      const { has_client_secret, ...rest } = res.data
      setHasSecret(has_client_secret)
      setOidc({ ...rest, client_secret: '' })
    })
  }, [])

  function set<K extends keyof LdapForm>(key: K, value: LdapForm[K]) {
    setForm((prev) => (prev ? { ...prev, [key]: value } : prev))
  }

  function setO<K extends keyof OidcForm>(key: K, value: OidcForm[K]) {
    setOidc((prev) => (prev ? { ...prev, [key]: value } : prev))
  }

  async function saveOidc(event: FormEvent) {
    event.preventDefault()
    if (!oidc) return
    setSavingOidc(true)
    setMessage(null)
    try {
      const { client_secret, ...rest } = oidc
      const payload: Record<string, unknown> = { ...rest }
      if (client_secret) payload.client_secret = client_secret
      await api.put('/settings/oidc', payload)
      if (client_secret) setHasSecret(true)
      setOidc((prev) => (prev ? { ...prev, client_secret: '' } : prev))
      setMessage({ kind: 'info', text: 'OIDC-Einstellungen gespeichert.' })
    } catch {
      setMessage({ kind: 'error', text: 'OIDC-Speichern fehlgeschlagen (Admin-Rechte nötig?).' })
    } finally {
      setSavingOidc(false)
    }
  }

  /** Speichert die aktuellen Werte (Passwort nur wenn eingegeben). */
  async function save(): Promise<boolean> {
    if (!form) return false
    const { bind_password, ...rest } = form
    const payload: Record<string, unknown> = { ...rest }
    if (bind_password) payload.bind_password = bind_password
    await api.put('/settings/ldap', payload)
    return true
  }

  async function handleSave(event: FormEvent) {
    event.preventDefault()
    setSaving(true)
    setMessage(null)
    try {
      await save()
      setMessage({ kind: 'info', text: 'Einstellungen gespeichert.' })
      if (form?.bind_password) setHasPassword(true)
      setForm((prev) => (prev ? { ...prev, bind_password: '' } : prev))
    } catch {
      setMessage({ kind: 'error', text: 'Speichern fehlgeschlagen (Admin-Rechte nötig?).' })
    } finally {
      setSaving(false)
    }
  }

  async function handleTest() {
    setTesting(true)
    setMessage({ kind: 'info', text: 'Speichere und teste Verbindung...' })
    try {
      await save() // Test nutzt die gespeicherte Config -> vorher speichern.
      if (form?.bind_password) setHasPassword(true)
      setForm((prev) => (prev ? { ...prev, bind_password: '' } : prev))
      const res = await api.post<{ success: boolean; detail: string }>('/settings/ldap/test')
      setMessage({ kind: res.data.success ? 'info' : 'error', text: res.data.detail })
    } catch {
      setMessage({ kind: 'error', text: 'Test fehlgeschlagen (Admin-Rechte nötig?).' })
    } finally {
      setTesting(false)
    }
  }

  if (!form) return <p className="text-text-secondary">Lade Einstellungen...</p>

  return (
    <>
      <PageHeader
        title="Einstellungen"
        subtitle="Zugangsdaten (LDAP-Bind, OIDC-Secret) werden verschlüsselt gespeichert."
      />

      {message && (
        <p className={`mb-4 text-sm ${message.kind === 'error' ? 'text-status-danger' : 'text-text-secondary'}`}>
          {message.text}
        </p>
      )}

      <h2 className="mb-3 text-lg font-semibold">LDAP-Anbindung</h2>
      <form onSubmit={handleSave} className="flex max-w-2xl flex-col gap-4">
        <div className="elevated flex items-center justify-between gap-4 rounded-lg border border-border bg-surface p-4">
          <div>
            <div className="text-sm font-medium">LDAP-Import aktivieren</div>
            <div className="text-sm text-text-secondary">
              Erlaubt den Empfänger-Import aus dem Verzeichnisdienst.
            </div>
          </div>
          <Toggle checked={form.enabled} onChange={(v) => set('enabled', v)} aria-label="LDAP-Import aktivieren" />
        </div>

        <div className="flex gap-4">
          <label className={`${labelClass} flex-1`}>
            Host
            <input value={form.host} onChange={(e) => set('host', e.target.value)} placeholder="ldap.example.com" className={fieldClass} />
          </label>
          <label className={`${labelClass} w-28`}>
            Port
            <input type="number" value={form.port} onChange={(e) => set('port', Number(e.target.value))} className={`${fieldClass} font-mono`} />
          </label>
        </div>

        <div className="flex gap-8">
          <div className="flex items-center gap-3 text-sm">
            <Toggle checked={form.use_ssl} onChange={(v) => set('use_ssl', v)} aria-label="LDAPS (SSL)" />
            LDAPS (SSL)
          </div>
          <div className="flex items-center gap-3 text-sm">
            <Toggle checked={form.start_tls} onChange={(v) => set('start_tls', v)} aria-label="StartTLS" />
            StartTLS
          </div>
        </div>

        <label className={labelClass}>
          Bind-DN
          <input value={form.bind_dn} onChange={(e) => set('bind_dn', e.target.value)} placeholder="cn=svc,dc=example,dc=com" className={`${fieldClass} font-mono`} />
        </label>

        <label className={labelClass}>
          Bind-Passwort {hasPassword && <span className="text-text-secondary">(leer = unverändert)</span>}
          <input
            type="password"
            value={form.bind_password}
            onChange={(e) => set('bind_password', e.target.value)}
            placeholder={hasPassword ? '••••••••' : ''}
            className={fieldClass}
          />
        </label>

        <label className={labelClass}>
          Base-DN
          <input value={form.base_dn} onChange={(e) => set('base_dn', e.target.value)} placeholder="ou=users,dc=example,dc=com" className={`${fieldClass} font-mono`} />
        </label>

        <label className={labelClass}>
          User-Filter
          <input value={form.user_filter} onChange={(e) => set('user_filter', e.target.value)} className={`${fieldClass} font-mono`} />
        </label>

        <fieldset className="flex gap-4 rounded-md border border-border p-3">
          <legend className="px-1 text-sm text-text-secondary">Attribut-Mapping</legend>
          <label className={`${labelClass} flex-1`}>
            E-Mail
            <input value={form.attr_email} onChange={(e) => set('attr_email', e.target.value)} className={`${fieldClass} font-mono`} />
          </label>
          <label className={`${labelClass} flex-1`}>
            Vorname
            <input value={form.attr_first_name} onChange={(e) => set('attr_first_name', e.target.value)} className={`${fieldClass} font-mono`} />
          </label>
          <label className={`${labelClass} flex-1`}>
            Nachname
            <input value={form.attr_last_name} onChange={(e) => set('attr_last_name', e.target.value)} className={`${fieldClass} font-mono`} />
          </label>
        </fieldset>

        <div className="flex gap-2">
          <button type="submit" disabled={saving} className="rounded-md bg-accent px-5 py-2 font-medium text-white disabled:opacity-60">
            {saving ? 'Speichern...' : 'Speichern'}
          </button>
          <button
            type="button"
            onClick={handleTest}
            disabled={testing}
            className="rounded-md border border-border px-5 py-2 text-text-primary hover:bg-bg disabled:opacity-60"
          >
            {testing ? 'Teste...' : 'Verbindung testen'}
          </button>
        </div>
      </form>

      {oidc && (
        <>
          <h2 className="mb-1 mt-10 text-lg font-semibold">OIDC / Single Sign-On</h2>
          <p className="mb-3 text-sm text-text-secondary">
            Optionale Zweitanmeldung. Ohne Aktivierung läuft die App rein mit lokalem Login.
          </p>
          <form onSubmit={saveOidc} className="flex max-w-2xl flex-col gap-4">
            <div className="elevated flex items-center justify-between gap-4 rounded-lg border border-border bg-surface p-4">
              <div>
                <div className="text-sm font-medium">OIDC aktivieren</div>
                <div className="text-sm text-text-secondary">Zeigt den SSO-Button auf der Anmeldeseite.</div>
              </div>
              <Toggle checked={oidc.enabled} onChange={(v) => setO('enabled', v)} aria-label="OIDC aktivieren" />
            </div>

            <label className={labelClass}>
              Issuer-URL
              <input
                value={oidc.issuer}
                onChange={(e) => setO('issuer', e.target.value)}
                placeholder="https://idp.example.com/application/o/phishaware/"
                className={`${fieldClass} font-mono`}
              />
            </label>
            <label className={labelClass}>
              Client-ID
              <input value={oidc.client_id} onChange={(e) => setO('client_id', e.target.value)} className={`${fieldClass} font-mono`} />
            </label>
            <label className={labelClass}>
              Client-Secret {hasSecret && <span className="text-text-secondary">(leer = unverändert)</span>}
              <input
                type="password"
                value={oidc.client_secret}
                onChange={(e) => setO('client_secret', e.target.value)}
                placeholder={hasSecret ? '••••••••' : ''}
                className={fieldClass}
              />
            </label>
            <label className={labelClass}>
              Redirect-URI
              <input
                value={oidc.redirect_uri}
                onChange={(e) => setO('redirect_uri', e.target.value)}
                placeholder="https://deine-domain/api/auth/callback"
                className={`${fieldClass} font-mono`}
              />
            </label>

            <div>
              <button
                type="submit"
                disabled={savingOidc}
                className="rounded-md bg-accent px-5 py-2 font-medium text-white disabled:opacity-60"
              >
                {savingOidc ? 'Speichern...' : 'Speichern'}
              </button>
            </div>
          </form>
        </>
      )}
    </>
  )
}

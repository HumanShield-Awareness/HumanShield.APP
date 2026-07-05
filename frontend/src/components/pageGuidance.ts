/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */

// Zentrale Anleitungstexte fuer den Hilfe-Bereich rechts (PageScaffold),
// zweisprachig (DE/EN). Key = guidanceKey der jeweiligen Seite.
import type { Lang } from '../i18n/translations'

export interface Guidance {
  intro: string
  steps: string[]
  note?: string
  variables?: { name: string; desc: string }[]
}

const de: Record<string, Guidance> = {
  'template-editor': {
    intro:
      'So baust du eine Vorlage auf. Betreff, HTML- und Text-Inhalt können Platzhalter enthalten, die pro Empfänger automatisch ersetzt werden.',
    steps: [
      'Namen und einen realistischen Betreff vergeben — der Betreff entscheidet oft, ob die Mail geöffnet wird.',
      'HTML-Inhalt gestalten und den Tracking-Link über {{ link }} einbauen — nur so werden Klicks der Landing Page zugeordnet.',
      'Mit Variablen personalisieren (z. B. {{ first_name }}); das macht die Mail glaubwürdiger.',
      'Optional einen Text-Teil als Plain-Text-Alternative hinterlegen.',
      'Über „Vorschau (mit Beispieldaten)“ prüfen, wie die Mail beim Empfänger ankommt.',
    ],
    variables: [
      { name: '{{ first_name }}', desc: 'Vorname des Empfängers' },
      { name: '{{ last_name }}', desc: 'Nachname des Empfängers' },
      { name: '{{ email }}', desc: 'E-Mail-Adresse des Empfängers' },
      { name: '{{ link }}', desc: 'Personalisierter Tracking-Link zur Landing Page' },
    ],
    note: 'Gleichbedeutende Aliase: {{ recipient_name }}, {{ recipient_email }}, {{ click_link }}.',
  },
  templates: {
    intro:
      'Vorlagen sind die Phishing-E-Mails, die in Kampagnen versendet werden. Betreff und Inhalt können Platzhalter wie den Vornamen oder den Tracking-Link enthalten.',
    steps: [
      'Aussagekräftigen Namen und einen realistischen Betreff wählen — er entscheidet oft, ob die Mail geöffnet wird.',
      'HTML-Inhalt gestalten und über die Personalisierungs-Variablen (z. B. Vorname) glaubwürdiger machen.',
      'Den Tracking-Link/Platzhalter einbauen, damit Klicks der Landing Page zugeordnet werden.',
      'Optional einen Text-Teil hinterlegen, damit die Mail auch ohne HTML sauber ankommt.',
      'Über die Vorschau prüfen, wie die Mail beim Empfänger aussieht.',
    ],
    note: 'Vorlagen lassen sich in mehreren Kampagnen wiederverwenden.',
  },
  groups: {
    intro:
      'Gruppen sind wiederverwendbare Empfängerlisten für deine Kampagnen. Empfänger kannst du manuell, per CSV oder aus dem LDAP-Verzeichnis übernehmen.',
    steps: [
      'Neue Gruppe anlegen und einen sprechenden Namen vergeben (z. B. „Abteilung Vertrieb“).',
      'Empfänger manuell erfassen oder per CSV importieren (E-Mail, Vorname, Nachname).',
      'Alternativ „LDAP-Import“ nutzen — dazu muss LDAP unter Einstellungen konfiguriert sein.',
      'Vor dem Versand prüfen, dass alle E-Mail-Adressen korrekt sind.',
    ],
    note: 'Eine Gruppe kann in mehreren Kampagnen gleichzeitig verwendet werden.',
  },
  'sending-profiles': {
    intro:
      'Ein Sending Profile bündelt SMTP-Zugangsdaten und Absender-Identität für den Kampagnen-Versand. Ohne Profil greift das globale Fallback-SMTP.',
    steps: [
      'SMTP-Host und Port des Anbieters eintragen und den passenden TLS-Modus wählen.',
      'Benutzername und Passwort hinterlegen — das Passwort wird verschlüsselt gespeichert.',
      'Absender-Adresse und -Name setzen; die Adresse muss beim Anbieter versandberechtigt sein (SPF/DKIM).',
      'Mit „Test-Mail“ an eine eigene Adresse den Versand prüfen, bevor eine Kampagne läuft.',
    ],
    note: 'Für jede Absender-Identität kannst du ein eigenes Profil anlegen.',
  },
  'landing-editor': {
    intro:
      'Landing Pages sind die Seiten, auf denen Empfänger nach dem Klick landen. Optional erfassen sie Formulareingaben, um einen Awareness-Moment zu erzeugen.',
    steps: [
      'Namen vergeben und den Seiteninhalt gestalten — als HTML oder im Markdown-Modus (z. B. eine nachgebaute Login-Seite).',
      'Für ein Eingabeformular HTML verwenden; alle Formulare werden beim Ausliefern automatisch auf die Tracking-URL umgebogen.',
      '„Daten-Capture“ aktivieren, wenn abgeschickte Formulardaten als Signal erfasst werden sollen.',
      'Passwörter nur erfassen, wenn wirklich nötig — Datenschutz und interne Richtlinien beachten.',
      'Optional eine Weiterleitung oder Aufklärungsseite nach dem Absenden hinterlegen.',
    ],
    note: 'Erfasste Daten dienen nur Trainingszwecken; kläre die Zulässigkeit vorab intern ab.',
  },
  'landing-pages': {
    intro:
      'Landing Pages sind die Seiten, auf denen Empfänger nach einem Klick landen. Sie können optional Eingaben erfassen, um Awareness-Momente zu erzeugen.',
    steps: [
      'Namen vergeben und den HTML-Inhalt der Seite gestalten (z. B. eine nachgebaute Login-Seite).',
      'Bei Bedarf „Daten-Capture“ aktivieren, um eingegebene Formulardaten zu erfassen.',
      'Passwörter nur erfassen, wenn wirklich nötig — beachte Datenschutz und interne Richtlinien.',
      'Optional eine Aufklärungs-/Weiterleitungsseite nach dem Absenden hinterlegen.',
    ],
    note: 'Erfasste Daten dienen nur Trainingszwecken; kläre die Zulässigkeit vorab intern ab.',
  },
  'campaign-editor': {
    intro:
      'Eine Kampagne bündelt Vorlage, Absender, Landing Page und Empfängergruppen. Der Versand wird danach separat über „Senden“ gestartet.',
    steps: [
      'Namen vergeben und die E-Mail-Vorlage auswählen (Pflicht) — sie muss vorher unter „Vorlagen“ angelegt sein.',
      'Sending Profile für die Absender-Identität wählen; ohne Auswahl greift das globale Fallback-SMTP.',
      'Optional eine Landing Page hinterlegen, auf der Empfänger nach dem Klick landen.',
      'Eine oder mehrere Empfängergruppen auswählen (unter „Gruppen“ anlegen oder importieren).',
      'Optional Datum und Uhrzeit für einen geplanten Start setzen.',
      'Kampagne anlegen und anschließend in der Übersicht über „Senden“ starten — danach die Ergebnisse auswerten.',
    ],
    note: 'Starte im Zweifel mit einer kleinen Testgruppe.',
  },
  campaigns: {
    intro:
      'In einer Kampagne kombinierst du Vorlage, Sending Profile, Landing Page und Empfängergruppe und startest den Versand.',
    steps: [
      'Vorher sicherstellen, dass Vorlage, Gruppe und (optional) Landing Page angelegt sind.',
      'Neue Kampagne anlegen und die Bausteine im Assistenten auswählen.',
      'Absender über ein Sending Profile festlegen — sonst wird das globale Fallback-SMTP genutzt.',
      'Kampagne speichern und anschließend über „Senden“ den Versand starten.',
      'Nach dem Versand die Ergebnisse (Öffnungen, Klicks, Eingaben) auswerten.',
    ],
    note: 'Starte im Zweifel mit einer kleinen Testgruppe.',
  },
  results: {
    intro:
      'Die Ergebnisse zeigen pro Empfänger, wie auf die Kampagne reagiert wurde — von Zustellung über Öffnung bis Klick und Eingabe.',
    steps: [
      'Die Kennzahlen oben geben den Überblick über die gesamte Kampagne.',
      'In der Tabelle je Empfänger den Status nachvollziehen.',
      'Über „Als CSV exportieren“ die Rohdaten für Reports herunterladen.',
    ],
    note: 'Nutze die Ergebnisse für gezielte Awareness-Maßnahmen, nicht zur Sanktionierung Einzelner.',
  },
  users: {
    intro:
      'Hier verwaltest du die lokalen Konten für den Zugang zu HumanShield.APP. Der lokale Login ist die primäre Anmeldemethode.',
    steps: [
      '„Neuer Benutzer“ öffnen und E-Mail, Name, Startpasswort und Rolle festlegen.',
      'Rolle wählen: „Admin“ darf Einstellungen und Benutzer verwalten, „Benutzer“ nur Kampagnen-Funktionen.',
      'Konten bei Bedarf deaktivieren statt löschen, um den Zugang temporär zu sperren.',
    ],
    note: 'Bei aktivem OIDC müssen Nutzer trotzdem als lokale Konten mit passender E-Mail existieren.',
  },
  profile: {
    intro: 'Hier änderst du deinen angezeigten Namen und dein Passwort.',
    steps: [
      'Namen anpassen und speichern.',
      'Zum Passwortwechsel das aktuelle Passwort und zweimal das neue eingeben.',
      'Ein starkes, einzigartiges Passwort verwenden.',
    ],
    note: 'Deine E-Mail-Adresse und Rolle kann nur ein Admin ändern.',
  },
  'settings-ldap': {
    intro:
      'Über LDAP importierst du E-Mail-Empfänger direkt aus deinem Verzeichnisdienst (z. B. Active Directory oder OpenLDAP) in Gruppen.',
    steps: [
      'Host und Port des LDAP-Servers eintragen (Standard: 389, LDAPS: 636).',
      'Verschlüsselung wählen: LDAPS (SSL) oder StartTLS — für Produktivbetrieb empfohlen.',
      'Bind-DN eines Dienstkontos mit Lesezugriff angeben, z. B. cn=svc,ou=service,dc=example,dc=com.',
      'Das Bind-Passwort eintragen — es wird verschlüsselt gespeichert und nie wieder angezeigt.',
      'Base-DN setzen, unterhalb dessen nach Benutzern gesucht wird, z. B. ou=users,dc=example,dc=com.',
      'Bei Bedarf User-Filter und Attribut-Mapping anpassen (AD: E-Mail meist „mail“, Vorname „givenName“, Nachname „sn“).',
      '„Verbindung testen“ klicken — speichert die Werte und prüft Verbindung und Anmeldung.',
    ],
    note: 'Der Import selbst erfolgt anschließend unter Gruppen → „LDAP-Import“.',
  },
  'settings-oidc': {
    intro:
      'OIDC ist eine optionale Zweitanmeldung per Single Sign-On. Der lokale Login bleibt die primäre Methode — ohne OIDC läuft die App vollständig.',
    steps: [
      'Im Identity Provider (Authentik, Keycloak, Entra ID, Okta, …) eine neue OIDC-Anwendung anlegen.',
      'Als Redirect-URI die Callback-Adresse eintragen: https://<deine-domain>/api/auth/callback.',
      'Issuer-URL aus dem IdP kopieren (Basis-URL der OIDC-Discovery).',
      'Client-ID und Client-Secret übernehmen — das Secret wird verschlüsselt gespeichert.',
      'Speichern und dann „OIDC aktivieren“ einschalten: auf der Anmeldeseite erscheint der SSO-Button.',
    ],
    note: 'Nutzer müssen als lokale Konten mit passender E-Mail existieren, damit die SSO-Anmeldung zugeordnet werden kann.',
  },
  'settings-smtp': {
    intro:
      'Das globale Fallback-SMTP wird nur genutzt, wenn eine Kampagne kein eigenes Sending Profile hat. Für eigene Absender-Identitäten lege besser ein Sending Profile an.',
    steps: [
      'Host und Port deines SMTP-Anbieters eintragen (funktioniert mit jedem Anbieter: IONOS, Hetzner, Mailgun, eigener Server, …).',
      'TLS-Modus passend zum Port wählen: STARTTLS für Port 587, SSL/TLS für Port 465, unverschlüsselt nur für Port 25 im internen Netz.',
      'Benutzername und Passwort des Postfachs eintragen — das Passwort wird verschlüsselt gespeichert.',
      'Absender-Adresse und -Name setzen; die Adresse muss beim Anbieter zum Versand berechtigt sein (SPF/DKIM beachten).',
      '„Verbindung testen“ klicken — speichert die Werte und prüft Verbindung und Anmeldung.',
    ],
    note: 'Bei einer frischen Installation ist diese Seite mit den SMTP-Werten aus der .env vorbefüllt.',
  },
}

const en: Record<string, Guidance> = {
  'template-editor': {
    intro:
      'How to build a template. Subject, HTML and text content can contain placeholders that are replaced automatically per recipient.',
    steps: [
      'Give it a name and a realistic subject — the subject often decides whether the mail gets opened.',
      'Design the HTML content and add the tracking link via {{ link }} — only then are clicks attributed to the landing page.',
      'Personalize with variables (e.g. {{ first_name }}); this makes the mail more credible.',
      'Optionally add a text part as a plain-text alternative.',
      'Use “Preview (with sample data)” to check how the mail looks to the recipient.',
    ],
    variables: [
      { name: '{{ first_name }}', desc: 'Recipient’s first name' },
      { name: '{{ last_name }}', desc: 'Recipient’s last name' },
      { name: '{{ email }}', desc: 'Recipient’s email address' },
      { name: '{{ link }}', desc: 'Personalized tracking link to the landing page' },
    ],
    note: 'Equivalent aliases: {{ recipient_name }}, {{ recipient_email }}, {{ click_link }}.',
  },
  templates: {
    intro:
      'Templates are the phishing emails sent in campaigns. Subject and content can contain placeholders such as the first name or the tracking link.',
    steps: [
      'Choose a meaningful name and a realistic subject — it often decides whether the mail gets opened.',
      'Design the HTML content and make it more credible with personalization variables (e.g. first name).',
      'Add the tracking link/placeholder so clicks are attributed to the landing page.',
      'Optionally add a text part so the mail arrives cleanly even without HTML.',
      'Use the preview to check how the mail looks to the recipient.',
    ],
    note: 'Templates can be reused across multiple campaigns.',
  },
  groups: {
    intro:
      'Groups are reusable recipient lists for your campaigns. You can add recipients manually, via CSV or from the LDAP directory.',
    steps: [
      'Create a new group and give it a descriptive name (e.g. “Sales department”).',
      'Enter recipients manually or import them via CSV (email, first name, last name).',
      'Alternatively use “LDAP import” — this requires LDAP to be configured under Settings.',
      'Before sending, check that all email addresses are correct.',
    ],
    note: 'A group can be used in several campaigns at the same time.',
  },
  'sending-profiles': {
    intro:
      'A sending profile bundles SMTP credentials and sender identity for campaign delivery. Without a profile the global fallback SMTP is used.',
    steps: [
      'Enter the provider’s SMTP host and port and choose the matching TLS mode.',
      'Enter username and password — the password is stored encrypted.',
      'Set the sender address and name; the address must be authorized to send at the provider (SPF/DKIM).',
      'Use “Test email” to a mailbox of your own to check delivery before running a campaign.',
    ],
    note: 'You can create a separate profile for each sender identity.',
  },
  'landing-editor': {
    intro:
      'Landing pages are the pages recipients land on after clicking. Optionally they capture form input to create an awareness moment.',
    steps: [
      'Give it a name and design the page content — as HTML or in markdown mode (e.g. a cloned login page).',
      'For an input form use HTML; all forms are automatically rewritten to the tracking URL on delivery.',
      'Enable “data capture” if submitted form data should be recorded as a signal.',
      'Only capture passwords if truly necessary — mind data protection and internal policies.',
      'Optionally add a redirect or awareness page after submission.',
    ],
    note: 'Captured data is for training purposes only; clarify admissibility internally beforehand.',
  },
  'landing-pages': {
    intro:
      'Landing pages are the pages recipients land on after a click. They can optionally capture input to create awareness moments.',
    steps: [
      'Give it a name and design the page’s HTML content (e.g. a cloned login page).',
      'If needed, enable “data capture” to record submitted form data.',
      'Only capture passwords if truly necessary — mind data protection and internal policies.',
      'Optionally add an awareness/redirect page after submission.',
    ],
    note: 'Captured data is for training purposes only; clarify admissibility internally beforehand.',
  },
  'campaign-editor': {
    intro:
      'A campaign bundles template, sender, landing page and recipient groups. Delivery is then started separately via “Send”.',
    steps: [
      'Give it a name and select the email template (required) — it must be created under “Templates” first.',
      'Choose a sending profile for the sender identity; without a selection the global fallback SMTP is used.',
      'Optionally add a landing page recipients land on after clicking.',
      'Select one or more recipient groups (create or import them under “Groups”).',
      'Optionally set a date and time for a scheduled start.',
      'Create the campaign and then start it from the overview via “Send” — afterwards evaluate the results.',
    ],
    note: 'When in doubt, start with a small test group.',
  },
  campaigns: {
    intro:
      'In a campaign you combine template, sending profile, landing page and recipient group and start delivery.',
    steps: [
      'First make sure template, group and (optionally) landing page are created.',
      'Create a new campaign and select the building blocks in the wizard.',
      'Set the sender via a sending profile — otherwise the global fallback SMTP is used.',
      'Save the campaign and then start delivery via “Send”.',
      'After sending, evaluate the results (opens, clicks, input).',
    ],
    note: 'When in doubt, start with a small test group.',
  },
  results: {
    intro:
      'The results show per recipient how they reacted to the campaign — from delivery through open to click and input.',
    steps: [
      'The metrics at the top give an overview of the whole campaign.',
      'In the table, follow each recipient’s status.',
      'Use “Export as CSV” to download the raw data for reports.',
    ],
    note: 'Use the results for targeted awareness measures, not to penalize individuals.',
  },
  users: {
    intro:
      'Here you manage the local accounts for accessing HumanShield.APP. The local login is the primary sign-in method.',
    steps: [
      'Open “New user” and set email, name, initial password and role.',
      'Choose the role: “Admin” may manage settings and users, “User” only campaign features.',
      'If needed, deactivate accounts instead of deleting them to temporarily block access.',
    ],
    note: 'With OIDC active, users must still exist as local accounts with a matching email.',
  },
  profile: {
    intro: 'Here you change your displayed name and your password.',
    steps: [
      'Adjust the name and save.',
      'To change the password, enter the current password and the new one twice.',
      'Use a strong, unique password.',
    ],
    note: 'Your email address and role can only be changed by an admin.',
  },
  'settings-ldap': {
    intro:
      'Via LDAP you import email recipients directly from your directory service (e.g. Active Directory or OpenLDAP) into groups.',
    steps: [
      'Enter host and port of the LDAP server (default: 389, LDAPS: 636).',
      'Choose encryption: LDAPS (SSL) or StartTLS — recommended for production.',
      'Provide the bind DN of a service account with read access, e.g. cn=svc,ou=service,dc=example,dc=com.',
      'Enter the bind password — it is stored encrypted and never shown again.',
      'Set the base DN below which users are searched, e.g. ou=users,dc=example,dc=com.',
      'If needed, adjust the user filter and attribute mapping (AD: email usually “mail”, first name “givenName”, last name “sn”).',
      'Click “Test connection” — it saves the values and checks connection and login.',
    ],
    note: 'The import itself then happens under Groups → “LDAP import”.',
  },
  'settings-oidc': {
    intro:
      'OIDC is an optional second sign-in via single sign-on. The local login remains the primary method — the app runs fully without OIDC.',
    steps: [
      'In your identity provider (Authentik, Keycloak, Entra ID, Okta, …) create a new OIDC application.',
      'Set the callback address as redirect URI: https://<your-domain>/api/auth/callback.',
      'Copy the issuer URL from the IdP (base URL of the OIDC discovery).',
      'Enter client ID and client secret — the secret is stored encrypted.',
      'Save and then toggle “Enable OIDC”: the SSO button appears on the sign-in page.',
    ],
    note: 'Users must exist as local accounts with a matching email so the SSO sign-in can be matched.',
  },
  'settings-smtp': {
    intro:
      'The global fallback SMTP is only used when a campaign has no dedicated sending profile. For custom sender identities, better create a sending profile.',
    steps: [
      'Enter host and port of your SMTP provider (works with any provider: IONOS, Hetzner, Mailgun, your own server, …).',
      'Choose the TLS mode matching the port: STARTTLS for port 587, SSL/TLS for port 465, unencrypted only for port 25 on an internal network.',
      'Enter the mailbox’s username and password — the password is stored encrypted.',
      'Set the sender address and name; the address must be authorized to send at the provider (mind SPF/DKIM).',
      'Click “Test connection” — it saves the values and checks connection and login.',
    ],
    note: 'On a fresh installation this page is pre-filled with the SMTP values from .env.',
  },
}

export const pageGuidance: Record<Lang, Record<string, Guidance>> = { de, en }

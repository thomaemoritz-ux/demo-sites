# Statische Demo-Websites

Vier eigenständige, statische Websites (HTML, CSS, JavaScript – ohne Build und
ohne Abhängigkeiten) im Ordner `ki-labels/`. Jede Seite gibt es in zwei
Varianten, die über den URL-Parameter `v` gewählt werden:

| Ordner | Seite |
|---|---|
| `ki-labels/site/` | VELORA V7 (Automobil) |
| `ki-labels/novae-site/` | NOVAÉ Skin (Kosmetik) |
| `ki-labels/nordfeld-site/` | NORDFELD (Einzelhandel) |
| `ki-labels/arlowe-site/` | ARLOWE (Mode) |

Alle Marken und Angebote sind fiktiv. Alle Seiten dienen nur der
Produktinformation (keine Kauffunktionen); jeder Link führt zu einem Abschnitt
derselben Seite. Das Kennzeichnungs-Icon ist das offizielle EU-Icon der
Europäischen Kommission (frei nutzbar ohne Namensnennung), auf allen Seiten
dieselbe Datei in `assets/`.

`ki-labels/index.html` ist eine Übersichtsseite mit allen Links.

## Lokal ansehen

```bash
python3 -m http.server 3000 --directory ki-labels/site
python3 -m http.server 3001 --directory ki-labels/novae-site
python3 -m http.server 3002 --directory ki-labels/nordfeld-site
python3 -m http.server 3004 --directory ki-labels/arlowe-site
```

Dann z. B. `http://localhost:3002/?v=a` bzw. `?v=b` öffnen.

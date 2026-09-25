# Statische Demo-Websites

Vier eigenständige, statische Websites (HTML, CSS, JavaScript – ohne Build und
ohne Abhängigkeiten). Jede Seite gibt es in zwei Varianten, die über den
URL-Parameter `v` gewählt werden:

| Ordner | Seite |
|---|---|
| `site/` | VELORA V7 (Automobil) |
| `novae-site/` | NOVAÉ Skin (Kosmetik) |
| `nordfeld-site/` | NORDFELD (Einzelhandel) |
| `arlowe-site/` | ARLOWE (Mode) |

Alle Marken und Angebote sind fiktiv.

## Lokal ansehen

```bash
python3 -m http.server 3000 --directory site
python3 -m http.server 3001 --directory novae-site
python3 -m http.server 3002 --directory nordfeld-site
python3 -m http.server 3004 --directory arlowe-site
```

Dann z. B. `http://localhost:3002/?v=a` bzw. `?v=b` öffnen.

Alle Seiten dienen nur der Produktinformation (keine Kauffunktionen). Jeder Link führt zu einem Abschnitt derselben Seite.

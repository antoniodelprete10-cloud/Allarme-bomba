# RADAR QN — Allarme bomba, chi decide e quando si evacua

Un diagramma decisionale **senza librerie esterne** e con controlli accessibili, responsive e progressivi, nello stile RADAR: bianco, grigi, accento `#059ADE`, Newsreader e Libre Franklin.

## Prova subito

Apri `index.html` in un browser. Scegli lo scenario, premi **Passaggio successivo** e, nei casi con ulteriori elementi di rischio, prova le due ipotesi riguardanti la decisione del questore.

## Pubblica su GitHub Pages

1. Crea un repository GitHub, ad esempio `radar-allarmi-bomba`.
2. Carica i file di questa cartella mantenendo i nomi e le sottocartelle.
3. Vai in **Settings → Pages → Build and deployment**, scegli **Deploy from a branch**, `main`, cartella `/ (root)`.
4. Il sito sarà disponibile all'indirizzo GitHub Pages indicato nelle impostazioni. Non serve alcuna build.

### File

- `index.html`: demo pubblicabile su GitHub Pages.
- `assets/radar.css`: stile RADAR.
- `assets/radar-flow.js`: motore interattivo e diagramma.
- `assets/scenari.js`: dati editoriali dei cinque casi.
- `flourish-template/`: porting verso un **template personalizzato** del Flourish SDK.

## Per passare a Flourish

**Attenzione: GitHub → Flourish non è un'importazione di HTML.** Il template è invece pronto nella cartella `flourish-template/`: Flourish supporta template personalizzati scritti in HTML/JavaScript e configurati in `template.yml`.

Richiede un account Flourish, Node.js >= 18 e npm >= 9, oltre all'accesso al Flourish SDK.

```bash
npm install -g @flourish/sdk
cd flourish-template
flourish run
# apre la preview locale su http://localhost:1685
flourish login
flourish publish --prerelease
# se il progetto è pronto, secondo il workflow del tuo account:
flourish publish --release
```

Il file `data/Scenari.csv` viene caricato tramite le associazioni di colonne definite in `template.yml`; si possono cambiare gli scenari dall'editor. **Questa cartella è predisposta secondo la documentazione SDK, ma non è stata pubblicata né collaudata nell'editor remoto di Flourish**. Controllare in anteprima il template prima di pubblicarlo.

Documentazione: https://developers.flourish.studio/sdk/getting-started/installation/

## Avvertenze editoriali

- Fonte: estratti ANSA del **13 novembre 2026, ore 14:10**, relativi alla circolare del ministro dell'Interno Piantedosi inviata a prefetti e questori.
- Il testo **integrale della circolare non è disponibile** nei materiali usati per il grafico: i passaggi sono parafrasi del lancio ANSA.
- In caso di minaccia seriale manifestamente inattendibile, l'evacuazione **non è automatica**; elementi concreti di rischio possono modificare la valutazione.
- Il **questore** può disporre verifiche e misure idonee; solo se lo ritiene necessario propone l'evacuazione al **prefetto**, che può disporla.
- Il Centro Situazioni del Dipartimento PS gestisce il raccordo informativo, **non decide l'evacuazione**.
- Le biforcazioni simulate non descrivono esiti necessari né suggeriscono al pubblico azioni di emergenza.
- L'espressione «servizi attivi se possibile» è stata sostituita con la formulazione più fedele: «Le attività non vanno interrotte se non è indispensabile per la sicurezza».

## Licenza

Codice rilasciato per revisione e riuso editoriale. La circolare e i lanci ANSA restano attribuiti alle rispettive fonti; non sono inclusi testi di agenzia integrali.

## Convenzione tipografica

Nei blocchi del diagramma l’ultima frase viene visualizzata senza punto finale. I punti tra frasi rimangono invariati; il comportamento è definito in `assets/radar-flow.js` e `flourish-template/static/radar-flow.js`.

# Salvatore Costanzo - Portale Web Unificato & Ecosistema Digitale

Benvenuto nel portale web unificato di **Salvatore Costanzo**. 
Questo ecosistema digitale raccoglie, organizza e rende fruibili in modalità **offline-first** (100% funzionante in locale e senza connessione internet) quattro progetti/sezioni principali, uniformandoli sotto una veste grafica premium, moderna e inclusiva.

---

## ⚙️ Architettura del Portale

Il progetto è suddiviso nelle seguenti cartelle e componenti:

1. **Portale Principale (Dashboard Hub)**: `index.html`
   - La pagina di atterraggio principale dotata di una griglia di card interattive che collegano le varie sezioni, fornendo informazioni riassuntive e link diretti ai manuali PDF italiani.
2. **Profilo Professionale**: `/salvatore/`
   - Curriculum, inquadramento professionale nella Pubblica Amministrazione, timeline formativa e configurazione dell'ecosistema hardware/AI.
3. **Pensiero Critico**: `/pensierocritico/`
   - Copia offline speculare e navigabile del portale divulgativo `https://www.pensierocritico.eu/` per lo studio delle euristiche, bias cognitivi, agnotologia e analisi delle fonti.
4. **Panasonic G9 Cinema**: `/g9/`
   - Guida strategica e manuale operativo per impostare il firmware e calibrare la fotocamera Panasonic Lumix G9 per riprese cinematografiche e V-Log L a 10-bit. Contiene il manuale ufficiale italiano in formato PDF.
5. **Zoom H5 Studio**: `/zoom/`
   - Manuale d'uso e configurazione per l'ottimizzazione dell'audio, cablaggio Line Out alla fotocamera, configurazione dei decibel e controllo remoto tramite modulo Bluetooth BTA-1 e smartphone. Contiene il manuale ufficiale e il Quick Tour in italiano.

---

## 🎨 Sistema di Accessibilità (10 Temi)

L'intero ecosistema è dotato di un selettore di temi posizionato in **alto a sinistra** su ogni pagina. Il sistema rispetta le linee guida di accessibilità **WCAG AA/AAA** per utenti con disabilità visive (es. daltonismo, ipovisione, affaticamento visivo).

I 10 temi disponibili sono:
1. **Scuro (Default)**: Cinematic Slate (sfondo nero/grigio ardesia profondo per eliminare l'affaticamento visivo, accenti ciano).
2. **Giorno (Chiaro)**: Sfondo grigio/azzurro chiarissimo e testo blu scuro ad alto contrasto.
3. **Contrasto Giallo**: Sfondo completamente nero e testi/bordi giallo puro (Conforme WCAG AAA per ipovedenti).
4. **Contrasto Blu**: Sfondo blu notte e testi/accenti bianco/oro (Conforme WCAG AAA).
5. **Sepia**: Sfondo caldo beige e testi marrone scuro per una lettura rilassante simile alla carta stampata.
6. **Verde Foresta**: Toni verde scuro e scritte verde smeraldo per amanti dei toni naturali.
7. **Notte Viola**: Toni violacei cyberpunk con scritte lilla e oro.
8. **Contrasto Verde**: Sfondo nero e testi verde neon ad altissima visibilità (Conforme WCAG AAA).
9. **Grigio Carbone**: Toni grigio carbone scuro e scritte bianco/ambra.
10. **Carta Lavagna**: Sfondo grigio lavagna chiaro con testo ardesia scuro.

### Come Funziona la Sincronizzazione:
Il tema selezionato dall'utente viene memorizzato nel `localStorage` del browser tramite lo script `shared-theme.js`. Quando l'utente naviga tra le diverse sezioni (es. passa dal profilo personale alla guida Zoom H5), la nuova pagina legge la preferenza e applica istantaneamente lo stesso tema, garantendo un'esperienza visiva coerente e priva di sfarfallii.

---

## 🛠️ Istruzioni per lo Sviluppo e Aggiunte Future

Se un'intelligenza artificiale (come Antigravity, Cursor, Copilot) o uno sviluppatore umano accede a questa cartella, deve seguire queste regole:

1. **Collegamenti Relativi**: Non usare mai percorsi assoluti come `/css/...` o `/images/...`. Usa sempre percorsi relativi (es. `../shared-theme.css`, `css/style.css`) per evitare di rompere il funzionamento offline del sito.
2. **Integrazione del Tema**: Ogni nuova pagina HTML creata deve includere le seguenti righe nell'intestazione `<head>`:
   ```html
   <link rel="stylesheet" href="../shared-theme.css">
   <script src="../shared-theme.js"></script>
   ```
   *(aggiustando il percorso relativo `../` in base alla profondità della cartella).*
3. **Manuali**: Non inserire o linkare manuali in lingue diverse dall'italiano. Qualsiasi PDF tecnico deve essere posizionato nelle rispettive cartelle (`g9/` o `zoom/`) e linkato localmente.
4. **Regole per le AI**: È presente un file `.cursorrules` nella radice del progetto che istruisce automaticamente gli assistenti AI su come operare in questo workspace.

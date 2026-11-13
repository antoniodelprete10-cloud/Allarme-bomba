window.RADAR_SCENARIOS = [
  {
    "id": "seriale",
    "label": "A · Email seriale senza altri indizi",
    "signal": "La stessa email, o un messaggio sostanzialmente analogo, viene inviata indiscriminatamente a più destinatari.",
    "risk": "Non risultano ulteriori elementi concreti riferiti allo specifico edificio.",
    "assessment": "Se la minaccia è manifestamente seriale, di norma è considerata inattendibile, salvo nuovi elementi di rischio.",
    "kind": "seriale",
    "source_note": "Il criterio riguarda messaggi identici o analoghi con medesima provenienza inviati indiscriminatamente a molti destinatari."
  },
  {
    "id": "oggetto",
    "label": "B · Viene trovato un oggetto sospetto",
    "signal": "Arriva una minaccia e, nel luogo interessato, viene segnalato il ritrovamento di un oggetto sospetto.",
    "risk": "Il rinvenimento di un oggetto sospetto è un possibile elemento aggiuntivo di rischio.",
    "assessment": "L’elemento concreto richiede verifiche: non significa che l’evacuazione scatti automaticamente.",
    "kind": "rischio",
    "source_note": "La circolare cita espressamente il rinvenimento di oggetti sospetti."
  },
  {
    "id": "video",
    "label": "C · Le telecamere mostrano un’anomalia",
    "signal": "Arriva una minaccia e l’impianto di videosorveglianza rileva un’anomalia.",
    "risk": "L’anomalia potrebbe essere ragionevolmente collegata alla minaccia.",
    "assessment": "Il collegamento va valutato: l’anomalia, da sola, non equivale a un ordine di evacuazione.",
    "kind": "rischio",
    "source_note": "La circolare indica anomalie rilevate anche mediante videosorveglianza, purché ragionevolmente collegate alla minaccia."
  },
  {
    "id": "precedenti",
    "label": "D · Ci sono precedenti o segnalazioni",
    "signal": "Arriva una minaccia e sono note segnalazioni o episodi precedenti riferiti al luogo.",
    "risk": "Informazioni o precedenti potrebbero indicare un rischio relativo allo specifico obiettivo.",
    "assessment": "Le informazioni disponibili sono valutate per stabilire se la minaccia sia plausibile.",
    "kind": "rischio",
    "source_note": "La circolare cita episodi, segnalazioni o elementi informativi riferibili allo specifico obiettivo."
  },
  {
    "id": "altro",
    "label": "E · Emergono altre circostanze concrete",
    "signal": "Arriva una minaccia e si rilevano ulteriori fatti concreti pertinenti al luogo.",
    "risk": "Le circostanze possono rendere necessario innalzare le misure di protezione.",
    "assessment": "Si valuta se i fatti concreti rendano la minaccia plausibile e quali misure siano necessarie.",
    "kind": "rischio",
    "source_note": "La circolare lascia aperta la possibilità di ulteriori circostanze concrete."
  }
];

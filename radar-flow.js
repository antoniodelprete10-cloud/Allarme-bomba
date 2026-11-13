(function(global){
  'use strict';
  function safe(value) {
    return String(value == null ? '' : value).replace(/[&<>"']/g, function(ch){
      return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch];
    });
  }
  function startCase(raw) {
    return {
      id:String(raw.id || ''),
      label:String(raw.label || ''),
      signal:String(raw.signal || ''),
      risk:String(raw.risk || ''),
      assessment:String(raw.assessment || ''),
      kind:String(raw.kind || 'seriale'),
      source_note:String(raw.source_note || '')
    };
  }
  function mount(root, cfg){
    if (!root) { throw new Error('RadarFlow: manca il contenitore.'); }
    var config=cfg || {};
    var cases=(config.scenarios || []).map(startCase);
    var selected=cases[0] ? cases[0].id : '';
    var stepCount=1, branch=null;
    var title=config.title || 'Allarme bomba, chi decide|E quando si evacua';
    var subtitle=config.subtitle || 'Scegli uno scenario e segui, un passaggio alla volta, le verifiche e le possibili decisioni.';
    function selectedCase(){return cases.find(function(x){return x.id===selected;}) || cases[0];}
    function steps(c){
      var result=[
        {actor:'01 / LA SEGNALAZIONE',heading:'Che cosa è successo',body:c.signal},
        {actor:'02 / GLI ELEMENTI DI RISCHIO',heading:c.kind==='seriale'?'Nessun elemento aggiuntivo':'Quale indizio è emerso',body:c.risk},
        {actor:'03 / LA VALUTAZIONE',heading:c.kind==='seriale'?'Di norma, minaccia inattendibile':'Il rischio deve essere valutato',body:c.assessment}
      ];
      if(c.kind==='seriale') {
        result.push({actor:'04 / L’ESITO',heading:'Non scatta l’evacuazione automatica',body:'In assenza di elementi di rischio specifici, il solo messaggio seriale non determina di per sé l’evacuazione. Se emergono nuove circostanze, il caso deve essere rivalutato.'});
      } else {
        result.push({actor:'04 / QUESTORE',heading:'Accertamenti e misure di sicurezza',body:'Il questore può disporre le verifiche e le misure ritenute opportune. Le attività non vanno interrotte se non è indispensabile per la sicurezza.'});
        result.push({actor:'05 / SCELTA DELL’AUTORITÀ',heading:'Il questore ritiene necessaria l’evacuazione?',body:'Esplora le due possibili decisioni. Si tratta di una simulazione esplicativa, non di una scelta demandata al lettore.',decision:true});
        if(branch==='si'){
          result.push({actor:'06 / QUESTORE',heading:'Propone l’evacuazione al prefetto',body:'Solo se la ritiene necessaria, il questore formula una proposta di evacuazione della struttura o del sito.'});
          result.push({actor:'07 / PREFETTO',heading:'Valuta se disporre l’evacuazione',body:'Il prefetto valuta la proposta e può disporre l’evacuazione. La proposta del questore non coincide con un ordine automatico.'});
        }
        if(branch==='no'){
          result.push({actor:'06 / MISURE DI SICUREZZA',heading:'Nessuna proposta di evacuazione',body:'Il questore non propone l’evacuazione: dispone le misure ritenute idonee, cercando di garantire la continuità delle attività quando possibile.'});
        }
      }
      return result;
    }
    function stepHtml(step, i, last) {
      return (i ? '<div class="radar-flow__connector" aria-hidden="true"></div>' : '')+
        '<section class="radar-flow__step'+(last?' radar-flow__step--current':'')+'" data-radar-step="'+i+'" aria-label="Passaggio '+(i+1)+'">'+
        '<div class="radar-flow__number" aria-hidden="true">'+String(i+1).padStart(2,'0')+'</div>'+
        '<div class="radar-flow__content"><div class="radar-flow__actor">'+safe(step.actor)+'</div>'+
        '<h3 class="radar-flow__heading">'+safe(step.heading)+'</h3>'+
        '<p class="radar-flow__body">'+safe(String(step.body).replace(/\.\s*$/, ''))+'</p>'+
        (step.decision ? '<div class="radar-flow__branch" role="group" aria-label="Simula la scelta del questore">'+
          '<button class="radar-flow__decision" type="button" data-branch="si" aria-pressed="'+(branch==='si')+'">Sì, l’evacuazione è ritenuta necessaria</button>'+
          '<button class="radar-flow__decision" type="button" data-branch="no" aria-pressed="'+(branch==='no')+'">No, non è ritenuta necessaria</button></div>' : '')+
        '</div></section>';
    }
    function render(){
      var c=selectedCase();
      if(!c){root.innerHTML='<p>Nessuno scenario disponibile.</p>';return;}
      var flowSteps=steps(c);
      var shown=Math.min(stepCount,flowSteps.length);
      var headingParts=String(title).split('|');
      var html='<div class="radar-flow">'+
        '<header><div class="radar-flow__eyebrow">La sicurezza nelle scuole</div>'+
        '<h1 class="radar-flow__title">'+headingParts.map(function(t){return '<span>'+safe(t)+'</span>';}).join('')+'</h1>'+
        '<p class="radar-flow__subtitle">'+safe(subtitle)+'</p></header>'+
        '<div class="radar-flow__separator"></div>'+
        '<section class="radar-flow__controls" aria-label="Esplora gli scenari">'+
        '<div class="radar-flow__selectgroup"><label class="radar-flow__label" for="radar-scenario">Che cosa viene segnalato?</label>'+
        '<select class="radar-flow__select" id="radar-scenario">'+cases.map(function(a){return '<option value="'+safe(a.id)+'"'+(a.id===selected?' selected':'')+'>'+safe(a.label)+'</option>';}).join('')+'</select></div>'+
        '<button type="button" class="radar-flow__restart" data-restart>Ricomincia</button></section>'+
        '<p class="radar-flow__hint">Seleziona il caso e usa «Passaggio successivo». La sequenza ricostruisce le competenze, non sostituisce le decisioni delle autorità.</p>'+
        '<div class="radar-flow__path" aria-live="polite" aria-relevant="additions text">'+
        flowSteps.slice(0,shown).map(function(st,i){return stepHtml(st,i,i===shown-1);}).join('')+'</div>';
      if(shown<flowSteps.length) html+='<div class="radar-flow__progress"><button class="radar-flow__next" type="button" data-next>Passaggio successivo <svg aria-hidden="true" viewBox="0 0 24 24" fill="none"><path d="M5 12h14m-6-6 6 6-6 6" stroke="currentColor" stroke-width="1.5"/></svg></button><span class="radar-flow__count">'+shown+' di '+flowSteps.length+' passaggi</span></div>';
      else if(c.kind==='rischio' && !branch) html+='<p class="radar-flow__hint">Seleziona una delle due ipotesi per proseguire.</p>';
      else html+='<div class="radar-flow__outcome"><p><strong>Attenzione:</strong> '+(c.kind==='seriale'?'la serialità non esclude la possibilità che emergano nuovi elementi di rischio.':'le verifiche e l’eventuale evacuazione dipendono dalle valutazioni delle autorità competenti.')+'</p></div>';
      html+='<footer class="radar-flow__meta"><div class="radar-flow__meta-title">Chi coordina le informazioni</div>'+
        '<p><strong>Centro Situazioni del Dipartimento della pubblica sicurezza:</strong> raccordo informativo con gli uffici territoriali, operativo 24 ore su 24. Non decide l’evacuazione.</p>'+
        '<p><strong>Fonte:</strong> ANSA, 13 novembre 2026 (estratti dalla circolare del Viminale). '+safe(c.source_note)+'</p>'+
        '<p>Schema giornalistico esemplificativo, basato su estratti di agenzia e non sul testo integrale della circolare. Non costituisce una procedura operativa per emergenze.</p></footer></div>';
      root.innerHTML=html;
    }
    function onClick(event){
      var btn=event.target.closest('button');
      if(!btn||!root.contains(btn))return;
      if(btn.hasAttribute('data-next')){stepCount++;render();focusLast();}
      else if(btn.hasAttribute('data-restart')){stepCount=1;branch=null;render();root.querySelector('#radar-scenario').focus();}
      else if(btn.hasAttribute('data-branch')){branch=btn.getAttribute('data-branch');stepCount=branch==='si'?7:6;render();focusLast();}
    }
    function focusLast(){
      var last=root.querySelector('.radar-flow__step--current');
      if(last){last.setAttribute('tabindex','-1');last.focus({preventScroll:true});if(!window.matchMedia('(prefers-reduced-motion: reduce)').matches){last.scrollIntoView({behavior:'smooth',block:'nearest'});}}
    }
    function onChange(event){if(event.target && event.target.id==='radar-scenario'){selected=event.target.value;stepCount=1;branch=null;render();}}
    root.addEventListener('click',onClick);
    root.addEventListener('change',onChange);
    render();
    return {setOptions:function(options){
      var o=options||{};
      if(o.scenarios){cases=o.scenarios.map(startCase);if(!cases.some(function(c){return c.id===selected;})){selected=cases[0]?cases[0].id:'';stepCount=1;branch=null;}}
      if(o.title!==undefined)title=o.title;
      if(o.subtitle!==undefined)subtitle=o.subtitle;
      render();
    },destroy:function(){root.removeEventListener('click',onClick);root.removeEventListener('change',onChange);root.innerHTML='';}};
  }
  global.RadarFlow={mount:mount};
})(window);

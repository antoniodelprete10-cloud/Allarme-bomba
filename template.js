/* FLOURISH SDK v3 — template JavaScript senza dipendenze */
(function(){
  var data = { scenari: [] };
  var state = {
    chart_title: 'Allarme bomba, chi decide|E quando si evacua',
    chart_subtitle: 'Scegli il caso e segui, passo dopo passo, le verifiche e le eventuali decisioni delle autorità.'
  };
  var chart = null;
  function scenarios(){
    return (data.scenari || []).map(function(r){
      return {id:r.id,label:r.label,signal:r.signal,risk:r.risk,
              assessment:r.assessment,kind:r.kind,source_note:r.source_note};
    });
  }
  function draw(){
    var root = document.getElementById('radar-root');
    if (chart) chart.destroy();
    chart=window.RadarFlow.mount(root,{
      scenarios: scenarios(),title: state.chart_title,subtitle: state.chart_subtitle
    });
  }
  function update(){
    if(!chart) return draw();
    chart.setOptions({scenarios:scenarios(),title:state.chart_title,subtitle:state.chart_subtitle});
  }
  window.template={data:data,state:state,draw:draw,update:update};
})();

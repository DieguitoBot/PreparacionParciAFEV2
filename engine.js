// A bounded value parser, never an evaluator of arbitrary VDM++ code.
export function parseValue(source) {
 const s=source.trim(); let i=0;
 const ws=()=>{while(/\s/.test(s[i]||'')&&i<s.length)i++};
 function value(){ws(); const c=s[i];
  if(c==='"'||c==="'"){const quote=c;let str='';i++;while(i<s.length&&s[i]!==quote){if(s[i]==='\\'){i++;if(i>=s.length)throw Error('Escape incompleto');}str+=s[i++];}if(s[i++]!==quote)throw Error('Comillas sin cerrar');if(quote==="'"&&[...str].length!==1)throw Error('Un char debe tener un carácter');return [quote==='"'?'text':'char',str];}
  if(c==='<'){const m=s.slice(i).match(/^<([A-Za-z]\w*)>/);if(!m)throw Error('Quote inválido');i+=m[0].length;return ['quote',m[1]];}
  if(c==='{'||c==='['){i++;ws();const end=c==='{'?'}':']';if(s.slice(i,i+3)==='|->'&&c==='{'){i+=3;ws();if(s[i++]!==end)throw Error('Mapa vacío inválido');return ['map',[]];}
   const entries=[];let map=null;if(s[i]!==end)while(true){let a=value();ws();let pair=s.slice(i,i+3)==='|->';if(map===null)map=pair;if(map!==pair||pair&&c==='[')throw Error('Estructura mixta inválida');if(pair){i+=3;a=[a,value()];}entries.push(a);ws();if(s[i]!==',')break;i++;}if(s[i++]!==end)throw Error('Falta cerrar la estructura');
   if(c==='[')return ['seq',entries];
   if(map){const keys=new Map();for(const [k,v]of entries){const key=JSON.stringify(k);if(keys.has(key)&&JSON.stringify(keys.get(key))!==JSON.stringify(v))throw Error('Mapa incompatible: una clave tiene dos valores');keys.set(key,v);}return ['map',[...keys].sort((a,b)=>a[0].localeCompare(b[0]))];}
   return ['set',[...new Set(entries.map(x=>JSON.stringify(x)))].sort()];
  }
  const token=s.slice(i).match(/^(true|false|verdadero|falso|sí|si|no|nil|-?\d+(?:\.\d+)?)/i);if(!token)throw Error('Usa un valor: número, booleano, quote, texto, conjunto, secuencia o mapa');i+=token[0].length;const t=token[0].toLowerCase();return /^(true|verdadero|sí|si)$/.test(t)?['bool',true]:/^(false|falso|no)$/.test(t)?['bool',false]:t==='nil'?['nil']:['number',Number(t)];
 }
 const result=value();ws();if(i!==s.length)throw Error('Contenido adicional no reconocido');return result;
}
export function equalValue(a,b){return JSON.stringify(parseValue(a))===JSON.stringify(parseValue(b));}
export function grade(q,answer){if(q.type==='open')return null;if(q.type==='choice')return answer===q.answer;try{return equalValue(answer,q.answer);}catch{return false;}}
export function shuffled(options,random=Math.random){const a=[...options];for(let i=a.length-1;i>0;i--){const j=Math.floor(random()*(i+1));[a[i],a[j]]=[a[j],a[i]];}return a;}
export const transitions=[
 ['IDLE','coin','SELECT','true','Sin cambio'],['SELECT','water','W','nwater > 0','Sin cambio'],['SELECT','cola','C','ncola > 0','Sin cambio'],['W','get_water','IDLE','true','nwater := nwater - 1'],['C','get_cola','IDLE','true','ncola := ncola - 1'],['SELECT','ret_coin','IDLE','nwater = 0 and ncola = 0','Sin cambio'],['IDLE','refill','IDLE','true','nwater := max; ncola := max']];
export function enabled(s,action){const t=transitions.find(t=>t[1]===action);return !!t&&t[0]===s.loc&&(action!=='water'||s.water>0)&&(action!=='cola'||s.cola>0)&&(action!=='ret_coin'||s.water===0&&s.cola===0);}
export function vend(s,action){if(!enabled(s,action))return s;return {...s,loc:transitions.find(t=>t[1]===action)[2],water:action==='refill'?s.max:s.water-(action==='get_water'?1:0),cola:action==='refill'?s.max:s.cola-(action==='get_cola'?1:0)};}
export function cycle(s){if(s.loc==='l3')return s;if(s.loc==='l1')return {...s,loc:s.x>0?'l2':'l3'};return {loc:'l1',x:s.x-(s.x%2===0?2:1)};}
export function plantCheck(p){const errors=[];for(const [period,ids]of Object.entries(p.schedule)){if(!ids.length)errors.push(`Turno ${period}: está vacío (primera condición).`);for(const alarm of p.alarms){if(!ids.some(id=>p.experts[id]?.includes(alarm)))errors.push(`Turno ${period}: falta un experto con <${alarm}> (segunda condición).`);}}return errors;}
export function candidates(p,period,alarm){if(!(period in p.schedule)||!p.alarms.includes(alarm))throw Error('Precondición: alarma y periodo deben estar registrados');return p.schedule[period].filter(id=>p.experts[id]?.includes(alarm));}
export function expire(exam,now=Date.now()){if(exam&&!exam.submitted&&now>=exam.deadline){exam.submitted=true;exam.submittedAt=now;}return exam;}
export function score(exam,questions){let automatic=0,autoMax=0,self=0,pending=0;for(const q of questions){if(q.type==='open'){if(Number.isFinite(exam.self?.[q.id]))self+=exam.self[q.id];else pending+=q.points;}else{autoMax+=q.points;if(grade(q,exam.answers[q.id]||''))automatic+=q.points;}}return {automatic,autoMax,self,pending};}

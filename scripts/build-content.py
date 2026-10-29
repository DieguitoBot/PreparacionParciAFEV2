import re,json,pathlib,html
src=pathlib.Path('contexto_parcial_2.md').read_text()
def inline(s):
 s=html.escape(s)
 s=re.sub(r'`([^`]+)`',r'<code>\1</code>',s)
 return re.sub(r'\*\*([^*]+)\*\*',r'<strong>\1</strong>',s)
def render(s):
 out=[]; code=False; table=False
 for line in s.splitlines():
  if line.startswith('```'):
   if table: out.append('</tbody></table></div>');table=False
   out.append('</code></pre>' if code else '<pre><code>');code=not code;continue
  if code:out.append(html.escape(line)+'\n');continue
  if line.startswith('|'):
   if re.match(r'^\|[\s:|\-]+$',line):continue
   if not table:out.append('<div class="table-scroll"><table><tbody>');table=True
   out.append('<tr>'+''.join('<td>'+inline(c.strip())+'</td>' for c in re.split(r' \| ',line.strip().strip('|').strip()))+'</tr>');continue
  if table:out.append('</tbody></table></div>');table=False
  if not line.strip():continue
  m=re.match(r'^(#{1,6}) (.*)',line)
  if m:out.append(f'<h{min(len(m[1])+1,6)}>'+inline(m[2])+f'</h{min(len(m[1])+1,6)}>')
  else:out.append('<p>'+inline(line)+'</p>')
 if table:out.append('</tbody></table></div>')
 return '\n'.join(out)
sections={int(m[1]):m[2] for m in re.finditer(r'^## (\d+)\. (.*?)(?=^## |\Z)',src,re.M|re.S)}
questions=[]
for line in sections[13].splitlines():
 if not re.match(r'\| [A-Z]+-\d+',line):continue
 id,topic,rest=line[2:-2].split(' | ',2)
 prompt,solution=rest.rsplit(' | ',1)
 prefix=id.split('-')[0]
 module={'LOG':6,'TIP':7,'SET':8,'SEQ':9,'MAP':9,'COV':10,'MC':11,'TS':12,'DAT':13,'PLA':9}[prefix]
 questions.append(dict(id=id,topic=topic,module=module,origin='Ejercicio nuevo',source=f'S{module:02}',difficulty='Básica' if int(id[-2:])<4 else 'Media',prompt=prompt.replace('`',''),data='',answer=solution.replace('`',''),explanation=solution.replace('`',''),type='open',hints=['Identifica el tipo de dato y el operador antes de calcular.',solution.split(':')[ -1].replace('`','')],error='Revisa el alcance del operador y diferencia datos, posiciones y valores distintos.'))
data={'modules':[{'session':n,'title':{6:'Contratos y lógica',7:'Tipos VDM++',8:'Conjuntos',9:'Secuencias, mapas y Plant',10:'Cobertura',11:'Model checking',12:'Sistemas de transición',13:'Programas con datos'}[n],'html':render(sections[n-2])} for n in range(6,14)],'questions':questions,'examReference':render(sections[12]),'plantReference':render(sections[12].split('### 12.4.')[1]),'studentData':re.search(r'### 12.2.*?```vdmpp\n(.*?)```',src,re.S)[1]}
pathlib.Path('content.js').write_text('export const content = '+json.dumps(data,ensure_ascii=False)+';\n')
print(f'Generados 8 módulos y {len(questions)} ejercicios del banco.')

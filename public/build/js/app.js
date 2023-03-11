let paso=1;const pasoInicial=1,pasoFinal=3,cita={id:"",nombre:"",fecha:"",hora:"",servicios:[]};function startApp(){viewSecction(),tabs(),botonesPaginador(),pagSiguiente(),pagAnterior(),checkAPI(),idClient(),nameClient(),selectionDate(),selectionTime(),viewResumen()}function viewSecction(){const e=document.querySelector(".mostrar");e&&e.classList.remove("mostrar");const t="#paso"+paso;document.querySelector(t).classList.add("mostrar");const n=document.querySelector(".actual");n&&n.classList.remove("actual");document.querySelector(`[data-paso="${paso}"]`).classList.add("actual")}function tabs(){document.querySelectorAll(".tabs button").forEach(e=>{e.addEventListener("click",(function(e){e.preventDefault(),paso=parseInt(e.target.dataset.paso),viewSecction(),botonesPaginador()}))})}function botonesPaginador(){const e=document.querySelector("#siguiente"),t=document.querySelector("#anterior");1===paso?(t.classList.add("ocultar"),e.classList.remove("ocultar")):3===paso?(t.classList.remove("ocultar"),e.classList.add("ocultar"),viewResumen()):(t.classList.remove("ocultar"),e.classList.remove("ocultar")),viewSecction()}function pagAnterior(){document.querySelector("#anterior").addEventListener("click",(function(){paso<=1||(paso--,botonesPaginador())}))}function pagSiguiente(){document.querySelector("#siguiente").addEventListener("click",(function(){paso>=3||(paso++,botonesPaginador())}))}async function checkAPI(){try{const e="http://localhost:3000/api/servicios",t=await fetch(e);viewServices(await t.json())}catch(e){console.log(e)}}function viewServices(e){e.forEach(e=>{const{id:t,nombre:n,precio:o,descripcion:c}=e,a=document.createElement("P");a.classList.add("nombreServicio"),a.textContent=n;const i=document.createElement("P");i.classList.add("precioServicio"),i.textContent="$ "+o;const s=document.createElement("P");s.classList.add("descripcionServicio"),s.textContent=c;const r=document.createElement("DIV");r.classList.add("servicio"),r.dataset.idServicio=t,r.onclick=function(){selectService(e)},r.appendChild(a),r.appendChild(i),r.appendChild(s),document.querySelector("#servicios").appendChild(r)})}function selectService(e){const{id:t}=e,{servicios:n}=cita,o=document.querySelector(`[data-id-servicio="${t}"]`);n.some(e=>e.id===t)?(cita.servicios=n.filter(e=>e.id!==t),o.classList.remove("seleccionado")):(cita.servicios=[...n,e],o.classList.add("seleccionado")),console.log(cita)}function idClient(){const e=document.querySelector("#id").value;cita.id=e}function nameClient(){const e=document.querySelector("#nombre").value;cita.nombre=e}var getSelectedDate,getSelectedTime;function selectionDate(){document.querySelector("#fecha").addEventListener("input",(function(e){const t=new Date(e.target.value).getUTCDay();[6,0].includes(t)?(e.target.value="",viewAlert("Los fines de semana no atendemos","error",".formulario"),console.log("Los fines de semana no atendemos")):cita.fecha=e.target.value}))}function selectionTime(){getSelectedTime()}function viewAlert(e,t,n,o=!0){const c=document.querySelector(".alerta");c&&c.remove();const a=document.createElement("DIV");a.textContent=e,a.classList.add("alerta"),a.classList.add(t);document.querySelector(n).appendChild(a),o&&setTimeout(()=>{a.remove()},3e3)}function viewResumen(){const e=document.querySelector(".contenido-resumen");for(;e.firstChild;)e.removeChild(e.firstChild);if(Object.values(cita).includes("")||0===cita.servicios.length)return void viewAlert("Faltan datos de Servicios, Fecha u Hora","error",".contenido-resumen",!1);const{nombre:t,fecha:n,hora:o,servicios:c}=cita,a=document.createElement("H3");a.textContent="Resumen de Servicios",e.appendChild(a),c.forEach(t=>{const{id:n,precio:o,nombre:c,descripcion:a}=t,i=document.createElement("DIV");i.classList.add("contenedorServicio");const s=document.createElement("P");s.textContent=c;const r=document.createElement("P");r.innerHTML="<span>Incluye </span>"+a;const d=document.createElement("P");d.innerHTML="<span>Precio: </span>$"+o,i.appendChild(s),i.appendChild(r),i.appendChild(d),e.appendChild(i)});const i=document.createElement("H3");i.textContent="Resumen de Cita",e.appendChild(i);const s=document.createElement("P");s.innerHTML="<span>Nombre: </span>"+t;const r=new Date(n),d=r.getMonth(),l=r.getDate()+2,u=r.getFullYear(),m=new Date(Date.UTC(u,d,l)).toLocaleDateString("es-ES",{weekday:"long",year:"numeric",month:"long",day:"numeric"});console.log(m);const p=document.createElement("P");p.innerHTML="<span>Fecha: </span>"+m;const v=document.createElement("P");v.innerHTML=`<span>Hora: </span>${o} Horas`;const h=document.createElement("BUTTON");h.classList.add("boton"),h.textContent="Reservar Cita",h.onclick=reservarCita,e.appendChild(s),e.appendChild(p),e.appendChild(v),e.appendChild(h)}async function reservarCita(){const{nombre:e,fecha:t,hora:n,servicios:o,id:c}=cita,a=o.map(e=>e.id),i=new FormData;i.append("fecha",t),i.append("hora",n),i.append("usuarioId",c),i.append("servicios",a);try{const e="http://localhost:3000/api/servicios",t=await fetch(e,{method:"POST",body:i}),n=await t.json();console.log(n.resultado),n.resultado&&Swal.fire({icon:"error",title:"Error",text:"Algo salio mal al guardar la cita"})}catch(e){Swal.fire({icon:"success",title:"Cita Creada",text:"Cita Creada Exitosamente",button:"Ok"}).then(()=>{setTimeout(()=>{window.location.reload()},3e3)})}}document.addEventListener("DOMContentLoaded",(function(){startApp()})),$((function(e){getSelectedDate=function(t){e("#hora").on("changeTime",(function(){return console.log(getSelectedDate),e(this).val()}))}})),$((function(e){getSelectedTime=function(){e("#hora").on("changeTime",(function(){cita.hora=e(this).val()}))}}));
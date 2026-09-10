    // ----------------------------------------------
    // Lo básico: login medio simple (pero funciona)
    // ----------------------------------------------
    const loginScreen = document.getElementById('loginScreen');
    const mainApp = document.getElementById('mainApp');
    const loginForm = document.getElementById('loginForm');
    const logoutBtn = document.getElementById('logoutBtn');
    const userNameSpan = document.getElementById('userNameDisplay');

    // Credenciales quemadas porque es solo una demo, nada fancy
    const validUser = "admin";
    const validPass = "santamarta2026";

    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        let user = document.getElementById('username').value.trim();
        let pass = document.getElementById('password').value.trim();
        
        if(user === validUser && pass === validPass) {
            // Guardamos en sessionStorage para mantener la sesión mientras no cierren el navegador
            sessionStorage.setItem('loggedIn', 'true');
            sessionStorage.setItem('username', user);
            showApp(user);
        } else {
            alert("Credenciales incorrectas. Prueba con admin / santamarta2026");
        }
    });

    function showApp(username) {
        loginScreen.style.display = 'none';
        mainApp.style.display = 'block';
        userNameSpan.innerText = username;
        // Cargamos la primera pestaña por defecto
        loadSection('problematica');
        highlightActiveButton('problematica');
    }

    logoutBtn.addEventListener('click', () => {
        sessionStorage.clear();
        loginScreen.style.display = 'flex';
        mainApp.style.display = 'none';
        // Limpiamos los campos del login por si las moscas
        document.getElementById('username').value = '';
        document.getElementById('password').value = '';
    });

    // Si ya había sesión activa, la respetamos
    window.addEventListener('DOMContentLoaded', () => {
        if(sessionStorage.getItem('loggedIn') === 'true') {
            let user = sessionStorage.getItem('username') || 'Operador';
            showApp(user);
        } else {
            loginScreen.style.display = 'flex';
            mainApp.style.display = 'none';
        }
    });

    // Para marcar el botón activo en el menú
    function highlightActiveButton(sectionId) {
        document.querySelectorAll('.cat-btn').forEach(btn => {
            if(btn.getAttribute('data-section') === sectionId) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });
    }

    // Variable global para la gráfica (por si la necesitamos actualizar después)
    let miGraficaPresion = null;

    // Esta función es la que pinta todo el contenido según la pestaña seleccionada
    function loadSection(section) {
        const contentDiv = document.getElementById('dynamicContent');
        let htmlContent = '';
        
        // Dependiendo de la sección, armamos el HTML con sus cositas interactivas
        if(section === 'problematica') {
            htmlContent = `
                <div class="card-info">
                    <div class="section-title"><i class="fas fa-bug"></i> Problemática - Simulador de mejora</div>
                    <p><strong>Santa Marta:</strong> Fugas no detectadas, niveles bajos, falta de monitoreo.</p>
                    <div class="feature-card">
                        <i class="fas fa-chart-simple"></i> <strong>Pérdida actual de agua tratada:</strong>
                        <div style="height:10px; background:#eee; border-radius:10px; margin:10px 0;">
                            <div id="barraPerdida" style="width:72%; height:10px; background:#c0392b; border-radius:10px;"></div>
                        </div>
                        <p>Porcentaje de pérdida: <span id="porcentajePerdida">32</span>%</p>
                        <button class="small-btn" id="btnSimularMejora"><i class="fas fa-chart-line"></i> Simular impacto del IoT</button>
                        <span id="mensajeMejora"></span>
                    </div>
                </div>
            `;
        } 
        else if(section === 'viabilidad') {
            htmlContent = `
                <div class="card-info">
                    <div class="section-title"><i class="fas fa-chart-pie"></i> Viabilidad - Calculadora de ahorro</div>
                    <div class="grid-cards">
                        <div class="feature-card">
                            <strong>💰 Ahorro por reducción de fugas</strong><br>
                            <label>Pérdida anual actual (m³): </label>
                            <input type="number" id="inputPerdidaAnual" value="450000" style="width:100%; margin:8px 0; padding:5px;">
                            <button id="btnCalcularAhorro" class="small-btn">Calcular ahorro</button>
                            <p id="resultadoAhorro" style="margin-top:10px; font-weight:bold;"></p>
                        </div>
                        <div class="feature-card">
                            <strong>📡 Componentes tecnológicos</strong>
                            <button id="btnVerComponentes" class="small-btn">Ver detalles</button>
                            <div id="detalleComponentes" style="display:none; margin-top:8px;">✅ Sensores de presión, caudal, nivel. Gateway LoRa, dashboard en la nube.</div>
                        </div>
                    </div>
                </div>
            `;
        }
        else if(section === 'objetivos') {
            htmlContent = `
                <div class="card-info">
                    <div class="section-title"><i class="fas fa-bullseye"></i> Objetivos - Seguimiento manual</div>
                    <ul id="listaObjetivos" style="list-style:none;">
                        <li><i class="far fa-circle"></i> Detectar fugas en tiempo real <button class="small-btn" data-obj="fugas">Marcar</button></li>
                        <li><i class="far fa-circle"></i> Monitorear niveles de agua <button class="small-btn" data-obj="niveles">Marcar</button></li>
                        <li><i class="far fa-circle"></i> Enviar alertas automáticas <button class="small-btn" data-obj="alertas">Marcar</button></li>
                        <li><i class="far fa-circle"></i> Reducir pérdida hídrica <button class="small-btn" data-obj="perdida">Marcar</button></li>
                    </ul>
                    <div style="margin-top:15px; background:#e9ecef; border-radius:20px; height:20px;">
                        <div id="barraProgreso" style="width:0%; background:#0f6b4c; height:20px; border-radius:20px; text-align:center; color:white; font-size:12px;"></div>
                    </div>
                    <p id="mensajeFinalObjetivos"></p>
                </div>
            `;
        }
        else if(section === 'foda') {
            htmlContent = `
                <div class="card-info">
                    <div class="section-title"><i class="fas fa-chart-simple"></i> FODA interactivo</div>
                    <div class="grid-cards">
                        <div class="feature-card">
                            <strong>⚠️ ¿Cuál amenaza es más crítica?</strong><br>
                            <button data-amenaza="Vandalismo" class="small-btn">Vandalismo</button>
                            <button data-amenaza="Falta presupuesto" class="small-btn">Falta presupuesto</button>
                            <button data-amenaza="Desastres naturales" class="small-btn">Desastres naturales</button>
                            <p id="resultadoVotos" style="margin-top:10px;">Votos: ninguno aún</p>
                        </div>
                        <div class="feature-card">
                            <strong>💪 Fortaleza principal</strong><br>
                            <p>Tecnología IoT moderna y eficiencia operativa.</p>
                            <button id="btnApoyarFortaleza" class="small-btn"><i class="fas fa-thumbs-up"></i> Apoyar</button>
                            <span id="contadorApoyos">0</span> personas apoyan
                        </div>
                    </div>
                </div>
            `;
        }
        else if(section === 'rf') {
            htmlContent = `
                <div class="card-info">
                    <div class="section-title"><i class="fas fa-clipboard-list"></i> Requerimientos funcionales</div>
                    <input type="text" id="filtroRF" placeholder="🔍 Filtrar..." style="margin-bottom:1rem; padding:8px; border-radius:30px; width:100%;">
                    <div id="tablaRF">
                        <table style="width:100%">
                            <thead><tr><th>Requerimiento</th><th>Prioridad</th></tr></thead>
                            <tbody>
                                <tr><td>Monitoreo de presión</td><td>Alta</td></tr>
                                <tr><td>Monitoreo nivel tanques</td><td>Alta</td></tr>
                                <tr><td>Detección de fugas</td><td>Alta</td></tr>
                                <tr><td>Alertas automáticas</td><td>Alta</td></tr>
                                <tr><td>Visualización de datos</td><td>Media</td></tr>
                            </tbody>
                        </table>
                    </div>
                    <button id="btnMostrarNRF" class="small-btn">Mostrar no funcionales</button>
                    <div id="detalleNRF" style="margin-top:10px;"></div>
                </div>
            `;
        }
        else if(section === 'monitoreo') {
            htmlContent = `
                <div class="card-info">
                    <div class="section-title"><i class="fas fa-tachometer-alt"></i> Monitoreo IoT en vivo</div>
                    <div class="grid-cards">
                        <div class="feature-card"><i class="fas fa-water-pressure"></i> Presión: <span id="presionLive">2.4</span> bar <button id="btnActualizarSensores" class="small-btn">Actualizar</button></div>
                        <div class="feature-card"><i class="fas fa-fill-drip"></i> Nivel tanque: <span id="nivelLive">78</span>% <span id="estadoNivelLive" class="badge">Normal</span></div>
                        <div class="feature-card"><i class="fas fa-tint"></i> Caudal: <span id="caudalLive">125</span> L/s</div>
                    </div>
                    <canvas id="graficaPresion" width="400" height="200" style="max-height:240px"></canvas>
                    <button id="btnSimularFuga" class="btn-login" style="background:#c0392b; margin-top:0.5rem;">⚠️ Simular fuga (prueba)</button>
                    <div id="alertasMonitoreo"></div>
                </div>
            `;
        }
        else if(section === 'alertas') {
            htmlContent = `
                <div class="card-info">
                    <div class="section-title"><i class="fas fa-bell"></i> Centro de alertas</div>
                    <div id="contenedorAlertas">
                        <div class="alert-sim"><i class="fas fa-info-circle"></i> Sistema listo. Eventos recientes:</div>
                    </div>
                    <button id="btnGenerarAlerta" class="small-btn"><i class="fas fa-plus-circle"></i> Generar alerta de prueba</button>
                    <button id="btnLimpiarAlertas" class="small-btn">Limpiar historial</button>
                </div>
            `;
        }
        else if(section === 'sostenibilidad') {
            htmlContent = `
                <div class="card-info">
                    <div class="section-title"><i class="fas fa-seedling"></i> Sostenibilidad - Ahorro de agua</div>
                    <p>Con IoT se estima una reducción de fugas significativa.</p>
                    <label>Reducción esperada: <span id="valorSlider">30</span>%</label>
                    <input type="range" id="sliderReduccion" min="0" max="60" value="30" style="width:100%">
                    <p>💧 Agua ahorrada al año: <strong id="aguaAhorradaAnual">135,000</strong> m³</p>
                    <button id="btnActualizarAhorro" class="small-btn">Actualizar proyección</button>
                    <div class="feature-card" style="margin-top:1rem;"><strong>Aliados:</strong> Alcaldía, Corpamag, Universidad del Magdalena.</div>
                </div>
            `;
        }
        else if(section === 'reportes') {
            htmlContent = `
                <div class="card-info">
                    <div class="section-title"><i class="fas fa-file-alt"></i> Generador de reportes</div>
                    <div class="grid-cards">
                        <div class="feature-card">
                            <strong>📄 Reporte de fugas</strong>
                            <button id="btnGenerarReporte" class="small-btn">Generar resumen</button>
                            <pre id="textoReporte" style="background:#f8f9fa; padding:10px; border-radius:12px; margin-top:10px;"></pre>
                        </div>
                        <div class="feature-card">
                            <strong>📈 Simular informe mensual</strong>
                            <button id="btnSimularInforme" class="small-btn">Generar informe</button>
                            <div id="resultadoInforme"></div>
                        </div>
                    </div>
                </div>
            `;
        }

        contentDiv.innerHTML = htmlContent;
        
        // Después de inyectar el HTML, conectamos los eventos de cada sección
        // (cada función busca los botones y les asigna comportamiento)
        if(section === 'problematica') conectarProblematica();
        if(section === 'viabilidad') conectarViabilidad();
        if(section === 'objetivos') conectarObjetivos();
        if(section === 'foda') conectarFoda();
        if(section === 'rf') conectarRF();
        if(section === 'monitoreo') conectarMonitoreo();
        if(section === 'alertas') conectarAlertas();
        if(section === 'sostenibilidad') conectarSostenibilidad();
        if(section === 'reportes') conectarReportes();
    }

    // ----------------------------------------------
    // Funciones para conectar la lógica de cada pestaña
    // (lo hago por separado para no enredar todo)
    // ----------------------------------------------
    function conectarProblematica() {
        let btn = document.getElementById('btnSimularMejora');
        if(btn) {
            btn.onclick = () => {
                let perdidaSpan = document.getElementById('porcentajePerdida');
                let barra = document.getElementById('barraPerdida');
                let actual = parseInt(perdidaSpan.innerText);
                let nueva = Math.max(10, actual - 8);
                perdidaSpan.innerText = nueva;
                barra.style.width = nueva + '%';
                document.getElementById('mensajeMejora').innerHTML = '✅ Con IoT las pérdidas bajan drásticamente';
                setTimeout(() => { if(document.getElementById('mensajeMejora')) document.getElementById('mensajeMejora').innerHTML = ''; }, 3000);
            };
        }
    }

    function conectarViabilidad() {
        let calcBtn = document.getElementById('btnCalcularAhorro');
        if(calcBtn) {
            calcBtn.onclick = () => {
                let perdida = parseFloat(document.getElementById('inputPerdidaAnual').value);
                let ahorro = perdida * 0.28;
                document.getElementById('resultadoAhorro').innerHTML = `Ahorro estimado: ${ahorro.toFixed(0)} m³ anuales (~$${(ahorro*0.8).toFixed(0)} COP)`;
            };
        }
        let compBtn = document.getElementById('btnVerComponentes');
        if(compBtn) {
            compBtn.onclick = () => {
                let div = document.getElementById('detalleComponentes');
                div.style.display = div.style.display === 'none' ? 'block' : 'none';
            };
        }
    }

    function conectarObjetivos() {
        let completados = 0;
        let btns = document.querySelectorAll('#listaObjetivos .small-btn');
        let barra = document.getElementById('barraProgreso');
        let actualizarBarra = () => {
            let ancho = (completados / 4) * 100;
            barra.style.width = ancho + '%';
            barra.innerText = Math.floor(ancho) + '%';
            if(completados === 4) document.getElementById('mensajeFinalObjetivos').innerHTML = '🎉 ¡Excelente! Todos los objetivos alcanzados.';
        };
        btns.forEach(btn => {
            btn.onclick = (e) => {
                let li = btn.closest('li');
                let icono = li.querySelector('i');
                if(icono.classList.contains('far')) {
                    icono.classList.remove('far');
                    icono.classList.add('fas', 'fa-check-circle');
                    icono.style.color = '#0f6b4c';
                    completados++;
                    actualizarBarra();
                    btn.disabled = true;
                }
            };
        });
        actualizarBarra();
    }

    function conectarFoda() {
        let votos = { Vandalismo:0, "Falta presupuesto":0, "Desastres naturales":0 };
        let btnsVoto = document.querySelectorAll('[data-amenaza]');
        btnsVoto.forEach(btn => {
            btn.onclick = () => {
                let amen = btn.getAttribute('data-amenaza');
                votos[amen]++;
                document.getElementById('resultadoVotos').innerHTML = `Votos: Vandalismo ${votos.Vandalismo} | Falta presupuesto ${votos['Falta presupuesto']} | Desastres ${votos['Desastres naturales']}`;
            };
        });
        let apoyos = 0;
        let likeBtn = document.getElementById('btnApoyarFortaleza');
        if(likeBtn) {
            likeBtn.onclick = () => {
                apoyos++;
                document.getElementById('contadorApoyos').innerText = apoyos;
            };
        }
    }

    function conectarRF() {
        let filtro = document.getElementById('filtroRF');
        if(filtro) {
            filtro.oninput = (e) => {
                let term = e.target.value.toLowerCase();
                let filas = document.querySelectorAll('#tablaRF tbody tr');
                filas.forEach(row => {
                    let texto = row.innerText.toLowerCase();
                    row.style.display = texto.includes(term) ? '' : 'none';
                });
            };
        }
        let nrfBtn = document.getElementById('btnMostrarNRF');
        if(nrfBtn) {
            nrfBtn.onclick = () => {
                document.getElementById('detalleNRF').innerHTML = '<strong>No funcionales:</strong> Seguridad (cifrado), bajo consumo, disponibilidad 24/7, escalabilidad.';
            };
        }
    }

    function conectarMonitoreo() {
        let canvas = document.getElementById('graficaPresion');
        let ctx = canvas.getContext('2d');
        miGraficaPresion = new Chart(ctx, {
            type: 'line',
            data: { labels: ['10:00','10:05','10:10','10:15','10:20'], datasets: [{ label: 'Presión (bar)', data: [2.3,2.4,2.35,2.5,2.4], borderColor: '#0f6b4c', tension: 0.3 }] }
        });
        
        function actualizarSensores() {
            let nuevaPresion = (2.1 + Math.random() * 0.9).toFixed(1);
            let nuevoNivel = Math.floor(55 + Math.random() * 42);
            let nuevoCaudal = Math.floor(100 + Math.random() * 50);
            document.getElementById('presionLive').innerText = nuevaPresion;
            document.getElementById('nivelLive').innerText = nuevoNivel;
            document.getElementById('caudalLive').innerText = nuevoCaudal;
            let estadoSpan = document.getElementById('estadoNivelLive');
            if(nuevoNivel < 40) estadoSpan.innerHTML = 'Crítico ⚠️';
            else if(nuevoNivel > 85) estadoSpan.innerHTML = 'Alto';
            else estadoSpan.innerHTML = 'Normal';
            
            miGraficaPresion.data.datasets[0].data.push(parseFloat(nuevaPresion));
            if(miGraficaPresion.data.datasets[0].data.length > 8) miGraficaPresion.data.datasets[0].data.shift();
            miGraficaPresion.update();
        }
        
        document.getElementById('btnActualizarSensores').onclick = actualizarSensores;
        let fugaBtn = document.getElementById('btnSimularFuga');
        if(fugaBtn) {
            fugaBtn.onclick = () => {
                let alertDiv = document.getElementById('alertasMonitoreo');
                alertDiv.innerHTML = '<div class="alert-sim"><i class="fas fa-bell"></i> 🚨 ¡ALERTA! Posible fuga en sector norte. Revisar presión.</div>';
                setTimeout(() => { if(alertDiv) alertDiv.innerHTML = ''; }, 5000);
            };
        }
        actualizarSensores();
        setInterval(actualizarSensores, 12000);
    }

    function conectarAlertas() {
        let contenedor = document.getElementById('contenedorAlertas');
        function agregarAlerta(mensaje) {
            let div = document.createElement('div');
            div.className = 'alert-sim';
            div.innerHTML = `<i class="fas fa-exclamation-triangle"></i> ${mensaje} - ${new Date().toLocaleTimeString()}`;
            contenedor.appendChild(div);
        }
        document.getElementById('btnGenerarAlerta').onclick = () => {
            let opciones = ['Fuga detectada en calle 22', 'Nivel bajo en tanque El Edén (34%)', 'Presión anómala en red norte', 'Sensor fuera de rango'];
            let aleatorio = opciones[Math.floor(Math.random() * opciones.length)];
            agregarAlerta(aleatorio);
        };
        document.getElementById('btnLimpiarAlertas').onclick = () => {
            contenedor.innerHTML = '<div class="alert-sim"><i class="fas fa-info-circle"></i> Sistema listo. Eventos recientes:</div>';
        };
        agregarAlerta('Sistema de alertas inicializado');
    }

    function conectarSostenibilidad() {
        let slider = document.getElementById('sliderReduccion');
        let valorSpan = document.getElementById('valorSlider');
        let aguaSpan = document.getElementById('aguaAhorradaAnual');
        function recalcular() {
            let reduc = slider.value;
            valorSpan.innerText = reduc;
            let perdidaBase = 450000;
            let ahorro = (perdidaBase * reduc / 100).toFixed(0);
            aguaSpan.innerText = ahorro;
        }
        slider.oninput = recalcular;
        document.getElementById('btnActualizarAhorro').onclick = recalcular;
        recalcular();
    }

    function conectarReportes() {
        document.getElementById('btnGenerarReporte').onclick = () => {
            document.getElementById('textoReporte').innerText = `=== REPORTE SMARTWATER ===\nFecha: ${new Date().toLocaleDateString()}\nFugas detectadas: 3 eventos\nPresión promedio: 2.3 bar\nEficiencia: 87%\nRecomendación: revisar sector sur.`;
        };
        document.getElementById('btnSimularInforme').onclick = () => {
            document.getElementById('resultadoInforme').innerHTML = `<div class="alert-sim"><strong>Informe mensual:</strong> Pérdidas reducidas 12%, 5 alertas atendidas, sensores operativos 98%.</div>`;
        };
    }

    // Para manejar la navegación entre pestañas
    function setupNavigation() {
        document.querySelectorAll('.cat-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                let section = btn.getAttribute('data-section');
                loadSection(section);
                highlightActiveButton(section);
            });
        });
    }
    setupNavigation();

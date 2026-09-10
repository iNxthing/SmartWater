const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => document.querySelectorAll(selector);

const credentials = { username: 'admin', password: 'santamarta2026' };
const appState = { chart: null, sensorTimer: null };
const content = $('#dynamicContent');

const card = (title, icon, body) => `
    <article class="card-info">
        <h2 class="section-title"><i class="fas ${icon}"></i> ${title}</h2>
        ${body}
    </article>`;

const featureGrid = (items) => `<div class="grid-cards">${items.map((item) => `<div class="feature-card">${item}</div>`).join('')}</div>`;

const sections = {
    problematica: {
        render: () => card('Problemática - Simulador de mejora', 'fa-bug', `
            <p><strong>Santa Marta:</strong> Fugas no detectadas, niveles bajos, falta de monitoreo.</p>
            <div class="feature-card">
                <strong>Pérdida actual de agua tratada:</strong>
                <div class="progress-track"><div id="barraPerdida" class="loss-progress"></div></div>
                <p>Porcentaje de pérdida: <span id="porcentajePerdida">32</span>%</p>
                <button class="small-btn" id="btnSimularMejora">Simular impacto del IoT</button>
                <span id="mensajeMejora" class="feedback-message"></span>
            </div>`),
        connect: () => {
            $('#barraPerdida').style.width = '32%';
            $('#btnSimularMejora').onclick = () => {
                const percentage = $('#porcentajePerdida');
                const value = Math.max(10, Number(percentage.textContent) - 8);
                percentage.textContent = value;
                $('#barraPerdida').style.width = `${value}%`;
                $('#mensajeMejora').textContent = 'Con IoT las pérdidas bajan drásticamente';
                setTimeout(() => $('#mensajeMejora')?.replaceChildren(), 3000);
            };
        },
    },

    viabilidad: {
        render: () => card('Viabilidad - Calculadora de ahorro', 'fa-chart-pie', featureGrid([
            `<strong>Ahorro por reducción de fugas</strong>
             <label for="inputPerdidaAnual">Pérdida anual actual (m³):</label>
             <input type="number" id="inputPerdidaAnual" value="450000" min="0">
             <button id="btnCalcularAhorro" class="small-btn">Calcular ahorro</button>
             <p id="resultadoAhorro" class="result-text"></p>`,
            `<strong>Componentes tecnológicos</strong>
             <button id="btnVerComponentes" class="small-btn">Ver detalles</button>
             <p id="detalleComponentes" class="toggle-content">Sensores de presión, caudal y nivel. Gateway LoRa y dashboard en la nube.</p>`,
        ])),
        connect: () => {
            $('#btnCalcularAhorro').onclick = () => {
                const savings = Number($('#inputPerdidaAnual').value) * 0.28;
                $('#resultadoAhorro').textContent = `Ahorro estimado: ${savings.toFixed(0)} m³ anuales (~$${(savings * 0.8).toFixed(0)} COP)`;
            };
            $('#btnVerComponentes').onclick = () => $('#detalleComponentes').classList.toggle('is-visible');
        },
    },

    objetivos: {
        render: () => {
            const objectives = ['Detectar fugas en tiempo real', 'Monitorear niveles de agua', 'Enviar alertas automáticas', 'Reducir pérdida hídrica'];
            return card('Objetivos - Seguimiento manual', 'fa-bullseye', `
                <ul id="listaObjetivos" class="objectives-list">
                    ${objectives.map((objective) => `<li><i class="far fa-circle"></i> ${objective} <button class="small-btn">Marcar</button></li>`).join('')}
                </ul>
                <div class="progress-track objective-track"><div id="barraProgreso" class="objective-progress">0%</div></div>
                <p id="mensajeFinalObjetivos" class="feedback-message"></p>`);
        },
        connect: () => {
            const buttons = $$('#listaObjetivos .small-btn');
            let completed = 0;
            buttons.forEach((button) => {
                button.onclick = () => {
                    button.closest('li').querySelector('i').className = 'fas fa-check-circle';
                    button.disabled = true;
                    completed++;
                    const percentage = completed / buttons.length * 100;
                    $('#barraProgreso').style.width = `${percentage}%`;
                    $('#barraProgreso').textContent = `${percentage}%`;
                    if (completed === buttons.length) $('#mensajeFinalObjetivos').textContent = 'Excelente. Todos los objetivos alcanzados.';
                };
            });
        },
    },

    foda: {
        render: () => {
            const threats = ['Vandalismo', 'Falta presupuesto', 'Desastres naturales'];
            return card('FODA interactivo', 'fa-chart-simple', featureGrid([
                `<strong>¿Cuál amenaza es más crítica?</strong>
                 <div class="button-group">${threats.map((threat) => `<button data-threat="${threat}" class="small-btn">${threat}</button>`).join('')}</div>
                 <p id="resultadoVotos" class="result-text">Votos: ninguno aún</p>`,
                `<strong>Fortaleza principal</strong>
                 <p>Tecnología IoT moderna y eficiencia operativa.</p>
                 <button id="btnApoyarFortaleza" class="small-btn">Apoyar</button>
                 <span id="contadorApoyos">0</span> personas apoyan`,
            ]));
        },
        connect: () => {
            const votes = { Vandalismo: 0, 'Falta presupuesto': 0, 'Desastres naturales': 0 };
            $$('[data-threat]').forEach((button) => {
                button.onclick = () => {
                    votes[button.dataset.threat]++;
                    $('#resultadoVotos').textContent = `Votos: Vandalismo ${votes.Vandalismo} | Falta presupuesto ${votes['Falta presupuesto']} | Desastres ${votes['Desastres naturales']}`;
                };
            });
            let supports = 0;
            $('#btnApoyarFortaleza').onclick = () => $('#contadorApoyos').textContent = ++supports;
        },
    },

    rf: {
        render: () => {
            const requirements = [['Monitoreo de presión', 'Alta'], ['Monitoreo nivel tanques', 'Alta'], ['Detección de fugas', 'Alta'], ['Alertas automáticas', 'Alta'], ['Visualización de datos', 'Media']];
            return card('Requerimientos funcionales', 'fa-clipboard-list', `
                <input type="search" id="filtroRF" class="text-input" placeholder="Filtrar requerimientos...">
                <table class="requirements-table" id="tablaRF">
                    <thead><tr><th>Requerimiento</th><th>Prioridad</th></tr></thead>
                    <tbody>${requirements.map(([name, priority]) => `<tr><td>${name}</td><td>${priority}</td></tr>`).join('')}</tbody>
                </table>
                <button id="btnMostrarNRF" class="small-btn">Mostrar no funcionales</button>
                <p id="detalleNRF" class="result-text"></p>`);
        },
        connect: () => {
            $('#filtroRF').oninput = (event) => $$('#tablaRF tbody tr').forEach((row) => {
                row.hidden = !row.textContent.toLowerCase().includes(event.target.value.toLowerCase());
            });
            $('#btnMostrarNRF').onclick = () => {
                $('#detalleNRF').innerHTML = '<strong>No funcionales:</strong> Seguridad (cifrado), bajo consumo, disponibilidad 24/7 y escalabilidad.';
            };
        },
    },

    monitoreo: {
        render: () => card('Monitoreo IoT en vivo', 'fa-tachometer-alt', `
            ${featureGrid([
                `Presión: <strong><span id="presionLive">2.4</span> bar</strong> <button id="btnActualizarSensores" class="small-btn">Actualizar</button>`,
                `Nivel tanque: <strong><span id="nivelLive">78</span>%</strong> <span id="estadoNivelLive" class="badge">Normal</span>`,
                `Caudal: <strong><span id="caudalLive">125</span> L/s</strong>`,
            ])}
            <canvas id="graficaPresion" width="400" height="200"></canvas>
            <button id="btnSimularFuga" class="danger-button">Simular fuga (prueba)</button>
            <div id="alertasMonitoreo"></div>`),
        connect: () => {
            const chart = new Chart($('#graficaPresion').getContext('2d'), {
                type: 'line',
                data: { labels: ['10:00', '10:05', '10:10', '10:15', '10:20'], datasets: [{ label: 'Presión (bar)', data: [2.3, 2.4, 2.35, 2.5, 2.4], borderColor: '#0f6b4c', tension: 0.3 }] },
                options: { responsive: true, maintainAspectRatio: false },
            });
            appState.chart = chart;

            const updateSensors = () => {
                const pressure = (2.1 + Math.random() * 0.9).toFixed(1);
                const level = Math.floor(55 + Math.random() * 42);
                $('#presionLive').textContent = pressure;
                $('#nivelLive').textContent = level;
                $('#caudalLive').textContent = Math.floor(100 + Math.random() * 50);
                $('#estadoNivelLive').textContent = level > 85 ? 'Alto' : 'Normal';
                chart.data.datasets[0].data.push(Number(pressure));
                chart.data.datasets[0].data.splice(0, Math.max(0, chart.data.datasets[0].data.length - 8));
                chart.update();
            };

            $('#btnActualizarSensores').onclick = updateSensors;
            $('#btnSimularFuga').onclick = () => {
                $('#alertasMonitoreo').innerHTML = '<div class="alert-sim"><i class="fas fa-bell"></i> ¡ALERTA! Posible fuga en sector norte. Revisar presión.</div>';
                setTimeout(() => $('#alertasMonitoreo')?.replaceChildren(), 5000);
            };
            updateSensors();
            appState.sensorTimer = setInterval(updateSensors, 12000);
        },
    },

    alertas: {
        render: () => card('Centro de alertas', 'fa-bell', `
            <div id="contenedorAlertas"><div class="alert-sim"><i class="fas fa-info-circle"></i> Sistema listo. Eventos recientes:</div></div>
            <button id="btnGenerarAlerta" class="small-btn">Generar alerta de prueba</button>
            <button id="btnLimpiarAlertas" class="small-btn">Limpiar historial</button>`),
        connect: () => {
            const container = $('#contenedorAlertas');
            const options = ['Fuga detectada en calle 22', 'Nivel bajo en tanque El Edén (34%)', 'Presión anómala en red norte', 'Sensor fuera de rango'];
            const addAlert = (message) => {
                const alert = document.createElement('div');
                alert.className = 'alert-sim';
                alert.innerHTML = `<i class="fas fa-exclamation-triangle"></i> ${message} - ${new Date().toLocaleTimeString()}`;
                container.appendChild(alert);
            };
            $('#btnGenerarAlerta').onclick = () => addAlert(options[Math.floor(Math.random() * options.length)]);
            $('#btnLimpiarAlertas').onclick = () => container.innerHTML = '<div class="alert-sim"><i class="fas fa-info-circle"></i> Sistema listo. Eventos recientes:</div>';
            addAlert('Sistema de alertas inicializado');
        },
    },

    sostenibilidad: {
        render: () => card('Sostenibilidad - Ahorro de agua', 'fa-seedling', `
            <p>Con IoT se estima una reducción de fugas significativa.</p>
            <label for="sliderReduccion">Reducción esperada: <strong><span id="valorSlider">30</span>%</strong></label>
            <input type="range" id="sliderReduccion" min="0" max="60" value="30">
            <p>Agua ahorrada al año: <strong id="aguaAhorradaAnual">135,000</strong> m³</p>
            <button id="btnActualizarAhorro" class="small-btn">Actualizar proyección</button>
            <div class="feature-card partners-card"><strong>Aliados:</strong> Alcaldía, Corpamag, Universidad del Magdalena.</div>`),
        connect: () => {
            const recalculate = () => {
                const reduction = Number($('#sliderReduccion').value);
                $('#valorSlider').textContent = reduction;
                $('#aguaAhorradaAnual').textContent = (450000 * reduction / 100).toLocaleString('es-CO');
            };
            $('#sliderReduccion').oninput = recalculate;
            $('#btnActualizarAhorro').onclick = recalculate;
            recalculate();
        },
    },

    reportes: {
        render: () => card('Generador de reportes', 'fa-file-alt', featureGrid([
            `<strong>Reporte de fugas</strong><button id="btnGenerarReporte" class="small-btn">Generar resumen</button><pre id="textoReporte" class="report-output"></pre>`,
            `<strong>Simular informe mensual</strong><button id="btnSimularInforme" class="small-btn">Generar informe</button><div id="resultadoInforme"></div>`,
        ])),
        connect: () => {
            $('#btnGenerarReporte').onclick = () => {
                $('#textoReporte').textContent = `=== REPORTE SMARTWATER ===\nFecha: ${new Date().toLocaleDateString()}\nFugas detectadas: 3 eventos\nPresión promedio: 2.3 bar\nEficiencia: 87%\nRecomendación: revisar sector sur.`;
            };
            $('#btnSimularInforme').onclick = () => {
                $('#resultadoInforme').innerHTML = '<div class="alert-sim"><strong>Informe mensual:</strong> Pérdidas reducidas 12%, 5 alertas atendidas, sensores operativos 98%.</div>';
            };
        },
    },
};

function stopMonitoring() {
    clearInterval(appState.sensorTimer);
    appState.sensorTimer = null;
    appState.chart?.destroy();
    appState.chart = null;
}

function navigateTo(section) {
    stopMonitoring();
    if (!sections[section]) return;
    content.innerHTML = sections[section].render();
    $$('.cat-btn').forEach((button) => button.classList.toggle('active', button.dataset.section === section));
    sections[section].connect();
}

function showLogin() {
    $('#loginScreen').style.display = 'flex';
    $('#mainApp').style.display = 'none';
    $('#username').value = '';
    $('#password').value = '';
    stopMonitoring();
}

function showApp(username) {
    $('#loginScreen').style.display = 'none';
    $('#mainApp').style.display = 'block';
    $('#userNameDisplay').textContent = username;
    navigateTo('problematica');
}

window.addEventListener('DOMContentLoaded', () => {
    $('#loginForm').onsubmit = (event) => {
        event.preventDefault();
        const username = $('#username').value.trim();
        const password = $('#password').value.trim();
        if (username !== credentials.username || password !== credentials.password) {
            alert('Credenciales incorrectas. Prueba con admin / santamarta2026');
            return;
        }
        sessionStorage.setItem('loggedIn', 'true');
        sessionStorage.setItem('username', username);
        showApp(username);
    };

    $('#logoutBtn').onclick = () => {
        sessionStorage.clear();
        showLogin();
    };

    $$('.cat-btn').forEach((button) => button.onclick = () => navigateTo(button.dataset.section));

    const username = sessionStorage.getItem('username') || 'Operador';
    sessionStorage.getItem('loggedIn') === 'true' ? showApp(username) : showLogin();
});

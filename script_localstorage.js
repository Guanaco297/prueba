const form = document.getElementById('colada-form');
const tablaBody = document.querySelector('#tabla-coladas tbody');
const totalPeso = document.getElementById('total-peso');
const totalBorax = document.getElementById('total-borax');
const totalNitrato = document.getElementById('total-nitrato');
const totalCarbonato = document.getElementById('total-carbonato');
const totalSilice = document.getElementById('total-silice');
const totalFluorita = document.getElementById('total-fluorita');
const btnReiniciar = document.getElementById('reiniciar');

let totales = {
  peso: 0,
  borax: 0,
  nitrato: 0,
  carbonato: 0,
  silice: 0,
  fluorita: 0
};

const cargarDesdeStorage = () => {
  const datos = JSON.parse(localStorage.getItem('fundentes500'));
  if (datos) {
    datos.registros.forEach(reg => agregarFila(reg));
    totales = datos.totales;
    actualizarTotales();
  }
};

const guardarEnStorage = () => {
  const filas = Array.from(tablaBody.querySelectorAll('tr')).map(row => {
    const celdas = row.querySelectorAll('td');
    return {
      colada: celdas[0].textContent,
      peso: parseFloat(celdas[1].textContent),
      borax: parseFloat(celdas[2].textContent),
      nitrato: parseFloat(celdas[3].textContent),
      carbonato: parseFloat(celdas[4].textContent),
      silice: parseFloat(celdas[5].textContent),
      fluorita: parseFloat(celdas[6].textContent),
    };
  });
  localStorage.setItem('fundentes500', JSON.stringify({ registros: filas, totales }));
};

const agregarFila = ({ colada, peso, borax, nitrato, carbonato, silice, fluorita }) => {
  const row = document.createElement('tr');
  row.innerHTML = `
    <td>${colada}</td>
    <td>${peso.toFixed(2)}</td>
    <td>${borax.toFixed(2)}</td>
    <td>${nitrato.toFixed(2)}</td>
    <td>${carbonato.toFixed(2)}</td>
    <td>${silice.toFixed(2)}</td>
    <td>${fluorita.toFixed(2)}</td>
  `;
  tablaBody.appendChild(row);
};

const actualizarTotales = () => {
  totalPeso.textContent = totales.peso.toFixed(2);
  totalBorax.textContent = totales.borax.toFixed(2);
  totalNitrato.textContent = totales.nitrato.toFixed(2);
  totalCarbonato.textContent = totales.carbonato.toFixed(2);
  totalSilice.textContent = totales.silice.toFixed(2);
  totalFluorita.textContent = totales.fluorita.toFixed(2);
};

form.addEventListener('submit', function (e) {
  e.preventDefault();

  const colada = document.getElementById('colada').value;
  const peso = parseFloat(document.getElementById('peso').value);
  const boraxPct = parseFloat(document.getElementById('borax').value);
  const nitratoPct = parseFloat(document.getElementById('nitrato').value);
  const carbonatoPct = parseFloat(document.getElementById('carbonato').value);
  const silicePct = parseFloat(document.getElementById('silice').value);
  const fluoritaPct = parseFloat(document.getElementById('fluorita').value);

  const borax = peso * boraxPct / 100;
  const nitrato = peso * nitratoPct / 100;
  const carbonato = peso * carbonatoPct / 100;
  const silice = peso * silicePct / 100;
  const fluorita = peso * fluoritaPct / 100;

  agregarFila({ colada, peso, borax, nitrato, carbonato, silice, fluorita });

  totales.peso += peso;
  totales.borax += borax;
  totales.nitrato += nitrato;
  totales.carbonato += carbonato;
  totales.silice += silice;
  totales.fluorita += fluorita;

  actualizarTotales();
  guardarEnStorage();
  form.reset();
});

btnReiniciar.addEventListener('click', () => {
  tablaBody.innerHTML = '';
  totales = { peso: 0, borax: 0, nitrato: 0, carbonato: 0, silice: 0, fluorita: 0 };
  actualizarTotales();
  localStorage.removeItem('fundentes500');
});

document.addEventListener('DOMContentLoaded', cargarDesdeStorage);
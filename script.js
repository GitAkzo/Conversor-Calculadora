document.addEventListener('DOMContentLoaded', () => {
    
    // ==================== LÓGICA DO TEMA E MENU (HEADER) ====================
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = document.getElementById('theme-icon');
    const menuToggle = document.getElementById('menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');
    const body = document.body;

    // 1. Verifica preferência salva ou do sistema
    const savedTheme = localStorage.getItem('portfolio-theme');
    if (savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        body.classList.add('dark');
        themeIcon.textContent = 'light_mode';
    }

    // 2. Evento do botão de tema
    themeToggle.addEventListener('click', () => {
        body.classList.toggle('dark');
        if (body.classList.contains('dark')) {
            localStorage.setItem('portfolio-theme', 'dark');
            themeIcon.textContent = 'light_mode';
        } else {
            localStorage.setItem('portfolio-theme', 'light');
            themeIcon.textContent = 'dark_mode';
        }
    });

    // 3. Evento do Menu Hambúrguer
    menuToggle.addEventListener('click', () => {
        mobileMenu.classList.toggle('active');
        // Alterna o ícone entre menu e fechar
        const icon = menuToggle.querySelector('span');
        icon.textContent = mobileMenu.classList.contains('active') ? 'close' : 'menu';
    });

    // ==================== LÓGICA DAS ABAS ====================
    const tabConversor = document.getElementById('tab-conversor');
    const tabCalculadora = document.getElementById('tab-calculadora');
    const panelConversor = document.getElementById('panel-conversor');
    const panelCalculadora = document.getElementById('panel-calculadora');

    tabConversor.addEventListener('click', () => {
        tabConversor.classList.add('active');
        tabCalculadora.classList.remove('active');
        panelConversor.classList.remove('hidden');
        panelCalculadora.classList.add('hidden');
    });

    tabCalculadora.addEventListener('click', () => {
        tabCalculadora.classList.add('active');
        tabConversor.classList.remove('active');
        panelCalculadora.classList.remove('hidden');
        panelConversor.classList.add('hidden');
    });

    // ==================== LÓGICA DO CONVERSOR ====================
    const amountInput = document.getElementById('amount');
    const fromCurrency = document.getElementById('from-currency');
    const toCurrency = document.getElementById('to-currency');
    const btnConvert = document.getElementById('btn-convert');
    const conversionResult = document.getElementById('conversion-result');
    const updateTime = document.getElementById('update-time');

    const API_URL = 'https://open.er-api.com/v6/latest/USD';
    let cachedRates = null;

    // Formatação para numeração brasileira e Limite de 1 Trilhão
    amountInput.addEventListener('input', (e) => {
        let value = e.target.value.replace(/\D/g, ''); 
        if (value === '') {
            e.target.value = '';
            return;
        }
        let num = parseInt(value, 10);
        if (num > 1000000000000) {
            num = 1000000000000; 
        }
        e.target.value = num.toLocaleString('pt-BR');
    });

    async function fetchExchangeRates() {
        if (cachedRates) return cachedRates;
        try {
            const response = await fetch(API_URL);
            if (!response.ok) throw new Error('Falha na API');
            const data = await response.json();
            cachedRates = data.rates;
            const lastUpdate = new Date(data.time_last_update_utc);
            updateTime.textContent = `Taxas atualizadas em: ${lastUpdate.toLocaleString('pt-BR')}`;
            return cachedRates;
        } catch (error) {
            conversionResult.textContent = 'Erro de conexão.';
            return null;
        }
    }

    async function executeConversion() {
        const rawValue = amountInput.value.replace(/\./g, '');
        const valueToConvert = parseFloat(rawValue);
        
        if (isNaN(valueToConvert) || valueToConvert <= 0) {
            conversionResult.textContent = 'Insira um valor válido';
            return;
        }

        conversionResult.textContent = 'Calculando...';
        const rates = await fetchExchangeRates();
        if (!rates) return;

        const rateFrom = rates[fromCurrency.value];
        const rateTo = rates[toCurrency.value];

        if (rateFrom && rateTo) {
            const amountInUSD = valueToConvert / rateFrom;
            const convertedValue = amountInUSD * rateTo;
            
            const finalFormatted = convertedValue.toLocaleString('pt-BR', {
                style: 'currency',
                currency: toCurrency.value
            });

            conversionResult.textContent = `${valueToConvert.toLocaleString('pt-BR')} ${fromCurrency.value} = ${finalFormatted}`;
        }
    }

    btnConvert.addEventListener('click', executeConversion);
    fetchExchangeRates();

    // ==================== LÓGICA DA CALCULADORA ====================
    const calcDisplay = document.getElementById('calc-display');
    let calcExpression = ''; 
    let evaluated = false;   

    function updateDisplayView() {
        if (calcExpression === '') {
            calcDisplay.textContent = '0';
            return;
        }

        // 1. Identifica os números na equação e formata (ex: "1000.5" vira "1.000,5")
        let formattedExpression = calcExpression.replace(/\d+(\.\d*)?/g, (match) => {
            const parts = match.split('.');
            // Formata a parte inteira com pontos de milhar
            parts[0] = parseInt(parts[0], 10).toLocaleString('pt-BR');
            // Mantém a parte decimal separada por vírgula, se existir
            return parts.length > 1 ? `${parts[0]},${parts[1]}` : parts[0];
        });

        // 2. Troca os sinais do JS por sinais visuais bonitos para o usuário
        let viewExpression = formattedExpression
            .replace(/\*/g, ' × ')
            .replace(/\//g, ' ÷ ')
            .replace(/\+/g, ' + ')
            .replace(/\-/g, ' - ');
            
        calcDisplay.textContent = viewExpression;
    }

    const calcOperations = {
        number(digit) {
            if (evaluated) {
                calcExpression = digit; 
                evaluated = false;
            } else {
                calcExpression += digit;
            }
            updateDisplayView();
        },
        operator(op) {
            if (evaluated) evaluated = false; 
            
            const lastChar = calcExpression.slice(-1);
            if (['+', '-', '*', '/'].includes(lastChar)) {
                calcExpression = calcExpression.slice(0, -1) + op;
            } else {
                if (calcExpression === '') calcExpression = '0'; 
                calcExpression += op;
            }
            updateDisplayView();
        },
        decimal(dot) {
            if (evaluated) {
                calcExpression = '0.';
                evaluated = false;
            } else {
                const parts = calcExpression.split(/[\+\-\*\/]/);
                const lastPart = parts[parts.length - 1];
                if (!lastPart.includes(dot)) {
                    calcExpression += dot;
                }
            }
            updateDisplayView();
        },
        calculate() {
            if (calcExpression === '') return;

            // Validação do operador sobrando no final
            while (['+', '-', '*', '/'].includes(calcExpression.slice(-1))) {
                calcExpression = calcExpression.slice(0, -1);
            }

            if (calcExpression === '') {
                calcDisplay.textContent = '0';
                return;
            }

            try {
                // Avalia a string matemática diretamente
                const result = new Function('return ' + calcExpression)();
                calcExpression = String(parseFloat(result.toFixed(7)));
                evaluated = true;
                updateDisplayView();
            } catch (e) {
                calcDisplay.textContent = 'Erro';
                calcExpression = '';
            }
        },
        clear() {
            calcExpression = '';
            evaluated = false;
            updateDisplayView();
        },
        delete() {
            if (evaluated) {
                calcOperations.clear();
                return;
            }
            calcExpression = calcExpression.slice(0, -1);
            updateDisplayView();
        }
    };

    // Eventos de clique na Calculadora
    document.querySelector('.calc-grid').addEventListener('click', (e) => {
        const { target } = e;
        if (!target.matches('button')) return;

        const action = target.dataset.action;
        const textValue = target.textContent;
        const operatorValue = target.dataset.val;

        if (action === 'number') calcOperations.number(textValue);
        if (action === 'decimal') calcOperations.decimal('.');
        if (action === 'operator') calcOperations.operator(operatorValue);
        if (action === 'calculate') calcOperations.calculate();
        if (action === 'clear') calcOperations.clear();
        if (action === 'delete') calcOperations.delete();
    });

    // Eventos do Teclado Físico
    document.addEventListener('keydown', (e) => {
        if (panelCalculadora.classList.contains('hidden')) return;

        const key = e.key;
        
        if (/[0-9]/.test(key)) {
            calcOperations.number(key);
        } else if (['+', '-', '*', '/'].includes(key)) {
            e.preventDefault(); 
            calcOperations.operator(key);
        } else if (key === '.' || key === ',') {
            e.preventDefault();
            calcOperations.decimal('.');
        } else if (key === 'Enter' || key === '=') { 
            e.preventDefault(); 
            calcOperations.calculate(); 
        } else if (key === 'Backspace') {
            e.preventDefault();
            calcOperations.delete();
        } else if (key === 'Escape' || key.toLowerCase() === 'c') {
            e.preventDefault();
            calcOperations.clear();
        }
    });
});
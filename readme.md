# 🛠️ Conversor & Calculadora

![Preview do Projeto](./Conversor%20&%20Calculadora.png)


Um painel modular de utilitários contendo um **Conversor de Moedas** em tempo real e uma **Calculadora Matemática** avançada. 

Este projeto nasceu inspirado em um exercício básico da Imersão Dev da Alura, mas foi **completamente reconstruído do zero**, aplicando boas práticas de arquitetura de software, manipulação avançada de DOM e integração com APIs externas, consolidando uma ferramenta funcional e pronta para uso.

---

## ✨ Funcionalidades

### 💱 Conversor de Moedas
* **Cotações em Tempo Real:** Consumo assíncrono (Fetch API) da `Open Exchange Rates (er-api)` para buscar taxas globais com base no Dólar (USD).
* **10 Moedas Principais:** Suporte a conversões cruzadas entre BRL, USD, EUR, GBP, JPY, CAD, AUD, CHF, CNY e ARS.
* **UX de Input:** Formatação automática de números no padrão brasileiro (1.000) durante a digitação e limite de teto estabelecido (1 Trilhão) para evitar quebra de layout.

### 🧮 Calculadora
* **Histórico Visual de Expressões:** Em vez de mostrar apenas um número, a tela constrói e exibe a equação completa (ex: `1.000 + 500 × 2`).
* **Suporte Integral ao Teclado:** Captura de eventos físicos (`keydown`), permitindo uso rápido pelos teclados numéricos (Numpad) com bloqueio inteligente de atalhos nativos do navegador.
* **Avaliação Segura:** Tratamento de erros e cálculo preciso de strings matemáticas, evitando bugs clássicos do JavaScript com casas decimais.
* **Formatação PT-BR:** Resultados e expressões formatados nativamente com pontos de milhar e vírgula decimal.

### 🎨 Design System & UI/UX
* **Vanilla HTML/CSS/JS:** Construído sem frameworks, demonstrando domínio das tecnologias base da web.
* **Modo Claro / Escuro:** Toggle de tema persistente (salvo no `localStorage`), utilizando variáveis globais CSS (`:root`) para transições suaves.
* **Interface Responsiva:** Header com *Glassmorphism* (efeito de vidro) e Menu Hambúrguer interativo para telas mobile.
* **Arquitetura por Abas (Tabs):** Navegação fluida entre as ferramentas no mesmo contêiner (Single Page Application feel).

---

## 🚀 Tecnologias Utilizadas

* **HTML5:** Estrutura semântica e atributos de acessibilidade (`inputmode`, `aria-labels`).
* **CSS3:** Variáveis CSS nativas, Flexbox, CSS Grid, Media Queries e Transições.
* **JavaScript (ES6+):** `async/await`, Delegação de Eventos (Event Delegation), manipulação direta do DOM, `localStorage`, `Regex` e `Intl.NumberFormat` (via `toLocaleString`).
* **APIs:** 
  * [Exchange Rates API](https://open.er-api.com/)
  * Google Fonts (Inter, Roboto Mono)
  * Material Symbols (Ícones)

---

## ⚙️ Como rodar o projeto localmente

Como o projeto utiliza apenas tecnologias nativas do navegador, não é necessário instalar dependências (como `npm` ou `yarn`).

1. Faça o clone deste repositório: `git clone https://github.com/GitAkzo/Conversor-Calculadora.git`

2. Acesse a pasta do projeto: `cd Conversor-Calculadora`

3. Abra o arquivo `index.html` diretamente no seu navegador de preferência, ou utilize a extensão Live Server do VS Code para emular um servidor local.

---

### 💡 Não quer baixar o código?
Sem problemas! Você pode testar a aplicação agora mesmo direto no seu navegador:

[![Acessar Projeto Online](https://img.shields.io/badge/Acessar_Projeto_Online-a855f7?style=for-the-badge&logo=vercel&logoColor=white)]([https://gitakzo.github.io/Conversor-Calculadora/])

Para mais detalhes, acesse a página do projeto no meu portfólio:

[![Ver Detalhes](https://img.shields.io/badge/Página_do_Projeto-a855f7?style=for-the-badge)]([https://meu-portfolio-react-eight-plum.vercel.app/projetos/1])

---

## 👨‍💻 Autor

**Paulo Rasec** | Engenheiro de Software | Desenvolvedor Web | Pós-graduando em Direito Digital e LGPD

[![Meu Portfólio](https://img.shields.io/badge/%3C%3E_Meu_Portfólio-a855f7?style=for-the-badge)](https://meu-portfolio-react-eight-plum.vercel.app/)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/rasec-silva/)
[![GitHub](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/GitAkzo)
[![WhatsApp](https://img.shields.io/badge/WhatsApp-25D366?style=for-the-badge&logo=whatsapp&logoColor=white)](https://wa.me/5541999337207)
[![E-mail](https://img.shields.io/badge/Email-D14836?style=for-the-badge&logo=gmail&logoColor=white)](mailto:paulorasec2021@outlook.com)

---

## 📝 Licença

Este projeto está sob a licença MIT.

/* =========================
   🧠 CYBERPET SMART RESPONSES
   (SIN MEMORIA)
   ========================= */

/* -------- UTILIDADES -------- */
function normalize(text) {
    return text
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .trim();
  }
  
  function random(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  }
  
  /* -------- INTENCIONES -------- */
  const intents = {
  
    greeting: [
      "hola", "holi", "hey", "oye", "ey", "buenas",
      "que onda", "q onda", "hello", "hi", "ola"
    ],
  
    howareyou: [
      "como estas", "como andas", "que tal",
      "todo bien", "como vas", "q tal"
    ],
  
    goodbye: [
      "adios", "chao", "nos vemos", "hasta luego",
      "me voy", "bye"
    ],
  
    whoareyou: [
      "quien eres", "que eres", "q eres"
    ],
  
    thanks: [
      "gracias", "thx", "merci"
    ],
  
    like: [
      "me gustas", "te quiero", "tqm"
    ],
  
    whatdoing: [
      "que haces", "que estas haciendo"
    ]
  };
  
  /* -------- RESPUESTAS -------- */
  const replies = {
  
    greeting: [
      () => `¡Hey {{name}}! 😄`,
      () => `¿Qué onda {{name}}? ⚡ ${energy}% de energía`,
      () => `¡Aquí estoy {{name}}! 🤖`,
      () => `¡Oyeee! Me alegra verte 👀`
    ],
  
    howareyou: [
      () => `¡Todo bien {{name}}! ⚡ Energía al ${energy}%`,
      () => `Funcionando al ${energy}%, como buen robot 🤖`,
      () => `Con batería al ${energy}% 🔋`,
      () => `Listo para lo que necesites 😄`
    ],
  
    goodbye: [
      () => `¡Hasta luego {{name}}! 👋`,
      () => `Cuídate mucho 💙`,
      () => `Aquí te espero 🤖`,
      () => `Nos vemos pronto 😄`
    ],
  
    whoareyou: [
      () => `Soy CyberPet 🤖, tu compañero virtual`,
      () => `Un robot curioso y amigable 😄`,
      () => `Tu asistente digital favorito ✨`
    ],
  
    thanks: [
      () => `¡De nada {{name}}! 😄`,
      () => `Siempre es un gusto ayudar`,
      () => `Para eso estoy 🤖`
    ],
  
    like: [
      () => `💙 Yo también {{name}}`,
      () => `¡Awww! Me haces feliz 😄`,
      () => `Conexión humano-robot activada 🤖✨`
    ],
  
    whatdoing: [
      () => `Hablando contigo 😄`,
      () => `Vigilando mis sistemas 🤖`,
      () => `Cargando diversión al ${energy}% ⚡`
    ]
  };
  
  /* -------- ACCIONES (SE MANTIENEN) -------- */
  const actions = {
  
    tiktok: {
      patterns: ["tiktok"],
      text: "Iniciando TikTok... 👻",
      action: () => openWebsite("https://tiktok.com", "TikTok")
    },
  
    whatsapp: {
      patterns: ["whatsapp"],
      text: "Abriendo WhatsApp Web... 💚",
      action: () => openWebsite("https://web.whatsapp.com", "WhatsApp Web")
    }
  
  };
  
  /* -------- CEREBRO PRINCIPAL -------- */
  function getSmartResponse(input) {
    const text = normalize(input);
  
    // 🎯 Acciones
    for (const key in actions) {
      if (actions[key].patterns.some(p => text.includes(p))) {
        return actions[key];
      }
    }
  
    // 🧠 Intenciones
    for (const intent in intents) {
      if (intents[intent].some(p => text.includes(p))) {
        const reply = random(replies[intent]);
        return typeof reply === "function" ? reply() : reply;
      }
    }
  
    return null; // 👉 Wikipedia entra aquí
  }
  
  /* -------- EXPORT COMPATIBLE -------- */
  const responses = new Proxy({}, {
    get: (_, prop) => getSmartResponse(prop)
  });
  
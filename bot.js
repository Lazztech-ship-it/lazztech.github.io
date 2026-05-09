bot.start((ctx) => {
  const welcomeText = 
    `*SYSTEM ONLINE: LAZZ TECH HUB* 🌐\n\n` +
    `Greetings, user\\. I am the automated interface for *Lazz Tech Innovative Solutions*\\.\n\n` +
    `*Current Capabilities:* \n` +
    `• 🛰️ High\\-Speed Tunneling \\(VLESS/Reality/SSH\\)\n` +
    `• 🤖 Custom Bot Development & Deployment\n` +
    `• 🛡️ Network Security & VPS Management\n\n` +
    `Select a command below to initialize\\:`;

  ctx.replyWithMarkdownV2(
    welcomeText,
    Markup.inlineKeyboard([
      [Markup.button.callback('📂 Project Lab', 'projects'), Markup.button.callback('🛠 Tech Stack', 'stack')],
      [Markup.button.url('🌐 Portfolio Website', 'https://lazztech.github.io')],
      [Markup.button.url('💬 Contact Master', 'https://t.me/Lazz1235')]
    ])
  );
});

// Add these listeners so the buttons actually work when clicked
bot.action('stack', (ctx) => {
  ctx.reply('⚡ TECH STACK:\n• Networking: VLESS, VMess, Reality\n• Dev: Node.js, MongoDB, React Native\n• OS: Linux (Ubuntu/Debian)');
});

bot.action('projects', (ctx) => {
  ctx.reply('📂 PROJECT LAB:\n• Paulah App (Mobile Photo Storage)\n• WhatsApp Cloud Bot\n• WireGuard Tunneling Servers');
});

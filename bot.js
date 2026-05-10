const { Telegraf, Markup } = require('telegraf');
const http = require('http');

// 1. HIGH-SPEED KEEP-ALIVE
http.createServer((req, res) => {
  res.write('LAZZ TECH MAINFRAME: ACTIVE');
  res.end();
}).listen(process.env.PORT || 3000);

const bot = new Telegraf(process.env.BOT_TOKEN);

// 2. MASTER CONFIG
const ADMIN_ID = 7721569968;
const LOGO_URL = "https://raw.githubusercontent.com/lazztech-ship-it/lazztech.github.io/main/logo.png";
const WHATSAPP = "254106527992";

// 3. UTILS: The "Pro" Speed Engine
const getGreeting = () => {
    const hour = new Date().getHours() + 3; // EAT Sync
    if (hour < 12) return "Good Morning, Chief! 🌅";
    if (hour < 18) return "Good Afternoon, Legend! ☀️";
    return "Good Evening, Boss! 🌙";
};

// This function kills lag by deleting the old menu and spawning a new one instantly
const fastSwitch = async (ctx, text, keyboard) => {
    try { await ctx.deleteMessage(); } catch (e) {}
    return ctx.replyWithMarkdown(text, keyboard);
};

// 4. THE HUB KEYBOARD
const hubMenu = Markup.inlineKeyboard([
    [Markup.button.callback('👨‍💻 THE MASTER', 'about_me'), Markup.button.callback('🚀 SERVICES', 'catalog')],
    [Markup.button.callback('📡 TUNNELING LOG', 'tunneling'), Markup.button.callback('📂 PROJECTS', 'projects')],
    [Markup.button.callback('🛡️ SECURITY MATRIX', 'security'), Markup.button.callback('🖥️ VPS TERMINAL', 'vps')],
    [Markup.button.callback('✍️ SEND FEEDBACK', 'feedback')],
    [Markup.button.url('🌐 WEB INTERFACE', 'https://lazztech-ship-it.github.io')]
]);

// 5. CORE COMMANDS
bot.start(async (ctx) => {
    const name = ctx.from.first_name;
    await ctx.replyWithPhoto(LOGO_URL, {
        caption: `*${getGreeting()}*\n` +
                 `────────────────────\n` +
                 `*SYSTEM:* Lazz Tech Elite v2.3\n` +
                 `*STATUS:* OPTIMIZED & ENCRYPTED\n\n` +
                 `Welcome, *${name}*. Mainframe initialized. Select a module to begin.`,
        parse_mode: 'Markdown',
        ...hubMenu
    });
});

// 6. MODULE: SERVICES CATALOG
bot.action('catalog', async (ctx) => {
    const text = `*🚀 MASTER SERVICE HUB*\n────────────────────\nAll technical solutions are negotiable and high-performance. Select a category:`;
    await fastSwitch(ctx, text, Markup.inlineKeyboard([
        [Markup.button.callback('📡 VPN CONFIGS', 'item_vpn')],
        [Markup.button.callback('🖥️ VPS MANAGEMENT', 'item_vps')],
        [Markup.button.callback('📱 MOBILE APP DEV', 'item_dev')],
        [Markup.button.callback('🔙 BACK TO HUB', 'back_to_hub')]
    ]));
});

// 7. PRICING: VPN (YOUR EXACT LIST)
bot.action('item_vpn', async (ctx) => {
    const vpnText = `
\`\`\`
╔════════════════════════════════════╗
      🚀  ＬＡＺＺ  ＴＥＣＨ  ＶＰＮ  🚀
╚════════════════════════════════════╝
  [ ⚡ ]  UNLIMITED BANDWIDTH
  [ 🔒 ]  ENCRYPTED TUNNELING
  ---【 💰 ＰＲＩＣＩＮＧ 】---
  ◈  3 DAYS  ...........  Ksh 20
  ◈  1 WEEK  ...........  Ksh 50
  ◈  1 MONTH ..........  Ksh 150
  ◈  1 YEAR  ............  Ksh 1,300
  -----------------------------
  📩 DM FOR CONFIG NOW!
\`\`\``;
    await fastSwitch(ctx, vpnText, Markup.inlineKeyboard([
        [Markup.button.url('💬 NEGOTIATE ON WHATSAPP', `https://wa.me/${WHATSAPP}?text=Hi%20Lazz!%20I%20want%20the%20VPN%20Config.`)],
        [Markup.button.callback('🔙 BACK', 'catalog')]
    ]));
});

// 8. PRICING: VPS (NEW TERMINAL STYLE)
bot.action('item_vps', async (ctx) => {
    const vpsText = `
\`\`\`
╔════════════════════════════════════╗
      🖥️  ＶＰＳ  ＭＡＮＡＧＥＭＥＮＴ  🖥️
╚════════════════════════════════════╝
  [ 🛠️ ]  3X-UI & PTERODACTYL SETUP
  [ 🛡️ ]  SECURITY HARDENING
  ---【 💰 ＰＲＩＣＩＮＧ 】---
  ◈  BASIC CONFIG .......  Ksh 150
  ◈  3X-UI SETUP ........  Ksh 350
  ◈  PTERODACTYL ........  Ksh 800
  ◈  FULL HARDENING .....  Ksh 1,200
  -----------------------------
  🛰️ Status: ONLINE [🟢]
\`\`\``;
    await fastSwitch(ctx, vpsText, Markup.inlineKeyboard([
        [Markup.button.url('💬 DISCUSS SETUP', `https://wa.me/${WHATSAPP}?text=Hi%20Lazz!%20I%20need%20a%20VPS%20Setup.`)],
        [Markup.button.callback('🔙 BACK', 'catalog')]
    ]));
});

// 9. MODULE: PROJECTS (PAULAH APP & OTHERS)
bot.action('projects', async (ctx) => {
    const text = `*📂 PROJECT ARCHIVES*\n────────────────────\n` +
                 `• **Paulah App**: Cloud & Mobile Security\n` +
                 `• **WhatsApp Brain**: Autonomous AI Bot\n` +
                 `• **Lazz Tech Web**: Cyber-Interface 2026\n\n` +
                 `All source codes are managed in the Master Repository.`;
    await fastSwitch(ctx, text, Markup.inlineKeyboard([[Markup.button.callback('🔙 BACK TO HUB', 'back_to_hub')]]));
});

// 10. BACK TO HUB ACTION (RESHOOT PHOTO)
bot.action('back_to_hub', async (ctx) => {
    try { await ctx.deleteMessage(); } catch (e) {}
    await ctx.replyWithPhoto(LOGO_URL, {
        caption: `*BACK AT THE HUB*\n────────────────────\nSystem ready for your next command, *${ctx.from.first_name}*.`,
        parse_mode: 'Markdown',
        ...hubMenu
    });
});

// 11. FEEDBACK SYSTEM
bot.action('feedback', async (ctx) => {
    await fastSwitch(ctx, `*✍️ FEEDBACK MODE*\nType \`/message [your text]\` to send a sweet message to the Master.`, Markup.inlineKeyboard([[Markup.button.callback('🔙 BACK', 'back_to_hub')]]));
});

bot.hears(/\/message (.+)/, (ctx) => {
    const userMsg = ctx.match[1];
    ctx.telegram.sendMessage(ADMIN_ID, `🌟 *FEEDBACK:* ${userMsg}\nFrom: ${ctx.from.first_name}`);
    ctx.reply(`✅ Message sent! Lazz has been notified. ❤️`);
});

bot.launch();
console.log("Lazz Tech High-Speed Mainframe: Operational.");

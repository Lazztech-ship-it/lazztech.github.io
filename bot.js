const { Telegraf, Markup } = require('telegraf');
const http = require('http');

// 1. MAINFRAME KEEP-ALIVE
http.createServer((req, res) => {
  res.write('LAZZ TECH MULTI-INTERFACE: ONLINE');
  res.end();
}).listen(process.env.PORT || 3000);

const bot = new Telegraf(process.env.BOT_TOKEN);

// 2. CONSTANTS
const ADMIN_ID = 7721569968;
const LOGO_URL = "https://raw.githubusercontent.com/lazztech-ship-it/lazztech.github.io/main/logo.png";
const WHATSAPP = "254106527992";

// Time-aware greeting
const getGreeting = () => {
    const hour = new Date().getHours() + 3; 
    if (hour < 12) return "Good Morning, Chief! 🌅";
    if (hour < 18) return "Good Afternoon, Legend! ☀️";
    return "Good Evening, Boss! 🌙";
};

// 3. MAIN MENU
const mainHub = Markup.inlineKeyboard([
    [Markup.button.callback('👨‍💻 THE MASTER', 'about_me'), Markup.button.callback('🚀 SERVICES', 'catalog')],
    [Markup.button.callback('📡 TUNNELING LOG', 'tunneling'), Markup.button.callback('📂 PROJECTS', 'projects')],
    [Markup.button.callback('🛡️ SECURITY', 'security'), Markup.button.callback('🖥️ VPS TERMINAL', 'vps')],
    [Markup.button.callback('✍️ SEND FEEDBACK', 'feedback')],
    [Markup.button.url('🌐 WEB HUB', 'https://lazztech-ship-it.github.io')]
]);

// 4. START COMMAND
bot.start(async (ctx) => {
    await ctx.replyWithPhoto(LOGO_URL, {
        caption: `*${getGreeting()}*\n` +
                 `────────────────────\n` +
                 `*SYSTEM:* Lazz Tech Mainframe v2.1\n` +
                 `*ACCESS:* Level 5 Encrypted\n\n` +
                 `Welcome, *${ctx.from.first_name}*! I am your automated systems assistant. All protocols are standing by.`,
        parse_mode: 'Markdown',
        ...mainHub
    });
});

// 5. VPN PROFESSIONAL DISPLAY (YOUR EXACT LIST)
bot.action('item_vpn', (ctx) => {
    const vpnText = `
\`\`\`
╔════════════════════════════════════╗
      🚀  ＬＡＺＺ  ＴＥＣＨ  ＶＰＮ  🚀
╚════════════════════════════════════╝

  [ ⚡ ]  UNLIMITED BANDWIDTH
  [ 🔒 ]  ENCRYPTED TUNNELING
  [ 🎮 ]  LOW PING / NO LAG

  ---【 💰 ＰＲＩＣＩＮＧ  ＬＩＳＴ 】---

  ◈  3 DAYS  ...........  Ksh 20
  ◈  1 WEEK  ...........  Ksh 50
  ◈  2 WEEKS ..........  Ksh 90
  ◈  1 MONTH ..........  Ksh 150
  ◈  3 MONTHS ........  Ksh 400
  ◈  6 MONTHS ........  Ksh 750
  ◈  1 YEAR  ............  Ksh 1,300

  -------------------------------------

  ⚙️  ＳＵＰＰＯＲＴＥＤ  ＡＰＰＳ:
  ◈  HTTP Custom (.hc)
  ◈  HTTP Injector (.ehi)
  ◈  Dark Tunnel (.dtn)

  🛰️  Status: ONLINE [🟢]
  🌐  Region: GLOBAL SERVERS
\`\`\`
*Negotiation is always open!* 🤝`;

    ctx.editMessageCaption(vpnText, {
        parse_mode: 'Markdown',
        ...Markup.inlineKeyboard([
            [Markup.button.url('💬 GET CONFIG NOW', `https://wa.me/${WHATSAPP}?text=Hi%20Lazz!%20I%20want%20to%20buy%20a%20VPN%20Config.`)],
            [Markup.button.callback('🔙 BACK', 'catalog')]
        ])
    }).catch(() => {});
});

// 6. VPS PROFESSIONAL DISPLAY (MASTER STYLE)
bot.action('item_vps', (ctx) => {
    const vpsText = `
\`\`\`
╔════════════════════════════════════╗
      🖥️  ＶＰＳ  ＭＡＮＡＧＥＭＥＮＴ  🖥️
╚════════════════════════════════════╝

  [ 🛠️ ]  CUSTOM PANEL INSTALLATION
  [ 🛡️ ]  FIREWALL & SECURITY HARDENING
  [ 🚀 ]  OS OPTIMIZATION (UBUNTU/DEBIAN)

  ---【 💎  ＳＥＲＶＩＣＥＳ 】---

  ◈  BASIC SETUP .......  Ksh 500
  ◈  3X-UI PANEL .......  Ksh 800
  ◈  PTERODACTYL .......  Ksh 1,500
  ◈  FULL SECURITY .....  Ksh 2,000

  -------------------------------------

  ⚙️  ＩＮＣＬＵＤＥＳ:
  ◈  Root Access Config
  ◈  SSL Certificate Setup
  ◈  Anti-DDoS Shielding

  🛰️  Node: CLOUD DEPLOYMENT
\`\`\`
*Special rates for long-term projects!* 🤝`;

    ctx.editMessageCaption(vpsText, {
        parse_mode: 'Markdown',
        ...Markup.inlineKeyboard([
            [Markup.button.url('💬 DISCUSS VPS', `https://wa.me/${WHATSAPP}?text=Hi%20Lazz!%20I%20need%20help%20with%20VPS%20Management.`)],
            [Markup.button.callback('🔙 BACK', 'catalog')]
        ])
    }).catch(() => {});
});

// 7. FEEDBACK MODULE (SWEET & FRIENDLY)
bot.action('feedback', (ctx) => {
    ctx.editMessageCaption(
        `*✍️ LAZZ TECH FEEDBACK*\n` +
        `────────────────────\n` +
        `Your words mean the world to me! Whether it's a "Thank You," a suggestion, or a sweet message, I'm all ears.\n\n` +
        `*How to send:* Just type \`/message\` followed by your feedback.\n\n` +
        `Example: \`/message Love the new bot design!\``,
        { parse_mode: 'Markdown', ...Markup.inlineKeyboard([[Markup.button.callback('🔙 BACK', 'back_to_hub')]]) }
    ).catch(() => {});
});

bot.onText(/\/message (.+)/, (ctx, match) => {
    const userMsg = match[1];
    bot.telegram.sendMessage(ADMIN_ID, `🌟 *NEW SWEET FEEDBACK*\nFrom: ${ctx.from.first_name}\nMsg: ${userMsg}`);
    ctx.reply(`Thank you so much, ${ctx.from.first_name}! ❤️ Your message has been delivered to the Master. Have a fantastic day!`);
});

// 8. DYNAMIC CATALOG MENU
bot.action('catalog', (ctx) => {
    ctx.editMessageCaption(
        `*🚀 MASTER SERVICE HUB*\n` +
        `────────────────────\n` +
        `I offer elite technical solutions at negotiable prices. Select a module to view pricing and specs:`,
        { parse_mode: 'Markdown', ...Markup.inlineKeyboard([
            [Markup.button.callback('📡 VPN CONFIGS', 'item_vpn')],
            [Markup.button.callback('🖥️ VPS MANAGEMENT', 'item_vps')],
            [Markup.button.callback('📱 MOBILE APP DEV', 'item_dev')],
            [Markup.button.callback('🔙 BACK TO HUB', 'back_to_hub')]
        ])}
    ).catch(() => {});
});

// 9. RE-USABLE "BACK TO HUB"
bot.action('back_to_hub', (ctx) => {
    ctx.editMessageCaption(`*LAZZ TECH | MAIN HUB*\nSelect an operation:`, { parse_mode: 'Markdown', ...mainHub }).catch(() => {});
});

// Placeholder for APP DEV
bot.action('item_dev', (ctx) => {
    ctx.editMessageCaption(`*📱 CUSTOM APP DEVELOPMENT*\n────────────────────\nCreating high-performance Android & iOS apps.\n\n*Pricing:* Project-based (Let's talk!)\n*Stack:* React Native, Expo, Firebase.`, 
    { parse_mode: 'Markdown', ...Markup.inlineKeyboard([[Markup.button.url('💬 START A PROJECT', `https://wa.me/${WHATSAPP}?text=Hi%20Lazz!%20I%20have%20an%20app%20idea.`), Markup.button.callback('🔙 BACK', 'catalog')]]) }).catch(() => {});
});

bot.launch();
console.log("Lazz Tech Elite Mainframe: Operational.");
        

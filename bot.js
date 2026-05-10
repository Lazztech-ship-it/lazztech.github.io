const { Telegraf, Markup } = require('telegraf');
const http = require('http');
const services = require('./services'); // Importing your technical data

http.createServer((req, res) => {
  res.write('LAZZ TECH ELITE SYSTEM: ONLINE');
  res.end();
}).listen(process.env.PORT || 3000);

const bot = new Telegraf(process.env.BOT_TOKEN);
const ADMIN_ID = 7721569968;
const LOGO_URL = "https://raw.githubusercontent.com/lazztech-ship-it/lazztech.github.io/main/logo.png";
const WHATSAPP = "254106527992";

// --- THE MASTER UI ENGINE ---
const execCommand = async (ctx, cmd, data) => {
    await ctx.reply(`> _INITIALIZING: ${cmd}_`);
    await new Promise(r => setTimeout(r, 300));
    
    const message = `*${data.title}*\n` +
                    `────────────────────\n` +
                    `*TECHNICAL SPECS:*\n${data.specs}\n\n` +
                    `*OVERVIEW:*\n${data.details}\n\n` +
                    `*PRICING:*\n${data.pricing}`;

    return ctx.replyWithMarkdown(message, Markup.inlineKeyboard([
        [Markup.button.url('💬 NEGOTIATE / ORDER', `https://wa.me/${WHATSAPP}`)],
        [Markup.button.callback('🔙 BACK TO HUB', 'back_to_hub')]
    ]));
};

// --- MAIN HUB ---
const hubMenu = Markup.inlineKeyboard([
    [Markup.button.callback('📡 TUNNELING LOG', 'nav_vpn'), Markup.button.callback('🖥️ VPS TERMINAL', 'nav_vps')],
    [Markup.button.callback('📱 APP DEVELOPMENT', 'nav_dev'), Markup.button.callback('📂 PROJECTS', 'nav_projects')],
    [Markup.button.callback('🛡️ SECURITY MATRIX', 'nav_security')], 
    [Markup.button.callback('👨‍💻 THE MASTER', 'nav_about'), Markup.button.callback('✍️ FEEDBACK', 'nav_feedback')]
  
]);

bot.start((ctx) => {
    ctx.replyWithPhoto(LOGO_URL, {
        caption: `*⚡ LAZZ TECH MAIN INTERFACE v4.0* ⚡\n` +
                 `────────────────────\n` +
                 `*OPERATOR:* ${ctx.from.first_name}\n` +
                 `*STATUS:* SYSTEM SECURE\n\n` +
                 `Select a terminal module to begin.`,
        parse_mode: 'Markdown',
        ...hubMenu
    });
});

// --- DYNAMIC NAVIGATION ---
bot.action('nav_vpn', (ctx) => execCommand(ctx, 'TUNNEL_DATA', services.vpn));
bot.action('nav_vps', (ctx) => execCommand(ctx, 'VPS_TERMINAL', services.vps));
bot.action('nav_dev', (ctx) => execCommand(ctx, 'DEV_LOGS', services.dev));
bot.action('nav_security', (ctx) => execCommand(ctx, 'SEC_MATRIX_LOAD', services.security));
bot.action('nav_about', (ctx) => execCommand(ctx, 'MASTER_PROFILE_LOAD', services.master));

bot.action('nav_projects', async (ctx) => {
    await ctx.reply(`> _FETCHING_ARCHIVES..._`);
    ctx.replyWithMarkdown(`*📂 PROJECT REPOSITORY*\n────────────────────\n• **Paulah App**: Security Vault\n• **WhatsApp Brain**: Automation Bot\n• **Lazz Portfolio**: Cyber UI Web`, 
    Markup.inlineKeyboard([[Markup.button.callback('🔙 BACK', 'back_to_hub')]]));
});

bot.action('back_to_hub', async (ctx) => {
    await ctx.reply(`*Returning to Hub...*`);
    return ctx.replyWithPhoto(LOGO_URL, {
        caption: `*⚡ LAZZ TECH MAIN INTERFACE*\nReady for input.`,
        parse_mode: 'Markdown',
        ...hubMenu
    });
});

// --- FEEDBACK SYSTEM ---
bot.action('nav_feedback', (ctx) => {
    ctx.reply(`*✍️ FEEDBACK CHANNEL*\nType \`/message [text]\` to talk to Lazz.`, 
    Markup.inlineKeyboard([[Markup.button.callback('🔙 BACK', 'back_to_hub')]]));
});

bot.hears(/\/message (.+)/, (ctx) => {
    ctx.telegram.sendMessage(ADMIN_ID, `🌟 *NEW FEEDBACK:* ${ctx.match[1]}\nFrom: ${ctx.from.first_name}`);
    ctx.reply(`✅ Message sent to Master Lazz!`);
});

bot.launch();
console.log("Lazz Tech Elite System: Operational.");
  

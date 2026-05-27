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

// --- PROJECT SUBSYSTEM INTERFACE ---
bot.action('nav_projects', async (ctx) => {
    await ctx.reply(`> _ACCESSING_PROJECT_ARCHIVES..._`);
    await new Promise(r => setTimeout(r, 300));
    
    return ctx.replyWithMarkdown(`*📂 LAZZ TECH INTERNAL REPOSITORY*\n────────────────────\nSelect an archive directory to extract full technical specs and build architectures.`, 
    Markup.inlineKeyboard([
        [Markup.button.callback('👑 PAULAH VAULT APP', 'proj_paulah'), Markup.button.callback('🤖 WHATSAPP BRAIN', 'proj_bot')],
        [Markup.button.callback('🌐 CYBER-UI WEB HUB', 'proj_web')],
        [Markup.button.callback('🔙 RETURN TO HUB', 'back_to_hub')]
    ]));
});

// --- INDIVIDUAL PROJECT ROUTING DATA ---
bot.action('proj_paulah', (ctx) => execCommand(ctx, 'EXTRACT_PAULAH_VAULT', services.proj_paulah));
bot.action('proj_bot', (ctx) => execCommand(ctx, 'EXTRACT_WA_BRAIN_BOT', services.proj_bot));
bot.action('proj_web', (ctx) => execCommand(ctx, 'EXTRACT_CYBER_WEB_UI', services.proj_web));
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
    ctx.reply(`*✍️ FEEDBACK CHANNEL*\n────────────────────\nType \`/message\` followed by your text to talk directly to Lazz.\n\nExample: \`/message Your bot is amazing!\``, 
    Markup.inlineKeyboard([[Markup.button.callback('🔙 BACK', 'back_to_hub')]]));
});

bot.hears(/\/message (.+)/, (ctx) => {
    ctx.telegram.sendMessage(ADMIN_ID, `🌟 *NEW FEEDBACK:* ${ctx.match[1]}\nFrom: ${ctx.from.first_name}`);
    ctx.reply(`✅ Message sent to Master Lazz!`);
});

bot.launch();
console.log("Lazz Tech Elite System: Operational.");
  

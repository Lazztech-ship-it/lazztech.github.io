const { Telegraf, Markup } = require('telegraf');
const http = require('http');

// 1. KEEP-ALIVE SERVER (Prevents Render from sleeping)
http.createServer((req, res) => {
  res.write('LAZZ TECH MAINFRAME: ACTIVE');
  res.end();
}).listen(process.env.PORT || 3000);

const bot = new Telegraf(process.env.BOT_TOKEN);

// 2. CONFIGURATION & DATABASE (Temporary Set for this session)
const ADMIN_ID = 7721569968; // Your verified ID
const WHATSAPP = "254106527992";
const WEB = "https://lazztech.github.io";
let users = new Set(); // Tracks unique users for broadcasting

// 3. HELPER: MarkdownV2 Escaper (Prevents Crashes)
const escape = (text) => {
  return text.toString().replace(/[_*[\]()~`>#+-=|{}.!]/g, '\\$&');
};

const footer = `\n\n\\-\\-\\-\\-\\-\\-\\-\\-\\-\\-\\-\\-\\-\\-\\-\\-\\-\\-\\-\\-\\-\\-\\-\n*⚡ LAZZ TECH SOLUTIONS \\| Secured \\& Optimized*`;

// 4. MIDDLEWARE: User Analytics
bot.use((ctx, next) => {
  if (ctx.from) {
    users.add(ctx.from.id);
    console.log(`[ACCESS] ${ctx.from.first_name} (ID: ${ctx.from.id})`);
  }
  return next();
});

// 5. ADMIN COMMAND: Broadcast to all users
bot.command('broadcast', async (ctx) => {
  if (ctx.from.id !== ADMIN_ID) return ctx.reply('⚠️ ACCESS DENIED: UNAUTHORIZED USER.');
  const msg = ctx.message.text.split('/broadcast ')[1];
  if (!msg) return ctx.reply('Usage: /broadcast [Your Message]');
  
  let count = 0;
  users.forEach(id => {
    bot.telegram.sendMessage(id, `📢 *LAZZ TECH ANNOUNCEMENT:*\n\n${msg}`, { parse_mode: 'Markdown' })
      .then(() => count++)
      .catch(() => {});
  });
  ctx.reply(`Broadcast sequence initiated. Reach: ${users.size} nodes.`);
});

// 6. MAIN MENU KEYBOARD
const mainMenu = () => {
  return Markup.inlineKeyboard([
    [Markup.button.callback('🚀 SERVICES', 'services'), Markup.button.callback('📂 PROJECTS', 'projects')],
    [Markup.button.callback('🛠 TECH STACK', 'stack'), Markup.button.url('⚡ WHATSAPP COMMS', `https://wa.me/${WHATSAPP}`)],
    [Markup.button.url('🌐 WEB PORTFOLIO', WEB)]
  ]);
};

// 7. START: Neural Interface Initialization
bot.start((ctx) => {
  const name = escape(ctx.from.first_name || 'Agent');
  const welcomeText = 
    `*⚡ LAZZ TECH NEURAL INTERFACE v5\\.0* ⚡\n` +
    `\\=\\=\\=\\=\\=\\=\\=\\=\\=\\=\\=\\=\\=\\=\\=\\=\\=\\=\\=\\=\\=\\=\\=\\=\\=\\=\\=\\=\\=\n` +
    `*SCANNING USER\\.\\.\\.* \n` +
    `👤 *IDENTITY:* ${name}\n` +
    `🆔 *USER ID:* \`${ctx.from.id}\` \n` +
    `⏰ *STATUS:* ACTIVE NODE\n` +
    `\\=\\=\\=\\=\\=\\=\\=\\=\\=\\=\\=\\=\\=\\=\\=\\=\\=\\=\\=\\=\\=\\=\\=\\=\\=\\=\\=\\=\\=\n\n` +
    `Welcome to the mainframe\\. Select an operation to begin\\.`;

  ctx.replyWithMarkdownV2(welcomeText + footer, mainMenu());
});

// 8. SERVICES & ORDER FLOW
bot.action('services', (ctx) => {
  ctx.editMessageText(
    `*🛡️ MASTER SERVICES ARCHIVE:* \n` +
    `\\-\\-\\-\\-\\-\\-\\-\\-\\-\\-\\-\\-\\-\\-\\-\\-\\-\\-\\-\\-\\-\\-\\-\n` +
    `• *VPN:* High\\-speed VLESS/Reality tunneling\\.\n` +
    `• *VPS:* Server management \\& custom panels\\.\n` +
    `• *DEV:* Custom Web \\& Mobile App engineering\\.\n\n` +
    `Select "ORDER NOW" to initiate a service request\\.`,
    { parse_mode: 'MarkdownV2', ...Markup.inlineKeyboard([
      [Markup.button.callback('🛒 ORDER NOW', 'order_start')],
      [Markup.button.callback('🔙 BACK', 'start_menu')]
    ])}
  ).catch(() => {});
});

bot.action('order_start', (ctx) => {
  ctx.editMessageText(`📦 *SELECT SERVICE TYPE:*`, {
    parse_mode: 'MarkdownV2',
    ...Markup.inlineKeyboard([
      [Markup.button.callback('Premium VPN Config', 'order_vpn'), Markup.button.callback('VPS Management', 'order_vps')],
      [Markup.button.callback('🔙 BACK', 'services')]
    ])
  });
});

bot.action(/order_/, (ctx) => {
  const type = ctx.match.input.split('_')[1].toUpperCase();
  // Notify Admin (You)
  bot.telegram.sendMessage(ADMIN_ID, `🔔 *NEW ORDER INITIATED*\nUser: ${ctx.from.first_name}\nType: ${type}\nID: ${ctx.from.id}`);
  
  ctx.reply(`✅ *ORDER LOGGED:* I have notified the Master regarding your ${type} request\\. Redirecting to WhatsApp for finalization\\.\\.\\.`)
     .then(() => {
        ctx.reply(`Click here to finish: https://wa.me/${WHATSAPP}?text=I%20want%20to%20order%20${type}`);
     });
});

// 9. OTHER SECTIONS
bot.action('projects', (ctx) => {
  ctx.editMessageText(`*📂 PROJECT ARCHIVES:* \n\n1\\. *Paulah App:* Cloud storage\\.\n2\\. *WhatsApp Brain:* Autonomous bot suite\\.\n3\\. *Global Nodes:* Tunneling infrastructure\\.` + footer,
    { parse_mode: 'MarkdownV2', ...Markup.inlineKeyboard([[Markup.button.callback('🔙 BACK', 'start_menu')]]) }
  ).catch(() => {});
});

bot.action('stack', (ctx) => {
  ctx.editMessageText(`*🛠 TECH MASTER STACK:* \n\nNode\\.js \\| Linux \\| VLESS \\| Reality \\| MongoDB \\| Firebase \\| React Native` + footer,
    { parse_mode: 'MarkdownV2', ...Markup.inlineKeyboard([[Markup.button.callback('🔙 BACK', 'start_menu')]]) }
  ).catch(() => {});
});

bot.action('start_menu', (ctx) => {
  ctx.editMessageText(`*⚡ LAZZ TECH MAIN INTERFACE* \nSelect an operation:`, { parse_mode: 'MarkdownV2', ...mainMenu() }).catch(() => {});
});

bot.launch();
console.log("Elite Lazz Tech Bot: Operational.");
          

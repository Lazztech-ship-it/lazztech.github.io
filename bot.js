<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Lazz Tech | Advanced Systems Engineer</title>
    <style>
        :root {
            --primary-blue: #00d2ff;
            --bg-dark: #050a12;
            --card-bg: #0d1624;
            --text-main: #ffffff;
            --text-dim: #a0aec0;
        }

        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background-color: var(--bg-dark);
            color: var(--text-main);
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
            margin: 0;
            padding: 20px;
        }

        .container {
            background-color: var(--card-bg);
            border-radius: 20px;
            padding: 40px;
            width: 100%;
            max-width: 450px;
            text-align: center;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
            border: 1px solid rgba(0, 210, 255, 0.1);
        }

        .profile-img {
            width: 120px;
            height: 120px;
            border-radius: 50%;
            border: 3px solid var(--primary-blue);
            box-shadow: 0 0 20px rgba(0, 210, 255, 0.4);
            margin-bottom: 20px;
        }

        h1 { margin: 10px 0; font-size: 2rem; letter-spacing: 1px; }
        .subtitle { color: var(--primary-blue); font-weight: bold; letter-spacing: 2px; font-size: 0.9rem; margin-bottom: 30px; text-transform: uppercase; }

        .grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 15px;
            margin-bottom: 25px;
        }

        .tech-btn {
            background: rgba(0, 210, 255, 0.05);
            border: 1px solid rgba(0, 210, 255, 0.3);
            color: var(--primary-blue);
            padding: 12px;
            border-radius: 8px;
            cursor: pointer;
            font-weight: 600;
            transition: 0.3s;
            font-size: 0.75rem;
        }

        .tech-btn:hover {
            background: var(--primary-blue);
            color: var(--bg-dark);
            box-shadow: 0 0 15px rgba(0, 210, 255, 0.5);
        }

        .action-btn {
            width: 100%;
            padding: 15px;
            margin: 8px 0;
            border: none;
            border-radius: 10px;
            font-weight: bold;
            cursor: pointer;
            color: white;
            transition: 0.3s;
        }

        .whatsapp { background-color: #25D366; }
        .telegram { background-color: #0088cc; }
        .source { background-color: #333; }

        .action-btn:hover { opacity: 0.9; transform: translateY(-2px); }

        /* MODAL STYLES */
        .overlay {
            display: none;
            position: fixed;
            top: 0; left: 0;
            width: 100%; height: 100%;
            background: rgba(0, 0, 0, 0.9);
            justify-content: center;
            align-items: center;
            z-index: 1000;
            backdrop-filter: blur(5px);
        }

        .overlay-content {
            background: #0a1526;
            padding: 30px;
            border: 1px solid var(--primary-blue);
            border-radius: 15px;
            width: 85%;
            max-width: 400px;
            position: relative;
            animation: fadeIn 0.3s ease-out;
        }

        @keyframes fadeIn { from { opacity: 0; transform: scale(0.9); } to { opacity: 1; transform: scale(1); } }

        .close-btn {
            position: absolute;
            top: 15px; right: 20px;
            font-size: 28px;
            color: var(--primary-blue);
            cursor: pointer;
        }

        .modal-body { text-align: left; font-size: 0.9rem; line-height: 1.6; color: var(--text-dim); }
        .modal-body b { color: var(--primary-blue); }
        hr { border: 0.5px solid rgba(0, 210, 255, 0.2); margin: 15px 0; }

        .footer { margin-top: 30px; font-size: 0.7rem; color: #555; }
    </style>
</head>
<body>

<div class="container">
    <img src="https://raw.githubusercontent.com/lazztech-ship-it/lazztech.github.io/main/logo.png" alt="Lazz Tech Logo" class="profile-img">
    <h1>Lazz Tech</h1>
    <div class="subtitle">Advanced Systems Engineer</div>

    <div class="grid">
        <button class="tech-btn" onclick="showDetails('vless')">VLESS / REALITY</button>
        <button class="tech-btn" onclick="showDetails('bot')">BOT DEPLOYMENT</button>
        <button class="tech-btn" onclick="showDetails('vps')">VPS MANAGEMENT</button>
        <button class="tech-btn" onclick="showDetails('security')">NETWORK SECURITY</button>
    </div>

    <button class="action-btn whatsapp" onclick="window.location.href='https://wa.me/254106527992'">CONNECT VIA WHATSAPP</button>
    <button class="action-btn telegram" onclick="window.location.href='https://t.me/Lazz@1235'">JOIN TELEGRAM CHANNEL</button>
    <button class="action-btn source" onclick="window.location.href='https://github.com/lazztech-ship-it'">VIEW SOURCE CODE</button>

    <div class="footer">BUILT BY LAZZ TECH • SYSTEM VERSION 2.0.5</div>
</div>

<div id="detail-overlay" class="overlay">
    <div class="overlay-content">
        <span class="close-btn" onclick="closeDetails()">&times;</span>
        <h2 id="detail-title" style="color: var(--primary-blue);">Title</h2>
        <hr>
        <div id="detail-body" class="modal-body">
            </div>
    </div>
</div>

<script>
    const projectData = {
        'vless': {
            title: "Tunneling Architecture",
            content: "Expertise in deploying high-performance tunneling protocols. <b>Projects:</b> Optimized VLESS and Reality protocols with XTLS-core for anti-detection and ultra-low latency. Skilled in scanning zero-rated SNI hosts for regional ISP bypassing."
        },
        'bot': {
            title: "Bot Development",
            content: "Full-stack automation solutions. <b>Major Project:</b> Built a cloud-hosted WhatsApp bot system using Node.js and MongoDB. Features include automated response systems and multi-device cloud synchronization."
        },
        'vps': {
            title: "Infrastructure Management",
            content: "Managing robust server environments. <b>System:</b> Administration of Linux-based VPS (Ubuntu/Debian) via Termux and SSH. Experience with DigitalOcean and IONOS for hosting high-traffic management panels like 3x-ui."
        },
        'security': {
            title: "Network & App Security",
            content: "Systems engineering and mobile security. <b>Featured Project:</b> The 'Paulah App'—a secure mobile solution built with React Native and Expo. Expertise in network packet analysis and firewall configuration."
        }
    };

    function showDetails(key) {
        document.getElementById('detail-title').innerText = projectData[key].title;
        document.getElementById('detail-body').innerHTML = projectData[key].content;
        document.getElementById('detail-overlay').style.display = 'flex';
    }

    function closeDetails() {
        document.getElementById('detail-overlay').style.display = 'none';
    }

    // Close modal if clicking outside the box
    window.onclick = function(event) {
        if (event.target == document.getElementById('detail-overlay')) {
            closeDetails();
        }
    }
</script>

</body>
</html>
  

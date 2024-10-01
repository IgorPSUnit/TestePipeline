const { Client, GatewayIntentBits } = require('discord.js');
const axios = require('axios');
require('dotenv').config();

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages] });

client.once('ready', () => {
    console.log(`Bot ${client.user.tag} está online!`);
});

client.on('messageCreate', async (message) => {
    if (message.content.startsWith('!info')) {
        const info = await getInfo();
        message.channel.send(info);
    } else if (message.content.startsWith('!git')) {
        const info = await getInfoGit();
        message.channel.send(info);
    } else if (message.content.startsWith('!grafana')) {
        const info = await getInfoGrafana();
        message.channel.send(info);
    }
});

async function getInfo() {
    const jenkinsInfo = await getJenkinsInfo();
    return `Informações do Jenkins: ${JSON.stringify(jenkinsInfo, null, 2)}`;
}

async function getInfoGit() {
    const gitInfo = await getGitInfo();
    return `Informações do Git: ${gitInfo}`;
}

async function getInfoGrafana() {
    const grafanaInfo = await getGrafanaInfo();
    return `Informações do Grafana: ${JSON.stringify(grafanaInfo, null, 2)}`;
}

async function getJenkinsInfo() {
    try {
        const response = await axios.get(`http://localhost:3030/api/json`, {
            auth: {
                username: process.env.JENKINS_USER,
                password: process.env.JENKINS_TOKEN
            }
        });
        return response.data; // Formatar a resposta como preferir
    } catch (error) {
        console.error(error);
        return 'Erro ao buscar informações do Jenkins.';
    }
}

async function getGitInfo() {
    try {
        const response = await axios.get('https://api.github.com/repos/IgorPSUnit/TestePipeline/commits');
        return response.data.map(commit => commit.commit.message).join('\n'); // Formatar como quiser
    } catch (error) {
        console.error(error);
        return 'Erro ao buscar informações do Git.';
    }
}

async function getGrafanaInfo() {
    try {
        const response = await axios.get('http://localhost:3000/api/search', {
            headers: {
                Authorization: `Bearer ${process.env.GRAFANA_TOKEN}`
            }
        });
        return response.data; // Formatar a resposta como quiser
    } catch (error) {
        console.error(error);
        return 'Erro ao buscar informações do Grafana.';
    }
}

client.on('messageCreate', async (message) => {
    // Ignorar mensagens de bots, incluindo o próprio bot
    if (message.author.bot) return;

    // Log da mensagem recebida
    console.log(`Mensagem recebida: ${message.content}`);

    // Verificar se a mensagem começa com um dos comandos
    if (message.content.startsWith('!info')) {
        const info = await getInfo();
        message.channel.send(info);
    } else if (message.content.startsWith('!git')) {
        const info = await getInfoGit();
        message.channel.send(info);
    } else if (message.content.startsWith('!grafana')) {
        const info = await getInfoGrafana();
        message.channel.send(info);
    }
});



client.login(process.env.DISCORD_TOKEN);

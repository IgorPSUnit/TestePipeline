Aqui está o conteúdo organizado e formatado em Markdown:

---

# Instalação do JDK 21

1. Acesse o link abaixo, selecione seu sistema operacional e faça o download do JDK:

   [Download JDK 21](https://www.oracle.com/in/java/technologies/downloads/#jdk21-windows)

2. Execute o instalador e siga até o final.

---

# Instalação do Jenkins

1. Acesse o link abaixo e faça o download do Jenkins:

   [Download Jenkins](https://www.jenkins.io/download/#downloading-jenkins)

2. Acesse o Jenkins de acordo com a porta configurada na instalação.

3. Copie a senha de primeiro acesso no caminho de exemplo:

   ```
   C:\ProgramData\Jenkins\.jenkins\secrets\initialAdminPassword
   ```

4. Coloque a senha no Jenkins e avance.

5. Selecione "Instalar as extensões sugeridas".

6. Após a instalação dos recursos, preencha os campos do usuário administrador para acesso à plataforma.

---

# Configuração Inicial do Jenkins

1. Defina a rota para requisições ao Jenkins.

2. Acesse a plataforma.

3. Na tela inicial do Jenkins ("Painel de Controle"), selecione a opção "Criar um novo trabalho".

---

# Criação do Trabalho no Jenkins

1. Na tela de criação, dê um nome ao trabalho e escolha a opção de "Software livre" para configurar uma pipeline de forma intuitiva.

2. Adicione a conexão com o repositório GitHub, marcando as opções:

   - **GitHub Project**: coloque o link da raiz do repositório (copiado no navegador).
   - **Link HTTP para clonagem**: copie o link HTTP disponibilizado no GitHub para clonar o repositório.

3. Opcionalmente, insira a **Branch** específica do repositório (ex: master).

4. Salve e teste a conexão clicando em "Construir agora".

---

# Configuração de Build Automático

1. Volte à configuração do trabalho, marque a opção abaixo e adicione "5 *" espaçados para que o Jenkins verifique o Git a cada minuto.

2. Marque a opção para que, sempre que ocorrer um build, ele limpe o workspace do Jenkins.

3. Configure para rodar o projeto Java com Maven.

---

# Configuração do Maven no Jenkins

1. Após configurar o projeto Java com Maven e criar os testes, vá para as configurações do trabalho no Jenkins e busque pela opção correspondente ao Maven.

2. Se ocorrer erro com o Maven, configure uma versão anterior no Jenkins:

   - Vá em: **Painel de Controle > Gerenciar Jenkins > Tools**.
   - Clique em "Adicionar Maven" e siga as orientações.

3. Volte à configuração do trabalho, altere o Maven, salve e faça o build.

---

# Configuração do Docker

1. Instale o Docker Desktop acessando o link:

   [Download Docker Desktop](https://www.docker.com/products/docker-desktop)

2. Após a instalação, abra o Docker Desktop e acesse sua conta. Se necessário, crie uma nova conta.

3. No projeto Java, crie um arquivo **Dockerfile** e adicione os processos que deseja para gerar a imagem e subir o container, incluindo o executável `.jar` gerado pelo Maven.

---

# Configuração do Docker no Jenkins

1. No Jenkins, vá em: **Painel de Controle > Gerenciar Jenkins > Clouds**.

2. Instale o plugin do Docker no Jenkins.

3. Reinicie o Jenkins após a instalação.

4. Navegue novamente até **Clouds** e selecione a opção "New Cloud".

5. Dê um nome à nova Cloud (ex: Docker) e selecione o tipo que deseja utilizar.

6. Adicione a seguinte URL para o host do Docker:

   ```
   unix:///var/run/docker.sock
   ```

7. Clique em "Test Connection". Se ocorrer um erro, siga os passos abaixo:

   - Abra o Docker Desktop, vá em configurações e marque as seguintes opções:
     - **Enable Docker Terminal**
     - **Expose daemon...**
   - Clique em "Apply & Restart" e teste a conexão novamente.

---

# Configuração de Credenciais no Jenkins

1. No Jenkins, vá em: **Painel de Controle > Gerenciar Jenkins > Credentials**.

2. Selecione "Stores..." e escolha a opção **Global** na coluna **Domains**.

3. Clique em "Add Credentials" e adicione suas credenciais do Docker Hub.

4. Preencha o modelo de acordo com suas credenciais e clique em "Create".

5. Volte ao seu trabalho e faça as configurações finais para que o Jenkins jogue a imagem no Docker Hub a cada build.

--- 

Essa organização mantém os passos claros e diretos para a instalação e configuração do JDK, Jenkins e Docker.
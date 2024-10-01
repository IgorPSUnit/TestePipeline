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

1. Na tela de criação, dê um nome ao trabalho e escolha a opção de "Construir um projeto de software de estilo livre" para configurar uma pipeline de forma intuitiva.

2. Adicione a conexão com o repositório GitHub, marcando as opções:
   
   - **GitHub Project**: insira o link da raiz do repositório (copiado no navegador).
    -- obs: o link deve ir do http ate o nome do repositorio
   - **Link HTTPS para clonagem**: copie o link HTTPS disponibilizado no GitHub para clonar o repositório.
    -- obs: o link fica na opção **<>Code**

3. Opcionalmente, insira a **Branch** específica do repositório (ex: master).

4. Salve e teste a conexão clicando em "Construir agora".

---

# Configuração de Build Automático

1. Volte à configuração do trabalho, marque a opção de "Consultar periodicamente o SCM" e adicione `5 *` espaçados para que o Jenkins verifique o Git a cada minuto.

2. Marque a opção **Delete workspace before build starts** para que, sempre que ocorrer um build, ele limpe o workspace do Jenkins.


---

# Configuração do Maven no Jenkins

1. Após configurar o projeto Java com Maven e criar os testes, vá para as configurações do trabalho no Jenkins e busque **Passos de construção** .

2. Selecione **Adicionar passo na construção** e depois **Chamar alvos Maven de alto nível**.

3. Em Goals escreva **install**.

4. Se ocorrer erro com o Maven, configure uma versão anterior no Jenkins:

   - Vá em: **Painel de Controle > Gerenciar Jenkins > Tools**.
   - Clique em "Adicionar Maven" e siga as orientações.

5. Volte à configuração do trabalho, altere o Maven, salve e faça o build.

---

# Configuração do Docker

1. Instale o Docker Desktop acessando o link:
   [Download Docker Desktop](https://www.docker.com/products/docker-desktop)

2. Após a instalação, abra o Docker Desktop e acesse sua conta. Se necessário, crie uma nova conta.

3. No projeto Java, crie um arquivo **Dockerfile** e adicione os processos necessários para gerar a imagem e subir o container, incluindo o executável `.jar` gerado pelo Maven.

---

# Configuração do Docker no Jenkins

1. No Jenkins, vá em: **Painel de Controle > Gerenciar Jenkins > Clouds**.

2. Instale o plugin do Docker no Jenkins.

3. Reinicie o Jenkins após a instalação.

4. Navegue novamente até **Clouds** e selecione a opção "New Cloud".

5. Dê um nome à nova Cloud (ex: Docker) e selecione o tipo desejado.

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

# Configuração Final para Publicar a Imagem no Docker Hub

1. Vá em **Painel de Controle > Trabalhos > Configurações**.

2. Selecione "Adicionar passo na construção".

3. Selecione **Build / Publish Docker Image**.

4. Coloque o caminho do seu Dockerfile no workspace do Jenkins. Exemplo de caminho: 

   ```
   C:\ProgramData\Jenkins\.jenkins\workspace\devops-java
   ```

5. Selecione sua cloud que foi criada anteriormente (ex: "Cloud").

6. Insira o nome da sua imagem Docker.

    - ex : seuusuario/devops_java

7. Selecione a opção **Push image**.

8. Em **Registry credential**, selecione suas credenciais configuradas anteriormente.

9. Salve e execute o build.

---

# Verificação da Imagem no Docker Desktop e Docker Hub

- Após o build, verifique a imagem no Docker Desktop na aba de **Imagens**.

- A imagem também aparecerá no Docker Hub, na aba de imagens, confirmando que o push foi realizado pelo Jenkins.


# Integração do Jenkins com Prometheus e Grafana

## Download e Configuração do Prometheus

1. Acesse o site do Prometheus e faça o download da versão LTS para o seu sistema operacional:

   [Download Prometheus](https://prometheus.io/download/)

2. Extraia o arquivo ZIP.

3. Acesse a pasta extraída.

4. Abra o arquivo `prometheus.yml` e faça as seguintes alterações:

   ```yaml
   scrape_configs:
     # The job name is added as a label `job=<job_name>` to any timeseries scraped from this config.
     - job_name: "jenkins"

       metrics_path: "/prometheus"
       # scheme defaults to 'http'.

       static_configs:
         - targets: ["localhost:9090"]
   ```

   > **Nota:** No campo `targets`, você deve colocar a rota da instância do jenkins.

5. Após fazer as alterações, execute o `prometheus.exe`.

## Instalação do Plugin Prometheus no Jenkins

1. Acesse o Jenkins pelo painel de controle.

2. Navegue até **Gerenciar Jenkins > Plugins**.

3. Vá para a aba **Extensões disponíveis** e procure por **Prometheus metrics** e instale.

4. Marque a opção de reiniciar após a instalação.

5. Após reentrar no Jenkins, tente acessar a rota do Prometheus:

   ```
   http://localhost:<sua_porta>/prometheus/
   ```

   Se as métricas forem exibidas, a configuração está funcionando.

## Configuração do Grafana

1. Baixe o aplicativo Grafana de acordo com o seu sistema operacional:

   [Download Grafana](https://grafana.com/grafana/download)

2. Execute o instalador e siga até o final.

3. Por padrão, o Grafana estará disponível em:

   ```
   http://localhost:3000/login
   ```

4. No primeiro acesso, digite qualquer credencial. Ele irá gerar um erro e pedir para inserir novas credenciais. Após isso, use:

   - **Usuário:** admin
   - **Senha:** a que você escolher

5. Após acessar o Grafana, vá ao menu e selecione **Connections**.

6. Procure por **Prometheus**, selecione e clique em **Add new data source**.

7. Configure a porta do Prometheus, informando onde ele está rodando (no seu caso, `localhost:9090`).

8. Clique em **Save & Test**.

9. Em caso de sucesso, retorne ao menu e selecione **Dashboards**.

10. Selecione **Create Dashboard**.

11. Você pode optar por importar um dashboard ou criar um novo. Se você importar um:

    - Adicione o ID do dashboard importado.
    - Selecione a sua base do Prometheus e clique em **Import**.

# Instalação do JDK 21

1. Acesse o link abaixo, selecione seu sistema operacional e faça o download do JDK:

   [Download JDK 21](https://www.oracle.com/in/java/technologies/downloads/#jdk21-windows)

2. Execute o instalador e siga até o final.

   ![Captura de tela 2024-10-01 083658](https://github.com/user-attachments/assets/e4c220e6-9734-4d4d-9d96-de59dd8cc101)


---

# Instalação do Jenkins

1. Acesse o link abaixo e faça o download do Jenkins:

   [Download Jenkins](https://www.jenkins.io/download/#downloading-jenkins)
   
![Captura de tela 2024-10-01 083913](https://github.com/user-attachments/assets/36a196bb-c938-4e76-9d0d-af50617549d2)

3. Acesse o Jenkins de acordo com a porta configurada na instalação.

4. Copie a senha de primeiro acesso no caminho de exemplo:

   ```
   C:\ProgramData\Jenkins\.jenkins\secrets\initialAdminPassword
   ```

5. Coloque a senha no Jenkins e avance.
   
![Captura de tela 2024-10-01 084655](https://github.com/user-attachments/assets/36f14a36-c8be-4520-9d46-7431f084929a)


7. Selecione "Instalar as extensões sugeridas".
   
![Captura de tela 2024-10-01 085033](https://github.com/user-attachments/assets/cf7ef09a-7bb8-40a9-876e-48425d1aa19d)

9. Após a instalação dos recursos, preencha os campos do usuário administrador para acesso à plataforma.
    
![Captura de tela 2024-10-01 085625](https://github.com/user-attachments/assets/cfa98d8b-b2b3-40f0-9980-5bf8bde9f460)

---

# Configuração Inicial do Jenkins

1. Defina a rota para requisições ao Jenkins.
   
![Captura de tela 2024-10-01 085700](https://github.com/user-attachments/assets/fe83c9cc-b070-4c73-914e-b8e9565fb5ec)

3. Acesse a plataforma.

4. Na tela inicial do Jenkins ("Painel de Controle"), selecione a opção "Criar um novo trabalho".
   
![Captura de tela 2024-10-01 085933](https://github.com/user-attachments/assets/84892e5d-0241-40ac-9a55-ca4ff17dbab4)

---

# Criação do Trabalho no Jenkins

1. Na tela de criação, dê um nome ao trabalho e escolha a opção de "Software de estilo livre" para configurar uma pipeline de forma intuitiva.

2. Adicione a conexão com o repositório GitHub, marcando as opções:

   - **GitHub Project**: coloque o link da raiz do repositório (copiado no navegador).

![Captura de tela 2024-10-01 091136](https://github.com/user-attachments/assets/f80bedd5-fa06-4952-9355-9055f5164a60)

   
   - **Link HTTP para clonagem**: copie o link HTTP disponibilizado no GitHub para clonar o repositório.
     
![Captura de tela 2024-10-01 091240](https://github.com/user-attachments/assets/6c9409a2-d8b7-4397-9d44-87fbf67186a7)

3. Opcionalmente, insira a **Branch** específica do repositório (ex: master).
   
![Captura de tela 2024-10-01 090836](https://github.com/user-attachments/assets/70747fb6-77f9-41b3-a7f5-bbe616b110a2)

5. Salve e teste a conexão clicando em "Construir agora".

---

# Configuração de Build Automático

1. Volte à configuração do trabalho, marque a opção abaixo e adicione "5 *" espaçados para que o Jenkins verifique o Git a cada minuto.
   
![Captura de tela 2024-10-01 092532](https://github.com/user-attachments/assets/3b9f7884-5635-452c-a2ad-af49241e48e5)

3. Marque a opção para que, sempre que ocorrer um build, ele limpe o workspace do Jenkins.
   
![Captura de tela 2024-10-01 092830](https://github.com/user-attachments/assets/f1988e49-35b4-4434-8851-72353de90462)

---

# Configuração do Maven no Jenkins

1. Após configurar o projeto Java com Maven e criar os testes, vá para as configurações do trabalho no Jenkins e busque pela opção correspondente ao Maven.
   
![Captura de tela 2024-10-01 094358](https://github.com/user-attachments/assets/515e4601-d4ef-452f-8906-fd1c3d6cb1bb)

![Captura de tela 2024-10-01 094640](https://github.com/user-attachments/assets/08d5d76f-d48f-418c-a628-fe8aeec8076e)

3. Se ocorrer erro com o Maven, configure uma versão anterior no Jenkins:

   - Vá em: **Painel de Controle > Gerenciar Jenkins > Tools**.
   - Clique em "Adicionar Maven" e siga as orientações.

   ![Captura de tela 2024-10-01 094838](https://github.com/user-attachments/assets/087b3fdd-b504-446a-bf23-f2bc352c9f8b)

4. Volte à configuração do trabalho, altere o Maven, salve e faça o build.

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

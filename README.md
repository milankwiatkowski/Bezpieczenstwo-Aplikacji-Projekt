MILAN KWIATKOWSKI 292658

Aby uruchomić projekt należy:

1. W katalogu react-keycloak-app uruchomić polecenie "npm install".
2. W folderze react-keycloak-app użyć komendy "docker run -p 8080:8080 -v "$(pwd)/keycloak_data_backup/h2:/opt/keycloak/data/h2" -e KC_DB=dev-file -e KEYCLOAK_ADMIN=admin -e KEYCLOAK_ADMIN_PASSWORD=admin quay.io/keycloak/keycloak:26.2.5 start-dev"
3. Wejść do katalogu /backend, tam uruchomić backend poprzez "node api.js".
4. Wejść do katalogu Bezpieczenstwo-Aplikacji-Projekt/react-keycloak-app i uruchomić frontend poprzez "npm start".

Dane do logowania dla admina:
Login: admin
Hasło:  admin1

Dane do logowania dla moderatora:
Login: moderator
Hasło: moderator

Dane do logowania dla usera:
Login: regularuser
Hasło: regularuser

import Keycloak from 'keycloak-js';
const keycloak = new Keycloak({
    url:"http://localhost:8080",
    realm: "projekt",
    clientId:"projekt_klient"
})

export default keycloak
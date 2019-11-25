# gpioServer

Das ist ein Hobby-Projekt, welches verwaltet GPIO-Pins von einem Rasperry-PI Rechner. Das ist eine Smarthome Anwendung, mit welcher mit wenig Aufwand über GPIO-Pins eine smarte Licht oder Rolladensteurung umgesetzt werden kann. Diese serverbasierte Anwendung verügt eine HTTP-POST und HTTP-GET Schnittstelle über welche die GPIO-Pins angesteurt werden können. Genauso gibt es eine Schnittstelle zu der AWS-Server von Amazon mit welche über eingen Smarthome Skill von Alexa eine Lichtsteuerung gemacht werden kann. 

## Get Started

Die Beschreibung folgt.

### Prerequisites

Die Beschreibung folgt.
Folgende Packete und Anwendungen müssen installiert werden.

openssl

### Installing

Für eine HTTPS-Verbindung zu dem AWS-Server wird eine Zertifikat benötig. 
Um einen eigenen Zertifikat zu erstellen werdn folgende Befehle ausgeführt.

cd httpsAWSInterface
mkdir encryption
openssl genrsa -out privatekey.pem 1024
openssl req -new -key privatekey.pem -out certrequest.csr
openssl x509 -req -in certrequest.csr -signkey privatekey.pem -out certificate.pem

Um die Zustand der geschalteten Pin festzuhalten muss follgende Verzeichnis angelegt werden.

cd db
mkdir gpioState



## Authors

* **Gennadi Heimann

## License

Apache License 2.0



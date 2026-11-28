
```bash
$ npm install
```

## Compile and run the project

```bash
# development
$ npm run start

## testando o delete // sempre começar pela locação, pois enquanto tiver uma locação vinculada ao cliente ou veiculo não executara

```bash
  curl.exe -X DELETE "http://localhost:3000/locacoes/2"
```
```bash
  curl.exe -X DELETE "http://localhost:3000/clientes/2"
```
```bash
  curl.exe -X DELETE "http://localhost:3000/carros/2"
```
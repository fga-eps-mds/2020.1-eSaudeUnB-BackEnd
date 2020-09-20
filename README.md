# 2020.1-eSaudeUnB-BackEnd

## Code Climate - Capacidade de Manutenção

[![Maintainability](https://api.codeclimate.com/v1/badges/bc8d13734d61be2f72c8/maintainability)](https://codeclimate.com/github/fga-eps-mds/2020.1-eSaudeUnB-BackEnd/maintainability)

## Code Climate - Cobertura de Teste

[![Test Coverage](https://api.codeclimate.com/v1/badges/bc8d13734d61be2f72c8/test_coverage)](https://codeclimate.com/github/fga-eps-mds/2020.1-eSaudeUnB-BackEnd/test_coverage)

## Dependências

Baixe na sua máquina as seguintes dependências:

* docker
* docker-compose

## Ambiente

* O BackEnd será executado na porta 8000, usando o docker-compose

* O Banco de Dados Postgres será executado na porta 5432, usando o docker-compose

## Comandos importantes a serem executados

* Compile o docker-compose se você mudou algum serviço do Dockerfile ou o conteúdo que está no diretório rodando o comando ```sudo docker-compose build``` para recompila-lo.

* Para iniciar os contêineres de um serviço já compilado anteriormente, use: ```sudo docker-compose up```

* Para compilar e executar os contêineres em seguida a use flag ```--build:``` junto ao compose up, resultando no seguinte comando ```sudo docker-compose up --build```

* Para parar e remover os containers do docker-compose e serviços envolvidos pela build (contêineres, networks, volumes e imagens), use o comando: ```sudo docker-compose down```

* Caso vc queira parar a execução dos containers sem remove-los. Use o comando: ```sudo docker-compose stop```

* Remova os serviços dos contêineres com o comando: ```sudo docker-compose rm```

## Comandos do Makefile

* Para rodar o eslint no projeto
```
make lint
```

* Para rodar os testes no projeto
```
make test
```

* Para subir e realizar a build dos containers 
```
make build
```

* Para subir os containers 
```
make up
```

* Para parar e remover os containers
```
make down
```

## References

* https://docs.docker.com/compose/

# Controllers e ORM - 06/12/2022

## Criando um controlador
```bash
# cria um controlador HTTP em app/Controllers/Http chamado nomecontroladorController.ts
node ace make:controller nomecontrolador
```

## Lucid

Instale o lucid:
```bash
# instalação do lucid
npm i @adonisjs/lucid
```

Configure o lucid:
```bash
# configuração do lucid: escolha o SQLite selecionando espaço
node ace configure @adonisjs/lucid
```

No arquivo env.ts, adicione a linha a seguir no Env.rules:
```typescript
DB_CONNECTION: Env.schema.string(),
```

## Migration:
- nós escrevemos qual é o estado do banco e ele automaticamente gera as consultas do banco para criar, deletar etc.
- o arquivo que vai dizer como eu tenho que operar sobre o banco de dados.
- tambem possui um script de como voltar para o estado anterior

## Criando models

Criando a model:
```bash
# cria um model dentro de app/Models chamado Medicamento.ts
node ace make:model Medicamento
```

Adicione as colunas que você quiser dentro de Medicamento.ts
```typescript
@column
  public nomeComercial: string
```

Você também pode criar colunas com [relacionamentos](https://docs.adonisjs.com/reference/orm/relations/has-one):
```typescript
@column
  public userId: number

@belongsTo(() => User)
  public author: BelongsTo<typeof User>
```

Crie a migration:
```bash
# Criará um arquivo assim dentro de database/migrations chamado algo como: 1618903673925_medicamentos.ts
node ace make:migration Medicamento
```
No arquivo de migration (1618903673925_medicamentos.ts) existe a função up() que chamará a create table. 


Em 1618903673925_medicamentos.ts adicione também o nome das colunas da tabela
```typescript
// escreva em snakeCase. Ex: nomeComercial -> nome_comercial
table.string('nome_comercial').notNullable()
table.integer('user_id').notNullable().references('id').inTable('users')
```

Execute a migration, só depois de ter adicionado as colunas em Medicamento.ts e em 1618903673925_medicamentos.ts
```bash
# cria na pasta tmp o arquivo db.sqlite3
node ace migration:run
```

No vscode, faça a instalação da extensão SQLite Viewer. Entre na pasta tmp  e visualize o db.sqlite3 com a extensão instalada.

Obs: quando quiser atualizar o banco de acordo com as alterações feitas, use:
```bash
node ace migration:fresh
```

## Repl
Utilize o ```node ace repl``` para executar coisas em typescript de maneira interativa no terminal.

Carregue os modelos existentes na pasta Models com o comando:
```bash
> loadModels()
```

Cria uma nova "instância" de Medicamento
```bash
> var medicamento = await models.Medicamento.create({nomeComercial:"buscopan"})
```


## Seeder
Seeder prenchem o banco de dados com valores que você estabelecer.

Eles são adicionados à pasta database/seeders.

-- Pesquise o tutorial de como escrever um seeder--

Para executar os scripts que você escreveu, digite no terminal:
```bash
node ace db:seed
```
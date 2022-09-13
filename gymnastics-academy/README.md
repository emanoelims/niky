# Instruções para executar o projeto

## Install dependence

```bash
npm install
npx prisma migrate dev
npx prisma generate

docker-compose up
```

## Para rodar o projeto basta executar

```bash
npm run dev
```

## APIs disponiveis

### Student Resource

```http request
### Create new Student
POST http://localhost:3333/students
Content-Type: application/json

{
  "name": "Test",
  "height": 170,
  "enrollStudent": "0dda0dd0dAA",
  "weight": 84,
  "birthDate": "1998-09-14",
  "phoneNumber": {
    "ddd": 94,
    "number": 999999999
  },
  "address": {
    "zip": 68515000,
    "street": "Travessa rui barbosa",
    "number": 28,
    "neighborhood": "bairro",
    "city": "peba",
    "state": "para",
    "complement": "rua"
  }
}

### Find Details Student
GET http://localhost:3333/students/98e7d705-5756-4e37-906e-4a2bbe6c90cf
Accept: application/json

```

### Instructor Resource

```http request
### Create new Student
POST http://localhost:3333/instructors
Content-Type: application/json

{
  "document": "124ewdd55d5",
  "name": "Emmanel",
  "birthDate": "1998-09-14",
  "phoneNumbers": [
    {
      "ddd": 94,
      "number": 999999999
    }
  ],
  "academicDegree": "DOUTOR"
}

### Find Details Instructor
GET http://localhost:3333/instructors/94003adf-8d5a-4ea0-993b-5951416ec6d9
Accept: application/json

```

### GymClass Resource

```http request
### Criar uma nova Turma
POST http://localhost:3333/gymclasses
Content-Type: application/json

{
  "maximumStudents": 2,
  "startDate": "2022-01-14",
  "endDate": "2022-02-13",
  "lesson": {
    "startTime": "2022-01-14T14:30:00",
    "duration": "2022-01-14T00:30:00"
  },
  "activity": "Natação",
  "instructorId": "94003adf-8d5a-4ea0-993b-5951416ec6d9"
}

### Listar as Turmas
GET http://localhost:3333/gymclasses
Accept: application/json

### Buscar detalhes de uma Turma
GET http://localhost:3333/gymclasses/896c6d3e-f7f2-4ee2-96ad-74e2ba7d17e3
Accept: application/json

### Matricular aluno
POST http://localhost:3333/gymclasses/896c6d3e-f7f2-4ee2-96ad-74e2ba7d17e3/enroll
Content-Type: application/json

{
  "date": "2022-09-09",
  "student_id": "98e7d705-5756-4e37-906e-4a2bbe6c90cf"
}

### Matricular aluno
POST http://localhost:3333/gymclasses/896c6d3e-f7f2-4ee2-96ad-74e2ba7d17e3/enroll
Content-Type: application/json

{
  "date": "2022-09-09",
  "student_id": "98e7d705-5756-4e37-906e-4a2bbe6c90cf"
}

### Adicionar Aluno como Monitor da Turma
POST http://localhost:3333/gymclasses/896c6d3e-f7f2-4ee2-96ad-74e2ba7d17e3/addmonitor
Content-Type: application/json

{
  "student_id": "98e7d705-5756-4e37-906e-4a2bbe6c90cf"
}

### Ativar uma turma
POST http://localhost:3333/gymclasses/896c6d3e-f7f2-4ee2-96ad-74e2ba7d17e3/activate
Content-Type: application/json

{}
```

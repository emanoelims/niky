import { PrismaClient } from '@prisma/client'

const prismaClient = new PrismaClient()

import ExpressAdapter from 'shared/src/main/infra/ExpressAdapter'
import InstructorRouter from 'instructor/src/main/infra/web/InstructorRouter'
import StudentController from 'student/src/main/infra/web/controller/StudentController'
import InstructorController from 'instructor/src/main/infra/web/controller/InstructorController'
import StudentRouter from 'student/src/main/infra/web/StudentRouter'
import GymClassRouter from 'gymclass/src/main/infra/web/GymClassRouter'
import GymClassController from 'gymclass/src/main/infra/web/controller/GymClassController'
import StudentDatabaseRepository from '../../student/src/main/infra/data/StudentDatabaseRepository'
import InstructorDatabaseRepository from '@instructor/infra/data/InstructorDatabaseRepository'
import GymClassDatabaseRepository from '@gymclass/infra/data/GymClassDatabaseRepository'

const server = new ExpressAdapter()
StudentRouter.of(server, new StudentController(new StudentDatabaseRepository(prismaClient)))
InstructorRouter.of(
  server,
  new InstructorController(new InstructorDatabaseRepository(prismaClient))
)
GymClassRouter.of(server, new GymClassController(new GymClassDatabaseRepository(prismaClient)))
server.listen(3333)

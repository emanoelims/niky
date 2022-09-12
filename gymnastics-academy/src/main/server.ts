import ExpressAdapter from 'shared/src/main/infra/ExpressAdapter'
import StudentMemoryRepository from 'student/src/main/infra/data/StudentMemoryRepository'
import InstructorRouter from 'instructor/src/main/infra/web/InstructorRouter'
import StudentController from 'student/src/main/infra/web/controller/StudentController'
import InstructorController from 'instructor/src/main/infra/web/controller/InstructorController'
import InstructorMemoryRepository from 'instructor/src/main/infra/data/InstructorMemoryRepository'
import StudentRouter from 'student/src/main/infra/web/StudentRouter'
import GymClassRouter from 'gymclass/src/main/infra/web/GymClassRouter'
import GymClassController from 'gymclass/src/main/infra/web/controller/GymClassController'
import GymClassMemoryRepository from 'gymclass/src/main/infra/data/GymClassMemoryRepository'

const server = new ExpressAdapter()
StudentRouter.of(server, new StudentController(new StudentMemoryRepository()))
InstructorRouter.of(server, new InstructorController(new InstructorMemoryRepository()))
GymClassRouter.of(server, new GymClassController(new GymClassMemoryRepository()))
server.listen(3333)

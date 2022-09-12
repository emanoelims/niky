import GymClassRepository from '../domain/GymClassRepository'

interface ActivateGymClassInput {
  gymClassId: string
}

class ActivateGymClass {
  constructor(private readonly gymClassRepository: GymClassRepository) {}

  public async execute({ gymClassId }: ActivateGymClassInput): Promise<void> {
    const gymClass = await this.gymClassRepository.findGymClass(gymClassId)
    gymClass.activate()
    await this.gymClassRepository.updateGymClass(gymClass)
  }
}

export default ActivateGymClass

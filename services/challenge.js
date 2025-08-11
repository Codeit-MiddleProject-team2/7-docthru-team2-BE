import { ChellngeRepository } from '../repositories/challenge.js'

export class ChallngeService {
    challengeRepository = new ChallengeRepository();
    
    findAllChallenges = async () => {
        return await this.challengeRepository.findAllChallenges();
    };
    findChallengeById = async () =>{
        return await this.challengeRepository.findChallengeById(challengeId);
    };
    
}
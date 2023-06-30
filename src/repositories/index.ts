import { ProjectRepository } from "./project.repository.js";
import { KnowledgeRepository } from "./knowledge.repository.js";
import { SocialRepository } from "./social.repository.js";
import { UserRepository } from "./user.repository.js";
import { ContactRepository } from "./contact.repository.js";

export const projectRepository = new ProjectRepository();
export const knowledgeRepository = new KnowledgeRepository();
export const socialRepository = new SocialRepository();
export const userRepository = new UserRepository();
export const contactRepository = new ContactRepository();
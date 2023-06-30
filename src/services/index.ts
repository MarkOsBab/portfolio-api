import { ProjectService } from "./project.service.js";
import { KnowledgeService } from "./knowledge.service.js";
import { SocialService } from "./social.service.js";
import { UserService } from "./user.service.js";
import { ContactService } from "./contact.service.js";

export const projectService = new ProjectService();
export const knowledgeService = new KnowledgeService();
export const socialService = new SocialService();
export const userService = new UserService();
export const contactService = new ContactService();
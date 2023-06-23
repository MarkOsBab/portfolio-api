import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import { createHash } from "../utils/utils.js";
import config from "../utils/config.js";
import { UserService } from "../daos/services/user.service.js";
import UserInterface from "../interfaces/user.interface.js";
import { UserModel } from "../daos/models/user.model.js";

export class AuthMiddleware {
    private service: UserService;
    private secretKey = config.secretKey;

    constructor(){
        this.service = new UserService();
    }

    public initializePassport() {
        passport.use(
            "register",
            new LocalStrategy(
                {
                    usernameField: "email",
                    passReqToCallback: true,
                },
                async (req: any, email: string, password: string, done: any) => {
                    try {
                        const { firstname, lastname, username } = req.body;

                        const user: UserInterface = {
                            firstname,
                            lastname,
                            username,
                            email,
                            password: createHash(password),
                        };

                        const createdUser = await this.service.create(user);

                        let sanitizedUser:any;
                        if(createdUser instanceof UserModel) {
                            sanitizedUser = createdUser.toObject();
                            delete sanitizedUser.password;
                        } else {
                            sanitizedUser = { ...createdUser };
                        }

                        return done(null, sanitizedUser);
                    } catch (error: any) {   
                       if(error) {
                        done(error, null);
                       }
                    }
                }
            )
        );

        passport.use(
            "jwt",
            new JwtStrategy(
                {
                    secretOrKey: this.secretKey,
                    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
                },
                async (jwtPayload: any, done: any) => {
                    try {
                        const user = await this.service.findById(jwtPayload.userId);
                        if(user) {
                            return done(null, user);
                        } else {
                            throw new Error(`User not found`);
                        }
                    } catch (error: any) {
                        return done(error, false);
                    }
                }
            )
        )

        passport.serializeUser((user, done) => {
            done(null, user);
        });

        passport.deserializeUser(async (id: string, done) => {
            const user = await this.service.findById(id);
            done(null, user);
        });
    }
}
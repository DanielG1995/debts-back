import { Injectable } from '@nestjs/common';
import { SignupInput } from './inputs/signup.input';
import { AuthResponse } from './types/auth-response-type';
import { UsersService } from 'src/users/users.service';
import { LoginInput } from './inputs/login.input';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/entities/user.entity';


@Injectable()
export class AuthService {

    constructor(
        private readonly userService: UsersService,
        private readonly jwtService: JwtService
    ) { }

    async signup(signupInput: SignupInput): Promise<AuthResponse> {
        const user = await this.userService.create(signupInput)
        const token = this.jwtService.sign({ id: user.id })
        return {
            token,
            user

        }
    }

    async login(loginInput: LoginInput): Promise<AuthResponse> {
        const user = await this.userService.findOneByEmail(loginInput.email)
        if (!user) {
            const newUser = await this.userService.create({ ...loginInput })
            const newToken = this.jwtService.sign({ id: newUser.id })
            return {
                token: newToken,
                user: newUser

            }
        }
        const token = this.jwtService.sign({ id: user.id })
        return {
            token,
            user

        }
    }

    revalidateToken(user: User): AuthResponse {
        return {
            token: this.jwtService.sign({ id: user.id }),
            user
        }
    }


}

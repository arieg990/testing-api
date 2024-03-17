import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { Observable } from 'rxjs';

@Injectable()
export class LoginBasicAuthGuard extends AuthGuard('login-basic') {}

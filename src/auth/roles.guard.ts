import { Injectable, CanActivate, ExecutionContext, ForbiddenException, UnauthorizedException } from '@nestjs/common';
import { Request } from 'express';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private allowedRoles: string[]) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<Request>();
    const authHeader = request.headers.authorization;

    if (!authHeader) {
      throw new UnauthorizedException('Missing Authorization header');
    }

    const token = authHeader.replace('Bearer ', '');
    const decoded = jwt.decode(token);

    if (!decoded || typeof decoded !== 'object') {
      throw new UnauthorizedException('Invalid token structure');
    }

    const role = decoded['role'];
    console.log('Decoded role:', role);

    if (!this.allowedRoles.includes(role)) {
      throw new ForbiddenException(`Role '${role}' is not allowed to access this resource`);
    }

    // optionally attach decoded token to request.user
    request['user'] = decoded;

    return true;
  }
}

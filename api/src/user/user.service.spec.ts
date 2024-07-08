import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { PrismaService } from '../prisma.service';
import { User } from './user.entity';

describe('UserService', () => {
  let service: UserService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: PrismaService,
          useValue: {
            user: {
              findMany: jest.fn(),
              findUnique: jest.fn(),
              create: jest.fn(),
              update: jest.fn(),
              delete: jest.fn(),
            },
          },
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of users', async () => {
      const users: User[] = [
        { id: '1', username: 'user1', password: 'password1' },
        { id: '2', username: 'user2', password: 'password2' },
      ];
      jest.spyOn(prisma.user, 'findMany').mockResolvedValue(users);

      expect(await service.findAll()).toEqual(users);
    });
  });

  describe('findOne', () => {
    it('should return a user by id', async () => {
      const id = '1';
      const user: User = { id, username: 'user1', password: 'password1' };
      jest.spyOn(prisma.user, 'findUnique').mockResolvedValue(user);

      expect(await service.findOne(id)).toEqual(user);
    });
  });

  describe('findOneByUsername', () => {
    it('should return a user by username', async () => {
      const username = 'user1';
      const user: User = { id: '1', username, password: 'password1' };
      jest.spyOn(prisma.user, 'findUnique').mockResolvedValue(user);

      expect(await service.findOneByUsername(username)).toEqual(user);
    });
  });

  describe('create', () => {
    it('should create a new user', async () => {
      const data = { username: 'user1', password: 'password1' };
      const user: User = { id: '1', ...data };
      jest.spyOn(prisma.user, 'create').mockResolvedValue(user);

      expect(await service.create(data)).toEqual(user);
    });
  });

  describe('update', () => {
    it('should update a user by id', async () => {
      const id = '1';
      const data = { username: 'user1', password: 'newpassword' };
      const user: User = { id, ...data };
      jest.spyOn(prisma.user, 'update').mockResolvedValue(user);

      expect(await service.update(id, data)).toEqual(user);
    });
  });

  describe('delete', () => {
    it('should delete a user by id', async () => {
      const id = '1';
      const user: User = { id, username: 'user1', password: 'password1' };
      jest.spyOn(prisma.user, 'delete').mockResolvedValue(user);

      expect(await service.delete(id)).toEqual(user);
    });
  });

  describe('login', () => {
    it('should return a user by username and password', async () => {
      const data = { username: 'user1', password: 'password1' };
      const user: User = { id: '1', ...data };
      jest.spyOn(prisma.user, 'findUnique').mockResolvedValue(user);

      expect(await service.login(data)).toEqual(user);
    });
  });

  describe('findUsersWithoutConversation', () => {
    it('should return an array of users without conversation', async () => {
      const userId = '1';
      const users: User[] = [
        { id: '2', username: 'user2', password: 'password2' },
        { id: '3', username: 'user3', password: 'password3' },
      ];
      jest.spyOn(prisma.user, 'findMany').mockResolvedValue(users);

      expect(await service.findUsersWithoutConversation(userId)).toEqual(users);
    });
  });
});

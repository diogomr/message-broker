import { Test, TestingModule } from '@nestjs/testing';
import { MessagesController } from './messages.controller';
import { MessagesService } from './messages.service';
import { ModuleMocker } from 'jest-mock';
import { Status } from './message.schema';

const moduleMocker = new ModuleMocker(global);

describe('MessagesController', () => {
  let controller: MessagesController;
  let service: MessagesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MessagesController],
    })
      .useMocker((token) => {
        if (typeof token === 'function') {
          const mockMetadata = moduleMocker.getMetadata(token);
          const Mock = moduleMocker.generateFromMetadata(mockMetadata);
          return new Mock();
        }
      })
      .compile();

    controller = module.get<MessagesController>(MessagesController);
    service = module.get<MessagesService>(MessagesService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('process', () => {
    it('should return null', async () => {

      const toReturn = {
        externalId: 'id',
        payload: {
          test: 'test',
        },
        status: Status.QUEUED,
      };
      jest.spyOn(service, 'process').mockImplementation(() => Promise.resolve(toReturn));

      const result = await controller.process({ id: 'id', payload: { test: 'test' } });
      expect(result).toBeNull();
    });
  });

  describe('retrieve', () => {
    it('should return null when service returns null', async () => {

      const toReturn = null;
      jest.spyOn(service, 'retrieve').mockImplementation(() => Promise.resolve(toReturn));

      const result = await controller.retrieve();
      expect(result).toBeNull();
    });
    it('should return null when service returns undefined', async () => {

      const toReturn = undefined;
      jest.spyOn(service, 'retrieve').mockImplementation(() => Promise.resolve(toReturn));

      const result = await controller.retrieve();
      expect(result).toBeNull();
    });

    it('should return message when service returns message', async () => {

      const toReturn = {
        externalId: 'id',
        payload: {
          test: 'test',
        },
        status: Status.QUEUED,
      };
      jest.spyOn(service, 'retrieve').mockImplementation(() => Promise.resolve(toReturn));

      const result = await controller.retrieve();
      expect(result).toEqual({
        id: 'id',
        payload: {
          test: 'test',
        },
      });
    });
  });
});

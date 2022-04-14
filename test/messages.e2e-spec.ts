import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { GenericContainer } from 'testcontainers';
import { environment } from '../src/environments/environment';
import { MessageDto } from '../src/messages/message.dto';

describe('Messages Controller (e2e)', () => {
  let app: INestApplication;

  jest.setTimeout(60000);

  beforeAll(async () => {
    const mongo = await new GenericContainer('mongo')
      .withExposedPorts(27017)
      .start();

    environment.dbURI = `mongodb://${mongo.getHost()}:${mongo.getMappedPort(27017)}`;

    const moduleFixture = await Test.createTestingModule({ imports: [AppModule] }).compile();

    app = moduleFixture.createNestApplication();

    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('/messages (GET)', async () => {
    const response = await request(app.getHttpServer()).get('/messages');

    expect(response.status).toBe(200);
    expect(response.body).toEqual({});
  });

  it('/messages (POST)', async () => {

    let body: MessageDto = { id: 'id', payload: { test: 'test' } };
    const postResponse = await request(app.getHttpServer())
      .post('/messages')
      .send(body);

    expect(postResponse.status).toBe(201);
    expect(postResponse.body).toEqual({});
  });

  it('POST multiple and GET one', async () => {

    let body: MessageDto = { id: 'id', payload: { test: 'test' } };
    let body2: MessageDto = { id: 'id2', payload: { test: 'test' } };
    await request(app.getHttpServer())
      .post('/messages')
      .send(body);
    await request(app.getHttpServer())
      .post('/messages')
      .send(body2);

    const response = await request(app.getHttpServer()).get('/messages');
    expect(response.status).toBe(200);
    expect(response.body).toEqual(body);
  });
});

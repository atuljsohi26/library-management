import request from 'supertest';
import app from '../src/app.js';

describe('User API', () => {
  it('should fetch all users', async () => {
    const res = await request(app).get('/api/users').set('Authorization', 'valid-token');
    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
  });

  it('should return Unauthorized if token is missing', async () => {
    const res = await request(app).get('/api/users');
    expect(res.statusCode).toBe(401);
    expect(res.body.message).toBe('Unauthorized');
  });
});

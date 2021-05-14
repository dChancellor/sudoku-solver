const { app, getPuzzles } = require('../src/app');
const supertest = require('supertest');
const request = supertest(app);

describe('Testing API functionality', () => {
  it('should GET the / endpoint and return a 🎂', async (done) => {
    const res = await request.get('/');
    expect(res.status).toBe(200);
    expect(res.body.message).toBe('🎂');
    done();
  });

  it('should retrieve the NYT times sudoku puzzles for today', async (done) => {
    const res = await getPuzzles();
    expect(new Date(res.displayDate).toLocaleDateString()).toEqual(new Date().toLocaleDateString());
    expect(res).toHaveProperty('easy', 'medium', 'hard');
    done();
  });
});

const request = require('supertest');
const app = require('../app');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

describe('Webアプリケーションのテスト', () => {

describe('ページ遷移のテスト', () => {
  describe('トップページ遷移のテスト', () => {
    it('トップページに正しく遷移できる', async () => {
      const response = await request(app)
      .get('/posts') 
      .expect(200);
    expect(response.text).toMatch(/トップページ/);
      });
      it('新規投稿画面に正しく遷移できる', async () => {
        const response = await request(app)
          .get('/posts/create')
          .expect(200);
        expect(response.text).toMatch(/新規投稿ページ/);
      });
  });
  describe('トップページの遷移に失敗', () => {
    it('未定義のパスにアクセスした時、リダイレクトして302エラーを返す', async () => {
      const response = await request(app)
        .get('/some-undefined-path')
        .expect(302);
      expect(response.headers.location).toEqual('/non-existent-page');
    });
  });
});

describe('投稿のテスト', () => {
  afterEach(async () => {
    await prisma.post.deleteMany({});
    // 各テストの後にデータベースを削除する
  });

  // 正常系
  it('新しい投稿を保存できる', async () => {
    const newPost = await prisma.post.create({
      data: {
        content: 'これはテスト投稿です。',
      },
    });

    expect(newPost).not.toBeNull();
    expect(newPost.content).toBe('これはテスト投稿です。');
  });
  it('空のcontentで投稿しようとするとエラーが発生する', async () => {
    const response = await request(app)
      .post('/posts/create')
      .send({ content: '' })
      .expect('Content-Type', /json/)
      .expect(400);
    expect(response.body.message).toEqual('Content cannot be empty');
  });
});
});
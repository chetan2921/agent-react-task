import { repositories, resetMockRepositories } from '@/repositories/mockRepositories';

describe('mock repositories', () => {
  beforeEach(() => {
    resetMockRepositories();
  });

  it('logs in a seeded user', async () => {
    const user = await repositories.auth.login({ email: 'chetan@example.com', password: 'password' });

    expect(user.username).toBe('chetan');
  });

  it('allows mock login with any user id and password', async () => {
    const user = await repositories.auth.login({ email: 'anything', password: 'anything' });

    expect(user.id).toBeTruthy();
  });

  it('toggles post likes for a user', async () => {
    const first = await repositories.posts.toggleLike('p-1', 'u-4');
    const second = await repositories.posts.toggleLike('p-1', 'u-4');

    expect(first).toEqual({ liked: true, likeCount: 3 });
    expect(second).toEqual({ liked: false, likeCount: 2 });
  });

  it('creates a post in the user feed', async () => {
    const created = await repositories.posts.createPost(
      {
        brandName: 'Nike',
        sneakerName: 'Test Pair',
        description: 'A test post',
        mainImage: '',
      },
      'u-1',
    );
    const userPosts = await repositories.posts.listUserPosts('u-1');

    expect(created.sneakerName).toBe('Test Pair');
    expect(userPosts[0].id).toBe(created.id);
  });

  it('updates sneaker rating averages', async () => {
    const sneaker = await repositories.sneakers.rateSneaker('s-1', 1);

    expect(sneaker.ratingCount).toBe(215);
    expect(sneaker.updatedAt).toBeTruthy();
  });

  it('follows and unfollows users', async () => {
    await repositories.users.followUser('u-1', 'u-4');
    expect(await repositories.users.isFollowing('u-1', 'u-4')).toBe(true);

    await repositories.users.unfollowUser('u-1', 'u-4');
    expect(await repositories.users.isFollowing('u-1', 'u-4')).toBe(false);
  });
});

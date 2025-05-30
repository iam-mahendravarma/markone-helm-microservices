db = db.getSiblingDB('dev');
db.createUser({
  user: 'admin',
  pwd: 'admin123',
  roles: [{ role: 'dbOwner', db: 'dev' }],
});


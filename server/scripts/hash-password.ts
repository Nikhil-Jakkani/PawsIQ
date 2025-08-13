import bcrypt from 'bcryptjs';

const password = process.argv[2];

if (!password) {
  console.error('Please provide a password as an argument.');
  process.exit(1);
}

const hashed = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
process.stdout.write(hashed + '\n');


import jwt from 'jsonwebtoken';
import User from '../server/models/user.model.js';
import { JWT_SECRET } from '../server/config/constants.js';
export const createTestUser = async (userData = {}) => {
    const defaultUser = {
        email: `test-${Date.now()}@example.com`,
        name: 'Test User',
        password: 'password123',
        role: 'user',
        ...userData,
    };
    // Ensure role is either 'user' or 'admin'
    if (defaultUser.role !== 'admin') {
        defaultUser.role = 'user';
    }
    return await User.create(defaultUser);
};
export const getAuthToken = (userId, role = 'user') => {
    return jwt.sign({ id: userId, role }, JWT_SECRET, { expiresIn: '1h' });
};
// Helper to add auth token to request headers
export const withAuth = (request, token) => {
    return request.set('x-auth-token', token);
};
export const loginAsUser = async (request, email, password) => {
    const response = await request
        .post('/api/auth/login')
        .send({ email, password });
    return response.body.token;
};
export const clearDatabase = async () => {
    // This will delete all data from all tables
    await User.destroy({ where: {}, truncate: true, cascade: true });
};
//# sourceMappingURL=test-utils.js.map
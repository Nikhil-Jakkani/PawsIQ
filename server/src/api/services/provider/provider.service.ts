import httpStatus from 'http-status';
import { PrismaClient } from '@prisma/client';
import { ApiError } from '../../utils/ApiError.js';

const prisma = new PrismaClient();

const getProviderById = async (id: number) => {
  const provider = await prisma.pIQ_Service_Provider.findUnique({
    where: { provider_id: id },
  });
  if (!provider) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Provider not found');
  }
  // For now, we will return mock data for dashboard components
  const mockDashboardData = {
    upcomingAppointments: [
        { id: 1, date: '2023-07-22', time: '10:00 AM', client: 'Sarah Johnson', pet: 'Max (Golden Retriever)', service: 'Checkup' },
        { id: 2, date: '2023-07-22', time: '2:30 PM', client: 'Michael Chen', pet: 'Luna (Siamese Cat)', service: 'Vaccination' },
        { id: 3, date: '2023-07-23', time: '11:15 AM', client: 'Emma Wilson', pet: 'Charlie (Labrador)', service: 'Dental Cleaning' }
      ],
    recentReviews: [
        { id: 1, client: 'David Miller', rating: 5, comment: 'Dr. Wilson was amazing with my anxious dog. Very patient and knowledgeable!', date: '2023-07-20' },
        { id: 2, client: 'Jessica Lee', rating: 4, comment: 'Great service, but had to wait a bit longer than expected.', date: '2023-07-18' }
      ],
    performance: {
        earnings: 5250,
        newClients: 12,
        rating: 4.8
    }
  };

  return { ...provider, ...mockDashboardData };
};

export const providerService = {
  getProviderById,
};
